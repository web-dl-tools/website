<template>
  <div class="messages hidden-sm-and-down">
    <v-alert
      v-for="(m, i) in messages"
      :value="'show' in messages[i] && messages[i].show"
      :key="i"
      :type="m.type"
      :color="m.type"
      :class="{ 'cursor-pointer': m.action }"
      border="right"
      elevation="8"
      transition="slide-fade"
      colored-border
      @click="runCallable(m.action)"
    >
      <span class="body-2 pr-3" v-html="m.text" />
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "components.ui.snackbars",
  computed: {
    ...mapGetters({
      messages: "application/getMessages",
    }),
  },
  methods: {
    /**
     * Run callable if available.
     */
    runCallable(c) {
      if (c) {
        c();
      }
    },
    /**
     * Trigger the removal of a message.
     *
     * @param t
     */
    remove(t) {
      this.$store.dispatch("application/removeMessage", t);
    },
  },
};
</script>

<style scoped>
.messages {
  position: fixed;
  top: 67px;
  right: 10px;
  padding-left: 10px;
  max-width: 500px;
}

.single-component + .messages {
  top: 10px;
}

.slide-fade-enter-active {
  transition: all 1s ease;
}

.slide-fade-leave-active {
  transition: all 1.25s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(120%);
}
</style>
