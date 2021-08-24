<template>
  <v-card
    outlined
    :color="selected ? 'success' : ''"
    :class="selected ? 'black--text' : 'white--text'"
    :disabled="disabled"
    @click="click"
  >
    <v-row class="mx-0">
      <v-col
        v-if="iconVisible"
        class="pa-0 justify-center d-flex align-center"
        cols="2"
      >
        <v-icon x-large :light="selected">{{ icon }}</v-icon>
      </v-col>
      <v-col class="pa-0" :cols="iconVisible ? 10 : 12">
        <v-card-title class="pt-3">
          {{ title }}
          <v-spacer />
          <v-icon :light="selected" v-if="selected">
            mdi-check-circle-outline
          </v-icon>
        </v-card-title>
        <slot></slot>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import formatters from "../../mixins/formatters";

export default {
  name: "components.steppers.selectable-card",
  mixin: [formatters],
  data: () => ({
    request_type: "",
  }),
  props: {
    selected: Boolean,
    disabled: Boolean,
    title: String,
    icon: {
      type: String,
      default: "",
    },
  },
  computed: {
    /**
     * Decide when to show the icon.
     *
     * @returns {boolean}
     */
    iconVisible() {
      return !!this.icon && this.$vuetify.breakpoint.mdAndUp;
    },
  },
  methods: {
    /**
     * Emit a onClick() event upstream to notify the card has been clicked on.
     */
    click() {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit("onClick");
    },
  },
};
</script>
