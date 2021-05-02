<template>
  <div>
    <v-row>
      <v-col cols="12">
        <p class="body-2 mb-n1">File format</p>
        <small class="font-weight-light grey--text text--lighten-1">
          Select a file format preset.
        </small>
      </v-col>
      <v-col class="py-0" cols="12">
        <v-row>
          <v-col v-if="hasVideoFormats" cols="12" md="6">
            <selectable-card
              :selected="
                video_format_selection === bestVideoFormat &&
                audio_format_selection === bestAudioFormat
              "
              :disabled="false"
              :title="`Best video file`"
              @onClick="
                () => {
                  video_format_selection = bestVideoFormat;
                  audio_format_selection = bestAudioFormat;
                }
              "
            >
              <v-card-subtitle class="caption">
                Best quality format represented by a single file with video and
                audio.
              </v-card-subtitle>
            </selectable-card>
          </v-col>
          <v-col v-if="hasAudioFormats" cols="12" md="6">
            <selectable-card
              :selected="
                video_format_selection === '' &&
                audio_format_selection === bestAudioFormat
              "
              :disabled="false"
              :title="`Best audio file`"
              @onClick="
                () => {
                  video_format_selection = '';
                  audio_format_selection = bestAudioFormat;
                }
              "
            >
              <v-card-subtitle class="caption">
                Best quality format represented by a single file with audio
                only.
              </v-card-subtitle>
            </selectable-card>
          </v-col>
          <v-col v-if="!hasVideoOrAudioFormats" cols="12" md="6">
            <selectable-card
              :selected="
                video_format_selection === bestSingleFileFormat &&
                audio_format_selection === ''
              "
              :disabled="false"
              :title="`Best single file`"
              @onClick="
                () => {
                  video_format_selection = bestSingleFileFormat;
                  audio_format_selection = '';
                }
              "
            >
              <v-card-subtitle class="caption">
                Best quality format represented by a single file.
              </v-card-subtitle>
            </selectable-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pt-0 text-center">
        <v-btn
          v-show="!show_single_file_formats"
          @click="show_single_file_formats = true"
          text
          x-small
        >
          {{ format_selection_pretty }} Or compile your own
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="show_single_file_formats">
      <v-col v-if="hasVideoOrAudioFormats" cols="12" md="6">
        <p class="text-center caption">Video</p>
        <selectable-card
          class="mb-6"
          :selected="video_format_selection === ''"
          :disabled="false"
          :title="`No video stream`"
          @onClick="video_format_selection = ''"
        >
          <v-card-subtitle class="caption">
            Download the file without a video stream (audio only).
          </v-card-subtitle>
        </selectable-card>
        <v-row>
          <v-col
            v-for="format in videoOnlyFormats"
            :key="format.format_id"
            cols="6"
          >
            <selectable-card
              :selected="video_format_selection === format.format_id"
              :disabled="false"
              :title="`${format.format_note}`"
              @onClick="video_format_selection = format.format_id"
            >
              <v-card-subtitle class="caption">
                {{ format.width }}x{{ format.height }} &middot;
                {{ format.fps }} fps &middot; {{ format.tbr }} KBit/s
              </v-card-subtitle>
              <v-card-text class="overline">
                {{ format.ext }} &middot; {{ format.vcodec }}
              </v-card-text>
            </selectable-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="hasVideoOrAudioFormats" cols="12" md="6">
        <p class="text-center caption">Audio</p>
        <selectable-card
          class="mb-6"
          :selected="audio_format_selection === ''"
          :disabled="false"
          :title="`No audio stream`"
          @onClick="audio_format_selection = ''"
        >
          <v-card-subtitle class="caption">
            Download the file without a audio stream (video only).
          </v-card-subtitle>
        </selectable-card>
        <v-row>
          <v-col
            v-for="format in audioOnlyFormats"
            :key="format.format_id"
            cols="6"
          >
            <selectable-card
              :selected="audio_format_selection === format.format_id"
              :disabled="false"
              :title="`${format.abr ? format.abr : '~'} KBit/s`"
              @onClick="audio_format_selection = format.format_id"
            >
              <v-card-subtitle class="caption">
                {{ format.asr }} Hertz
              </v-card-subtitle>
              <v-card-text class="overline">
                {{ format.ext }} &middot; {{ format.format_note }} &middot;
                {{ format.acodec }}
              </v-card-text>
            </selectable-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!hasVideoOrAudioFormats" cols="12" md="6">
        <p class="text-center caption">Single file</p>
        <v-row>
          <v-col
            v-for="format in this.data.options"
            :key="format.format_id"
            cols="6"
          >
            <selectable-card
              :selected="video_format_selection === format.format_id"
              :disabled="false"
              :title="format.format"
              @onClick="video_format_selection = format.format_id"
            >
              <v-card-text class="overline">
                {{ format.ext }}
              </v-card-text>
            </selectable-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import formatters from "../../../mixins/formatters";
