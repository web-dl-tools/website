<template>
  <v-card
    outlined
    :color="selected ? 'success' : ''"
    :disabled="disabled"
    @click="click"
  >
    <v-card-title>
      {{ title }}
      <v-spacer />
      <v-icon v-if="selected">
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
    click() {
      this.$emit("onClick");
    },
  },
};
</script>
