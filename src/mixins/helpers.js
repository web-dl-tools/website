import Vue from "vue";
import moment from "moment";
import { truncate } from "./public";

export default Vue.mixin({
  methods: {
    /**
     * @inheritDoc
     */
    truncate,
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
     * @returns {boolean}
     * @param arr
     */
    isEmptyArray(arr) {
      return arr.length === 0;
    },
    /**
     * Check if a string is a valid date and parsable by moment.js.
     *
     * @param date
     * @returns {boolean}
     */
    isValidDate(date) {
      return moment(date).isValid();
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
     * @param format
     * @returns {number}
     */
    sortDates(d1, d2, format = "") {
      return moment(d1, format).unix() - moment(d2, format).unix();
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
    /**
     * Capitalize the first letter of a word/sentence.
     *
     * @param word
     * @returns {string}
     */
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  },
});
