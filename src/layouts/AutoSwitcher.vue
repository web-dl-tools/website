<template>
  <div>
    <div v-if="$vuetify.breakpoint.mdAndUp" class="desktop">
      <desktop />
    </div>
    <div v-else class="mobile">
      <mobile />
    </div>
  </div>
</template>

<script>
import mobile from "./Mobile";
import desktop from "./Desktop";

export default {
  components: {
    mobile,
    desktop
  },
  name: "layouts.auto-switcher"
};
</script>
