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
    /**
     * @url https://stackoverflow.com/a/18650828
     * @param bytes
     * @param decimals
     * @returns {string}
     */
    formatBytes(bytes, decimals) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
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
