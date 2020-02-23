<template>
  <div>
    <v-row>
      <v-col cols="12">
        <p class="body-2">
          There is no config required for this handler.
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "components.steppers.request-type-config-step",
  props: {
    active: Boolean
  },
  watch: {
    active(n) {
      if (n) {
        this.updateData(n);
      }
    }
  },
  methods: {
    updateData() {
      this.$emit("dataChange", {
        step: 3,
        data: { skip: true },
        label: ""
      });
    }
  }
};
</script>
