import Vue from "vue";

export default Vue.mixin({
  methods: {
    isEmptyObject(obj) {
      return !(Object.entries(obj).length === 0 && obj.constructor === Object);
    }
  }
});
