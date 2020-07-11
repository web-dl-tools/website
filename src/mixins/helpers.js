import Vue from "vue";
import moment from "moment";

export default Vue.mixin({
  methods: {
    isEmptyObject(obj) {
      return !(Object.entries(obj).length === 0 && obj.constructor === Object);
    },
    sameDate(d1, d2) {
      return moment(d1).format("L") === moment(d2).format("L");
    },
    sortDates(d1, d2) {
      return moment(d1).unix() - moment(d2).unix();
    },
  },
});
