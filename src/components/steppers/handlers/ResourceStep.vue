<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <p class="body-2 mb-n1">Minimum size</p>
        <small class="font-weight-light grey--text text--lighten-1">
          Select the minimum size for each resource. 0 bytes will download all
          resources.
        </small>
        <v-col cols="12" class="px-0">
          <v-slider
            v-model="min_bytes"
            color="info"
            min="0"
            max="5242880"
            step="262144"
            ticks="always"
            hide-details
          >
            <template v-slot:label>
              <small class="font-weight-light grey--text text--lighten-2">
                Size
              </small>
            </template>
            <template v-slot:append>
              <small class="font-weight-light grey--text text--lighten-2">
                {{ formatBytes(min_bytes, 1) }}
              </small>
            </template>
          </v-slider>
        </v-col>
      </v-col>
      <v-col cols="12" md="6">
        <p class="body-2 mb-n1">Delay</p>
        <small class="font-weight-light grey--text text--lighten-1">
          Select a delay between each resource download.
        </small>
        <v-col cols="12" class="px-0">
          <v-slider
            v-model="delay"
            color="info"
            min="0"
            max="1000"
            step="25"
            ticks="always"
            hide-details
          >
            <template v-slot:label>
              <small class="font-weight-light grey--text text--lighten-2">
                Delay
              </small>
            </template>
            <template v-slot:append>
              <small class="font-weight-light grey--text text--lighten-2">
                {{ delay }} ms
              </small>
            </template>
          </v-slider>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <p class="body-2 mb-n1">Resource extensions</p>
        <small class="font-weight-light grey--text text--lighten-1">
          Select one or multiple extensions below. You can also add new
          extensions if necessary.
        </small>
      </v-col>
      <v-col class="py-0" cols="12" md="2">
        <v-checkbox
          :value="hasExtensionPreset('image', true)"
          :indeterminate="hasExtensionPreset('image', false)"
          color="info"
          prepend-icon="mdi-image"
          label="Images"
          dense
          hide-details
          readonly
          @click="
            updateExtensionPresets('image', !hasExtensionPreset('image', true))
          "
        />
      </v-col>
      <v-col class="py-0" cols="12" md="2">
        <v-checkbox
          :value="hasExtensionPreset('video', true)"
          :indeterminate="hasExtensionPreset('video', false)"
          color="info"
          prepend-icon="mdi-video"
          label="Video's"
          dense
          hide-details
          readonly
          @click="
            updateExtensionPresets('video', !hasExtensionPreset('video', true))
          "
        />
      </v-col>
      <v-col class="py-0" cols="12" md="2">
        <v-checkbox
          :value="hasExtensionPreset('audio', true)"
          :indeterminate="hasExtensionPreset('audio', false)"
          color="info"
          prepend-icon="mdi-music"
          label="Audio"
          dense
          hide-details
          readonly
          @click="
            updateExtensionPresets('audio', !hasExtensionPreset('audio', true))
          "
        />
      </v-col>
      <v-col class="py-0" cols="12" md="2">
        <v-checkbox
          :value="hasExtensionPreset('archive', true)"
          :indeterminate="hasExtensionPreset('archive', false)"
          color="info"
          prepend-icon="mdi-zip-box"
          label="Archives"
          dense
          hide-details
          readonly
          @click="
            updateExtensionPresets(
              'archive',
              !hasExtensionPreset('archive', true)
            )
          "
        />
      </v-col>
      <v-col class="py-0" cols="12" md="2">
        <v-checkbox
          :value="hasExtensionPreset('document', true)"
          :indeterminate="hasExtensionPreset('document', false)"
          color="info"
          prepend-icon="mdi-file-document-outline"
          label="Documents"
          dense
          hide-details
          readonly
          @click="
            updateExtensionPresets(
              'document',
              !hasExtensionPreset('document', true)
            )
          "
        />
      </v-col>
      <v-col class="py-0" cols="12" md="2">
        <v-checkbox
          :value="hasExtensionPreset('web', true)"
          :indeterminate="hasExtensionPreset('web', false)"
          color="info"
          prepend-icon="mdi-web"
          label="Web"
          dense
          hide-details
          readonly
          @click="
            updateExtensionPresets('web', !hasExtensionPreset('web', true))
          "
        />
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-combobox
              v-model="extensions"
              :items="default_extensions"
              color="info"
              label="Extensions"
              dense
              hide-details
              hide-selected
              flat
              multiple
              outlined
              solo
              small-chips
            ></v-combobox>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import _ from "lodash";
import formatters from "../../../mixins/formatters";

export default {
  name: "components.steppers.handlers.resource-step",
  mixin: [formatters],
  data() {
    const image_extensions = ["gif", "jpeg", "jpg", "png", "tiff", "webp"];
    const video_extensions = ["avi", "mov", "qt", "mpeg", "mpg", "mp4", "webm"];
    const audio_extensions = ["mid", "midi", "mp3", "wav"];
    const archive_extensions = ["7z", "rar", "zip", "exe"];
    const document_extensions = ["doc", "pdf", "txt"];
    const web_extensions = ["css", "htm", "html"];

    return {
      default_extensions: [].concat(
        image_extensions,
        video_extensions,
        audio_extensions,
        document_extensions,
        archive_extensions,
        web_extensions
      ),
      image_extensions: image_extensions,
      video_extensions: video_extensions,
      audio_extensions: audio_extensions,
      document_extensions: document_extensions,
      archive_extensions: archive_extensions,
      web_extensions: web_extensions,
      extensions: [],
      min_bytes: 0,
      delay: 25,
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
      return !!this.extensions.length;
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
     * Trigger an update data check when an extension is added/removed.
     */
    extensions() {
      this.updateData(this.valid);
    },
    /**
     * Trigger an update data check when the min_bytes value is changed.
     */
    min_bytes() {
      this.updateData(this.valid);
    },
    /**
     * Trigger an update data check when the delay value is changed.
     */
    delay() {
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
            extensions: this.extensions,
            min_bytes: this.min_bytes,
            delay: this.delay,
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
     * Check if a given extension preset is fully
     * or partly present in the chosen extensions.
     *
     * @param preset
     * @param all
     * @returns {*}
     */
    hasExtensionPreset(preset, all) {
      const i = _.intersection(
        this.extensions,
        this[`${preset}_extensions`]
      ).length;
      return all
        ? i === this[`${preset}_extensions`].length
        : i > 0 && !(i === this[`${preset}_extensions`].length);
    },
    /**
     * Add or remove an entire extension preset from the chosen extensions.
     *
     * @param preset
     * @param add
     */
    updateExtensionPresets(preset, add) {
      if (add) {
        this.extensions = _.union(
          this.extensions,
          this[`${preset}_extensions`]
        );
      } else {
        this.extensions = _.difference(
          this.extensions,
          this[`${preset}_extensions`]
        );
      }
    },
  },
};
</script>
