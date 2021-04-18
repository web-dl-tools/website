<template>
  <v-card
    outlined
    :color="selected ? 'success' : ''"
    :class="selected ? 'black--text' : 'white--text'"
    :disabled="disabled"
    @click="click"
  >
    <v-card-title>
      {{ title }}
      <v-spacer />
      <v-icon :light="selected" v-if="selected">
        mdi-check-circle-outline
      </v-icon>
    </v-card-title>
    <slot></slot>
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
