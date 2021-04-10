<template>
  <div>
    <v-row>
      <v-col cols="12" class="mb-2">
        <p class="body-2 mb-n1">No config needed.</p>
        <small class="font-weight-light grey--text text--lighten-1">
          There is no additional configuration required for this handler.
        </small>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "components.steppers.request-type-config-step",
  props: {
    active: Boolean,
  },
  watch: {
    /**
     * Check if the current tab has been opened and show possible config options.
     *
     * @param n
     */
    active(n) {
      if (n) {
        this.updateData(n);
      }
    },
  },
  methods: {
    /**
     * Emit a data-change() event upstream to notify the stepper component.
     */
    updateData() {
      this.$emit("data-change", {
        step: 3,
        data: { skip: true },
        label: "What are the specifics to download?",
      });
    },
  },
};
</script>
