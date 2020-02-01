import Vue from "vue";
import moment from "moment";

export default Vue.mixin({
  methods: {
    formatRequest(request) {
      return request
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, str => str.toUpperCase())
        .replace("Request", "");
    },
    formatDate(date, format) {
      return moment(date).format(format);
    },
    formatDateFromNow(date) {
      return moment(date).fromNow();
    },
    formatRequestStatusColor(status) {
      switch (status) {
        case "failed":
          return "error";
        case "completed":
          return "success";
        case "downloading":
          return "accent";
        case "pre_processing":
        case "post_processing":
          return "info";
        case "pending":
        default:
          return "warning";
      }
    },
    formatLogLevelColor(level) {
      switch (level) {
        case 50:
        case 40:
          return "error";
        case 30:
          return "warning";
        case 20:
          return "info";
        case 10:
        case 0:
        default:
          return "primary";
      }
    }
  }
});
