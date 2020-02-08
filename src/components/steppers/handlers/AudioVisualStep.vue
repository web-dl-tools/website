<template>
  <div>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-subheader class="pl-0">Output format</v-subheader>
      </v-col>
      <v-col cols="12" md="6">
        <v-select v-model="output" :items="outputs" label="Format" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-subheader class="pl-0">File formats</v-subheader>
      </v-col>
      <v-col cols="12">
        <v-tabs centered grow v-model="tab">
          <v-tab>
            <v-badge :content="audioAndVideoFormats.length">
              Audio & Video
            </v-badge>
          </v-tab>
          <v-tab>
            <v-badge :content="audioOnlyFormats.length">
              Audio only
            </v-badge>
          </v-tab>
          <v-tab>
            <v-badge :content="videoOnlyFormats.length">
              Video only
            </v-badge>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row>
              <v-col
                v-for="format in audioAndVideoFormats"
                :key="format.format_id"
                cols="12"
                md="4"
              >
                <selectable-card
                  :selected="format_selection === format.format_id"
                  :disabled="false"
                  :title="`${format.ext} file`"
                  @onClick="format_selection = format.format_id"
                >
                  <v-card-subtitle class="caption">
                    {{ format.format_note }}
                  </v-card-subtitle>
                  <v-card-text class="overline">
                    {{ format.width }}x{{ format.height }} &middot;
                    {{ format.vcodec }} & {{ format.acodec }} &middot;
                    {{ format.tbr }} KBit/s
                  </v-card-text>
                </selectable-card>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col
                v-for="format in audioOnlyFormats"
                :key="format.format_id"
                cols="12"
                md="4"
              >
                <selectable-card
                  :selected="format_selection === format.format_id"
                  :disabled="false"
                  :title="`${format.ext} file`"
                  @onClick="format_selection = format.format_id"
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
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col
                v-for="format in videoOnlyFormats"
                :key="format.format_id"
                cols="12"
                md="4"
              >
                <selectable-card
                  :selected="format_selection === format.format_id"
                  :disabled="false"
                  :title="`${format.ext} file`"
                  @onClick="format_selection = format.format_id"
                >
                  <v-card-subtitle class="caption">
                    {{ format.width }}x{{ format.height }} &middot;
                    {{ format.fps }} fps
                  </v-card-subtitle>
                  <v-card-text class="overline">
                    {{ format.format_note }} &middot;
                    {{ format.vcodec }} &middot; {{ format.tbr }} KBit/s
                  </v-card-text>
                </selectable-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
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
      format_selection: "",
      output: "%(title)s.%(ext)s",
      outputs: [
        {
          text: "Video title",
          value: "%(title)s.%(ext)s"
        },
        {
          text: "Alternative video title",
          value: "%(alt_title)s.%(ext)s"
        },
        {
          text: "Video identifier",
          value: "%(id)s.%(ext)s"
        },
        {
          text: "The creator of the video with the video title",
          value: "%(creator)s - %(title)s.%(ext)s"
        }
      ],
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
    audioAndVideoFormats() {
      return this.data.options.filter(
        i => i.acodec !== "none" && i.vcodec !== "none"
      );
    },
    audioOnlyFormats() {
      return this.data.options.filter(
        i => i.acodec !== "none" && i.vcodec === "none"
      );
    },
    videoOnlyFormats() {
      return this.data.options.filter(
        i => i.acodec === "none" && i.vcodec !== "none"
      );
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
