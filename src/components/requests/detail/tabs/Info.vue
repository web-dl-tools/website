<template>
  <v-tab-item>
    <v-row v-if="item.status !== 'completed'">
      <v-col cols="12">
        <p class="mb-0">
          Request has not finished processing. Information will appear after the
          request has completed.
        </p>
      </v-col>
    </v-row>
    <audio-visual-info
      v-else-if="item.request_type === 'AudioVisualRequest'"
      :item="item"
    />
    <direct-info
      v-else-if="item.request_type === 'DirectRequest'"
      :item="item"
    />
  </v-tab-item>
</template>

<script>
import formatters from "../../../../mixins/formatters";
import AudioVisualInfo from "./handlers/AudioVisualInfo";
import DirectInfo from "./handlers/DirectInfo";

export default {
  name: "components.requests.detail.tabs.info",
  mixin: [formatters],
  components: {
    AudioVisualInfo,
    DirectInfo
  },
  props: {
    active: Boolean,
    item: Object
  }
};
</script>
