<template>
  <div>
    <v-row class="mt-n3" v-if="!show_manual_formats">
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
              :disabled="audio_format !== null"
              :title="`Best video file`"
              :icon="'mdi-movie-outline'"
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
              icon="mdi-music"
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
        </v-row>
      </v-col>
    </v-row>

    <v-row v-show="!show_manual_formats && !show_single_file_formats">
      <v-col cols="12" class="pt-0 mb-3 text-center">
        <v-btn @click="show_single_file_formats = true" text x-small>
          <v-icon class="mr-2" x-small> mdi-hammer-wrench </v-icon>
          {{ format_selection_pretty }} Or compile your own
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="!show_manual_formats && show_single_file_formats">
      <v-col v-if="hasVideoFormats" cols="12" md="6" class="pb-0">
        <p class="text-center caption">Video</p>
        <selectable-card
          class="mb-3"
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
              :disabled="audio_format !== null"
              :title="`${format.format_note}`"
              @onClick="video_format_selection = format.format_id"
            >
              <v-card-subtitle class="caption">
                {{ format.width }}x{{ format.height }} &middot;
                {{ format.fps }} fps &middot; {{ format.tbr }} KBit/s
              </v-card-subtitle>
              <v-card-text class="overline mb-n2">
                {{ format.ext }} &middot; {{ format.vcodec }}
              </v-card-text>
            </selectable-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="hasAudioFormats" cols="12" md="6" class="pb-0">
        <p class="text-center caption">Audio</p>
        <selectable-card
          class="mb-3"
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
              <v-card-text class="overline mb-n2">
                {{ format.ext }} &middot; {{ format.format_note }} &middot;
                {{ format.acodec }}
              </v-card-text>
            </selectable-card>
          </v-col>
          <v-col cols="12">
            <p class="body-2 mb-n1">Reformat audio</p>
            <small class="font-weight-light grey--text text--lighten-1">
              Specify a audio format to optionally recode to.
            </small>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-select
              v-model="audio_format"
              :items="audio_formats"
              color="info"
              label="Select a new audio format"
              dense
              outlined
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-show="show_single_file_formats && !show_manual_formats">
      <v-col cols="12" class="py-0">
        <v-row>
          <v-col cols="12" class="pt-0 mb-3 text-center">
            <v-btn
              @click="
                () => {
                  this.show_single_file_formats = false;
                  this.show_manual_formats = true;
                  this.video_format_selection = '';
                  this.audio_format_selection = '';
                }
              "
              text
              x-small
            >
              <v-icon class="mr-2" x-small> mdi-draw </v-icon>
              Or go full manual and select a (single) raw file
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="!show_single_file_formats && show_manual_formats">
      <v-col cols="12" class="pt-0">
        <v-row>
          <v-col cols="12" class="pt-0 pb-2">
            <p class="body-2 mb-n1">Raw selection</p>
            <small class="font-weight-light grey--text text--lighten-1">
              Select a raw file format manually.
            </small>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="videoFormatObject"
              :items="data.options"
              color="info"
              label="Select a raw format"
              :item-text="
                (i) => `Format ${i.format_id} - ${i.format} - ${i.format_note}`
              "
              item-value="format_id"
              dense
              outlined
              hide-details
            ></v-select>
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
      audio_format: null,
      audio_formats: [
        { text: "Use best available encoding", value: null },
        { text: "Advanced Audio Coding (.aac)", value: "aac" },
        { text: "MPEG-4 Part 14 (.m4a)", value: "m4a" },
        { text: "MP3", value: "mp3" },
        { text: "OPUS", value: "opus" },
        { text: "Vorbis", value: "vorbis" },
        { text: "Waveform Audio File Format (.wav)", value: "wav" },
      ],
      show_single_file_formats: false,
      show_manual_formats: false,
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
     * Get and set the first input selection (video) via a select input.
     *
     * @returns {string}
     */
    videoFormatObject: {
      get() {
        return this.data.options.find(
          (i) => i.format_id === this.video_format_selection
        );
      },
      set(id) {
        this.video_format_selection = id;
      },
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
     * Check if there are video or audio formats
     * and possibly pre-trigger the manual formats view.
     */
    active() {
      if (!(this.hasVideoFormats || this.hasAudioFormats)) {
        this.show_single_file_formats = false;
        this.show_manual_formats = true;
      }
    },
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
    /**
     * Trigger an update data check when the audio format has changed.
     */
    audio_format() {
      this.video_format_selection = "";
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
            audio_format: this.audio_format,
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
      const f = this.data.options.find((f) => f.format_id === id);
      return "format_note" in f ? f.format_note : f.format;
    },
  },
};
</script>
