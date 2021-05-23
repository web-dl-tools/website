import Vue from "vue";
import moment from "moment";
import psl from "psl";

export default Vue.mixin({
  methods: {
    /**
     * Format a request type to a request string for use in labels.
     *
     * @param request
     * @returns {*}
     */
    formatRequest(request) {
      return request
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace("Request", "");
    },
    /**
     * Format a datetime object/string to a given string format.
     *
     * @param date
     * @param format
     * @returns {string}
     */
    formatDate(date, format) {
      return moment(date).format(format);
    },
    /**
     * Calculate a datetime object/string difference from the current datetime.
     *
     * @param date
     * @returns {string}
     */
    formatDateFromNow(date) {
      return moment(date).fromNow();
    },
    /**
     * Calculate the difference between two datetime objects/strings and format the result.
     *
     * @param startDate
     * @param endDate
     * @param format
     * @param template
     * @returns string
     */
    formatDateDuration(
      startDate,
      endDate,
      format,
      template = ["{formatted}", ""]
    ) {
      startDate = moment(startDate);
      endDate = moment(endDate);
      const duration = moment.duration(endDate.diff(startDate));
      let formatted;

      switch (format) {
        case "humanize":
          formatted = duration.humanize();
          if (duration.asMilliseconds() < 1000) formatted = null;
          break;
        default:
          formatted = duration.as(format);
          break;
      }

      return formatted
        ? template[0].replace("{formatted}", formatted)
        : template[1];
    },
    /**
     * Format a bytes value to a human readable format.
     *
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
    /**
     * Format the request status.
     *
     * @param status
     * @returns {string}
     */
    formatRequestStatus(status) {
      switch (status) {
        case "failed":
          return "Failed";
        case "completed":
          return "Completed";
        case "downloading":
          return "Downloading";
        case "pre_processing":
          return "Pre-processing";
        case "post_processing":
          return "Post-processing";
        case "pending":
          return "Pending";
        default:
          return "Unknown";
      }
    },
    /**
     * Calculate a color value for a given request status.
     *
     * @param status
     * @returns {string}
     */
    formatRequestStatusColor(status) {
      switch (status) {
        case "failed":
          return "error";
        case "completed":
          return "success";
        case "downloading":
          return "info";
        case "pre_processing":
        case "post_processing":
          return "secondary";
        case "pending":
        default:
          return "warning";
      }
    },
    /**
     * Calculate the text color for a given background color.
     *
     * @param background
     * @returns {string}
     */
    formatTextColor(background) {
      switch (background) {
        case "info":
        case "success":
        case "warning":
          return "black--text";
        case "primary":
        case "secondary":
        case "accent":
        case "error":
        default:
          return "white--text";
      }
    },
    /**
     * Get the request handler description.
     *
     * @param status
     * @returns {string}
     */
    getRequestHandlerDescription(status) {
      switch (status) {
        case "AudioVisualRequest":
          return "A handler for downloading the audio and/or visual resource.";
        case "DirectRequest":
          return "A handler for directly downloading the url resource.";
        case "TorrentRequest":
          return "A handler for downloading the torrent resource.";
        case "ResourceRequest":
          return "A handler for downloading resources from the url resource.";
        default:
          return "Unknown";
      }
    },
    /**
     * Calculate a log color for a given log level value.
     *
     * @param level
     * @returns {string}
     */
    formatLogLevelColor(level) {
      switch (level) {
        case 50:
        case 40:
          return "error";
        case 30:
          return "warning";
        case 20:
          return "secondary";
        case 10:
        case 0:
        default:
          return "info";
      }
    },
    /**
     * Calculate the domain from a given url.
     *
     * @param url
     * @returns {null}
     */
    formatDomain(url) {
      let hostname;
      if (url.indexOf("//") > -1) {
        hostname = url.split("/")[2];
      } else {
        hostname = url.split("/")[0];
      }
      hostname = hostname.split(":")[0];
      hostname = hostname.split("?")[0];

      return psl.parse(hostname).domain;
    },
  },
});
