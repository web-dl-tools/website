<template>
  <div>
    <v-row>
      <v-col cols="12" class="py-0">
        <p class="body-2 mb-n1">Resource extensions</p>
        <small class="font-weight-light grey--text text--lighten-1">
          Select the minimum size for each resource. 0 bytes will download all
          resources.
        </small>
      </v-col>
      <v-col class="" cols="12">
        <v-row>
          <v-col cols="12">
            <v-slider
              v-model="min_bytes"
              label="Size"
              min="0"
              max="5242880"
              hide-details
            >
              <template v-slot:append>
                <small class="font-weight-light grey--text text--lighten-2">
                  {{ formatBytes(min_bytes, 1) }}
                </small>
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <p class="body-2 mb-n1">Resource extensions</p>
        <small class="font-weight-light grey--text text--lighten-1">
          Select one or multiple extensions below. You can also add new
          extensions if necessary.
        </small>
      </v-col>
      <v-col class="pt-4" cols="12">
        <v-row>
          <v-col cols="12">
            <v-combobox
              v-model="extensions"
              :items="default_extensions"
              label="Extensions"
              dense
              hide-selected
              multiple
              small-chips
            ></v-combobox>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import formatters from "../../../mixins/formatters";

export default {
  name: "components.steppers.handlers.resource-step",
  mixin: [formatters],
  data: () => {
    return {
      default_extensions: ["jpg", "jpeg", "png", "gif"],
      extensions: [],
      min_bytes: 0
    };
  },
  props: {
    active: Boolean,
    data: Object
  },
  computed: {
    valid() {
      return !!this.extensions.length;
    }
  },
  watch: {
    valid(n) {
      this.updateData(n);
    },
    extensions() {
      this.updateData(this.valid);
    },
    min_bytes() {
      this.updateData(this.valid);
    }
  },
  methods: {
    updateData(valid) {
      if (valid) {
        this.$emit("dataChange", {
          step: 3,
          data: {
            extensions: this.extensions,
            min_bytes: this.min_bytes
          },
          label: ""
        });
      } else {
        this.$emit("dataChange", {
          step: 3,
          data: {},
          label: ""
        });
      }
    }
  }
};
</script>
