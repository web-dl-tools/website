import Vue from "vue";
import moment from "moment";

export default Vue.mixin({
  methods: {
    /**
     * Check if a given object is empty.
     *
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject(obj) {
      return !(Object.entries(obj).length === 0 && obj.constructor === Object);
    },
    /**
     * Check if two datetime objects/strings are on the same day.
     *
     * @param d1
     * @param d2
     * @returns {boolean}
     */
    sameDate(d1, d2) {
      return moment(d1).format("L") === moment(d2).format("L");
    },
    /**
     * Sort two datetime objects/string.
     * This function can be used as a higher-order function in the Iterable .sort function.
     *
     * @param d1
     * @param d2
     * @returns {number}
     */
    sortDates(d1, d2) {
      return moment(d1).unix() - moment(d2).unix();
    },
  },
});
