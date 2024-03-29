import Vue from "vue";
import moment from "moment";
import psl from "psl";
import { formatRequest, formatBytes } from "./public";
import semver from "semver";

export default Vue.mixin({
  methods: {
    /**
     * @inheritDoc
     */
    formatRequest,
    /**
     * @inheritDoc
     */
    formatBytes,
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
      let formatted, timeframe;

      switch (format) {
        case "humanize":
          formatted = duration.humanize();
          if (duration.asMilliseconds() < 1000) formatted = null;
          break;
        case "automatic":
          if (duration.asMonths() >= moment.relativeTimeThreshold("M"))
            timeframe = "years";
          if (duration.asDays() >= moment.relativeTimeThreshold("d"))
            timeframe = "months";
          if (duration.asHours() >= moment.relativeTimeThreshold("h"))
            timeframe = "days";
          if (duration.asMinutes() >= moment.relativeTimeThreshold("m"))
            timeframe = "hours";
          if (duration.asSeconds() >= moment.relativeTimeThreshold("s"))
            timeframe = "minutes";
          else timeframe = "seconds";
          formatted = duration.as(timeframe).toPrecision(3);
          break;
        default:
          formatted = duration.as(format);
          break;
      }

      return formatted
        ? template[0]
            .replace("{formatted}", formatted)
            .replace("{timeframe}", timeframe)
        : template[1];
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
        case "DELETE":
          return "error";
        case 30:
          return "warning";
        case 20:
        case "PATCH":
        case "PUT":
          return "secondary";
        case "POST":
          return "success";
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
    /**
     * Compare two semantic versions and return the comparable release type.
     *
     * @param v1
     * @param v2
     * @returns {string}
     */
    formatVersioningDifference(v1, v2) {
      return semver.diff(v1, v2);
    },
  },
});
