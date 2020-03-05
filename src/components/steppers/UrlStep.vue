<template>
  <div>
    <v-text-field
      v-model="url"
      label="URL"
      name="url"
      type="text"
      autofocus
      clearable
    />
  </div>
</template>

<script>
import formatters from "../../mixins/formatters";

formatters;
export default {
  name: "components.steppers.url-step",
  mixins: [formatters],
  data: () => ({
    url: ""
  }),
  props: {
    active: Boolean
  },
  computed: {
    valid() {
      const url_regex = RegExp(
        "[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"
      );
      const magnet_regex = RegExp("magnet:\\?xt=urn:btih:[a-zA-Z0-9]*");
      return url_regex.test(this.url) || magnet_regex.test(this.url);
    },
    label() {
      return this.valid && !this.active
        ? this.truncate(this.url, 160)
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
