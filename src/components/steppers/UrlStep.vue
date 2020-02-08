<template>
  <div>
    <v-text-field label="URL" name="url" type="text" v-model="url" clearable />
  </div>
</template>

<script>
export default {
  name: "components.steppers.url-step",
  data: () => ({
    url: ""
  }),
  props: {
    active: Boolean
  },
  computed: {
    valid() {
      const regex = RegExp(
        "[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"
      );
      return regex.test(this.url);
    },
    label() {
      return this.valid && !this.active
        ? this.url
        : "Submit the URL of the resource.";
    }
  },
  watch: {
    url() {
      this.updateData(this.valid);
    },
    label() {
      this.updateData(this.valid);
    }
  },
  methods: {
    updateData(valid) {
      if (valid) {
        this.$emit("dataChange", {
          step: 1,
          data: { url: this.url },
          label: this.label
        });
      } else {
        this.$emit("dataChange", {
          step: 1,
          data: {},
          label: this.label
        });
      }
    }
  }
};
</script>
