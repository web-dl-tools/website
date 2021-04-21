import Vue from "vue";
import moment from "moment";

export default Vue.mixin({
  methods: {
    /**
     * Capitalize the first character of a string.
     *
     * @param value
     * @returns {string} The capitalized string.
     */
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    /**
     * Truncate a string to a given length.
     *
     * @param str
     * @param len
     * @returns {*} The truncated string.
     */
    truncate(str, len) {
      return str.length > len ? `${str.slice(0, len)}...` : str;
    },
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
     * Check if a given array is empty.
     *
     * @param array
     * @returns {boolean}
     */
    isEmptyArray(arr) {
      return arr.length === 0;
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
    /**
     * Filter an array down to only unique values.
     *
     * @param arr
     * @returns {any[]}
     */
    unique(arr) {
      return [...new Set(arr)];
    },
  },
});