import SelectableCard from "../SelectableCard";

export default {
  name: "components.steppers.handlers.audio-visual-step",
  mixin: [formatters],
  components: {
    SelectableCard,
  },
  data: () => {
    return {
      video_format_selection: "",
      audio_format_selection: "",
      output: "%(title)s.%(ext)s",
      show_single_file_formats: false,
      tab: 0,
    };
  },
  props: {
    active: Boolean,
    data: Object,
  },
  computed: {
    /**
     * Validate if all required fields have been filled in sufficiently.
     *
     * @returns {boolean|boolean}
     */
    valid() {
      return !!this.format_selection && !!this.output;
    },
    /**
     * Retrieve all possible audio format options.
     *
     * @returns {*}
     */
    audioOnlyFormats() {
      return this.data.options.filter(
        (i) => i.acodec !== "none" && i.vcodec === "none"
      );
    },
    /**
     * Return the best possible audio format available.
     *
     * @returns {*}
     */
    bestAudioFormat() {
      return this.audioOnlyFormats[this.audioOnlyFormats.length - 1].format_id;
    },
    /**
     * Check whether there are any audio formats available.
     *
     * @returns {*}
     */
    hasAudioFormats() {
      return this.audioOnlyFormats.length;
    },
    /**
     * Retrieve all possible video format options.
     *
     * @returns {*}
     */
    videoOnlyFormats() {
      return this.data.options.filter(
        (i) => i.acodec === "none" && i.vcodec !== "none"
      );
    },
    /**
     * Return the best possible audio format available.
     *
     * @returns {*}
     */
    bestVideoFormat() {
      return this.videoOnlyFormats[this.videoOnlyFormats.length - 1].format_id;
    },
    /**
     * Check whether there are any audio formats available.
     *
     * @returns {*}
     */
    hasVideoFormats() {
      return this.videoOnlyFormats.length;
    },
    /**
     * Return the best possible single file format available.
     *
     * @returns {*}
     */
    bestSingleFileFormat() {
      if (!("format_id" in this.data.options[this.data.options.length - 1])) {
        // eslint-disable-next-line vue/no-mutating-props, vue/no-side-effects-in-computed-properties
        this.data.options = [
          {
            ext: "Various",
            format: "Automatic",
            format_id: "bestvideo+bestaudio",
            format_note: "Automatic best file option",
          },
        ];
      }
      return this.data.options[this.data.options.length - 1].format_id;
    },
    /**
     * Check whether there are any audio or video formats available.
     *
     * @returns {*}
     */
    hasVideoOrAudioFormats() {
      return this.audioOnlyFormats.length || this.videoOnlyFormats.length;
    },
    /**
     * Combine the chosen video and audio option into a single format selection.
     *
     * @returns {string}
     */
    format_selection() {
      if (this.video_format_selection && this.audio_format_selection) {
        return `${this.video_format_selection}+${this.audio_format_selection}`;
      } else if (this.video_format_selection) {
        return this.video_format_selection;
      }
      return this.audio_format_selection;
    },
    /**
     * Combine the chosen video and audio option into a single format string.
     *
     * @returns {string}
     */
    format_selection_pretty() {
      if (!this.valid) return "";

      let format = "Using ";

      if (this.video_format_selection && this.audio_format_selection) {
        format += `${this.getSelection(this.video_format_selection)} with
         ${this.getSelection(this.audio_format_selection)} audio`;
      } else if (this.video_format_selection) {
        format += this.getSelection(this.video_format_selection);
      } else if (this.audio_format_selection) {
        format += `${this.getSelection(this.audio_format_selection)} audio`;
      }

      return format;
    },
  },
  watch: {
    /**
     * Trigger an update data check the when validity of the step has changed.
     *
     * @param n
     */
    valid(n) {
      this.updateData(n);
    },
    /**
     * Trigger an update data check when the format selection has changed.
     */
    format_selection() {
      this.updateData(this.valid);
    },
    /**
     * Trigger an update data check when the output has changed.
     */
    output() {
      this.updateData(this.valid);
    },
  },
  methods: {
    /**
     * Emit a data-change() event upstream to notify the stepper component.
     *
     * @param valid
     */
    updateData(valid) {
      if (valid) {
        this.$emit("data-change", {
          step: 3,
          data: {
            format_selection: this.format_selection,
            output: this.output,
          },
          label: "",
        });
      } else {
        this.$emit("data-change", {
          step: 3,
          data: {},
          label: "",
        });
      }
    },
    /**
     * Get the format object by format ID.
     *
     * @param id
     * @returns {*}
     */
    getSelection(id) {
      return this.data.options.find((f) => f.format_id === id).format_note;
    },
  },
};
</script>
