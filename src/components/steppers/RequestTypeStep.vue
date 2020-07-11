<template>
  <div>
    <v-row>
      <v-col
        v-for="_handler in handlers"
        :key="_handler.request"
        cols="12"
        md="6"
      >
        <selectable-card
          :selected="request_type === _handler.request"
          :disabled="!_handler.supported"
          :title="formatRequest(_handler.request)"
          @onClick="request_type = _handler.request"
        >
          <v-card-subtitle>
            {{ _handler.description }}
          </v-card-subtitle>
        </selectable-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import formatters from "../../mixins/formatters";
import SelectableCard from "./SelectableCard";

export default {
  name: "components.steppers.request-type-step",
  mixin: [formatters],
  components: {
    SelectableCard,
  },
  data: () => ({
    request_type: "",
  }),
  props: {
    active: Boolean,
    handlers: Array,
  },
  computed: {
    valid() {
      return !!this.request_type;
    },
    label() {
      return this.valid && !this.active
        ? this.formatRequest(this.request_type)
        : "Select a handler to process the resource.";
    },
  },
  watch: {
    valid(n) {
      this.updateData(n);
    },
    label() {
      this.updateData(this.valid);
    },
  },
  methods: {
    updateData(valid) {
      if (valid) {
        this.$emit("dataChange", {
          step: 2,
          data: { request_type: this.request_type },
          label: this.label,
        });
      } else {
        this.$emit("dataChange", {
          step: 2,
          data: {},
          label: this.label,
        });
      }
    },
  },
};
</script>
