<template>
  <div class="messages hidden-sm-and-down">
    <v-alert
      v-for="(m, i) in messages"
      :key="i"
      :type="m.type"
      :color="m.type"
      :class="{ 'cursor-pointer': m.action }"
      border="right"
      elevation="8"
      colored-border
      @click="runCallable(m.action)"
    >
      <span class="body-2 pr-3" v-html="m.text"></span>
      <!--      <template slot="close">-->
      <!--        <v-btn icon x-small @click="remove(i)">-->
      <!--          <v-icon>mdi-close-circle</v-icon>-->
      <!--        </v-btn>-->
      <!--      </template>-->
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
     * Trigger a removal of a message.
     *
     * @param i
     */
    remove(i) {
      this.$store.commit("application/REMOVE_MESSAGE", i);
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
</style>
