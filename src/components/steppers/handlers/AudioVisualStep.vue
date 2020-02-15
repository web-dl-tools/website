<template>
  <div>
    <v-row>
      <v-col cols="12" class="py-0">
        <p class="body-2 mb-n1">File format</p>
        <small class="font-weight-light grey--text text--lighten-1">
          Select a file format preset.
        </small>
      </v-col>
      <v-col class="pt-0" cols="12">
        <v-row>
          <v-col v-if="hasVideoFormat" cols="12" md="6">
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
          <v-col cols="12" md="6">
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
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-n6">
      <v-col cols="12">
        <small class="font-weight-light grey--text text--lighten-1">
          Or compile your own.
        </small>
        <v-checkbox class="mt-0" v-model="show_single_file_formats" dense />
      </v-col>
    </v-row>
    <v-row class="mt-n8" v-if="show_single_file_formats">
      <v-col cols="12" md="6">
        <p class="text-center caption">Video</p>
        <selectable-card
          class="mb-8"
          :selected="video_format_selection === ''"
          :disabled="false"
          :title="`No video`"
          @onClick="video_format_selection = ''"
        >
        </selectable-card>
        <selectable-card
          v-for="format in videoOnlyFormats"
          :key="format.format_id"
          class="mb-6"
          :selected="video_format_selection === format.format_id"
          :disabled="false"
          :title="`${format.ext}`"
          @onClick="video_format_selection = format.format_id"
        >
          <v-card-subtitle class="caption">
            {{ format.width }}x{{ format.height }} &middot; {{ format.fps }} fps
          </v-card-subtitle>
          <v-card-text class="overline">
            {{ format.format_note }} &middot; {{ format.vcodec }} &middot;
            {{ format.tbr }} KBit/s
          </v-card-text>
        </selectable-card>
      </v-col>
      <v-col cols="12" md="6">
        <p class="text-center caption">Audio</p>
        <selectable-card
          class="mb-8"
          :selected="audio_format_selection === ''"
          :disabled="false"
          :title="`No audio`"
          @onClick="audio_format_selection = ''"
        >
        </selectable-card>
        <selectable-card
          v-for="format in audioOnlyFormats"
          :key="format.format_id"
          class="mb-6"
          :selected="audio_format_selection === format.format_id"
          :disabled="false"
          :title="`${format.ext}`"
          @onClick="audio_format_selection = format.format_id"
        >
          <v-card-subtitle class="caption">
            {{ format.abr }} KBit/s
          </v-card-subtitle>
          <v-card-text class="overline">
            {{ capitalize(format.format_note) }} &middot;
            {{ format.acodec }} &middot; {{ format.asr }} Hertz
          </v-card-text>
        </selectable-card>
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
    SelectableCard
  },
  data: () => {
    return {
      video_format_selection: "",
      audio_format_selection: "",
      output: "%(title)s.%(ext)s",
      show_single_file_formats: false,
      tab: 0
    };
  },
  props: {
    active: Boolean,
    data: Object
  },
  computed: {
    valid() {
      return !!this.format_selection && !!this.output;
    },
    audioOnlyFormats() {
      return this.data.options.filter(
        i => i.acodec !== "none" && i.vcodec === "none"
      );
    },
    bestAudioFormat() {
      return this.audioOnlyFormats[this.audioOnlyFormats.length - 1].format_id;
    },
    videoOnlyFormats() {
      return this.data.options.filter(
        i => i.acodec === "none" && i.vcodec !== "none"
      );
    },
    bestVideoFormat() {
      return this.videoOnlyFormats[this.videoOnlyFormats.length - 1].format_id;
    },
    hasVideoFormat() {
      return this.videoOnlyFormats.length;
    },
    format_selection() {
      if (this.video_format_selection && this.audio_format_selection) {
        return `${this.video_format_selection}+${this.audio_format_selection}`;
      } else if (this.video_format_selection) {
        return this.video_format_selection;
      }
      return this.audio_format_selection;
    }
  },
  watch: {
    valid(n) {
      this.updateData(n);
    },
    format_selection() {
      this.updateData(this.valid);
    },
    output() {
      this.updateData(this.valid);
    }
  },
  methods: {
    updateData(valid) {
      if (valid) {
        this.$emit("dataChange", {
          step: 3,
          data: {
            format_selection: this.format_selection,
            output: this.output
          },
          label: ""
        });
      } else {
        this.$emit("dataChange", {
          step: 3,
          data: {},
          label: ""
        });
      }
    }
  }
};
</script>
