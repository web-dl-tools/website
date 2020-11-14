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
    /**
     * Validate if all required fields have been filled in sufficiently.
     *
     * @returns {boolean}
     */
    valid() {
      return !!this.request_type;
    },
    /**
     * Calculate the label to show for this step.
     *
     * @returns {*}
     */
    label() {
      return this.valid && !this.active
        ? this.formatRequest(this.request_type)
        : "Select a handler to process the resource.";
    },
  },
  watch: {
    /**
     * Trigger an update data check when the validity of the step has changed.
     *
     * @param n
     */
    valid(n) {
      this.updateData(n);
    },
    /**
     * Trigger an update data check when the label value has changed.
     */
    label() {
      this.updateData(this.valid);
    },
  },
  methods: {
    /**
     * Emit a data-change() event upstream to notify the stepper component.
     *
     * @param valid
     */
    updateData(valid) {
      if (valid) {
        this.$emit("data-change", {
          step: 2,
          data: { request_type: this.request_type },
          label: this.label,
        });
      } else {
        this.$emit("data-change", {
          step: 2,
          data: {},
          label: this.label,
        });
      }
    },
  },
};
</script>
