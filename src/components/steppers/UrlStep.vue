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

export default {
  name: "components.steppers.url-step",
  mixins: [formatters],
  data: () => ({
    url: "",
  }),
  props: {
    active: Boolean,
  },
  computed: {
    /**
     * Validate if the url is a valid URL or magnet link.
     *
     * @returns {boolean}
     */
    valid() {
      const url_regex = RegExp(
        "[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"
      );
      const magnet_regex = RegExp("magnet:\\?xt=urn:btih:[a-zA-Z0-9]*");
      return url_regex.test(this.url) || magnet_regex.test(this.url);
    },
    /**
     * Calculate the label to show for this step.
     *
     * @returns {string}
     */
    label() {
      return this.valid && !this.active
        ? this.truncate(this.url, 160)
        : "Submit the URL of the resource.";
    },
  },
  watch: {
    /**
     * Trigger an update data check when the url value has changed.
     */
    url() {
      this.updateData(this.valid);
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
          step: 1,
          data: { url: this.url },
          label: this.label,
        });
      } else {
        this.$emit("data-change", {
          step: 1,
          data: {},
          label: this.label,
        });
      }
    },
  },
};
</script>
