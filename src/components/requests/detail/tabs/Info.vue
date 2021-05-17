<template>
  <v-tab-item>
    <v-row v-if="item.status !== 'completed' && item.status !== 'failed'">
      <v-col cols="12">
        <p class="mb-0">
          Request has not finished downloading/processing. Information will
          appear after the request has completed.
        </p>
      </v-col>
    </v-row>
    <v-row v-else-if="item.status === 'failed'">
      <v-col cols="12">
        <p class="mb-0">
          Request has failed downloading. Please retry the request again
          (later).
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
    <torrent-info
      v-else-if="item.request_type === 'TorrentRequest'"
      :item="item"
    />
    <resource-info
      v-else-if="item.request_type === 'ResourceRequest'"
      :item="item"
    />
    <v-row v-else>
      <v-col cols="12">
        <p class="mb-0">
          Request has finished downloading but no details view is available for
          this request type.
        </p>
      </v-col>
    </v-row>
  </v-tab-item>
</template>

<script>
import formatters from "../../../../mixins/formatters";
import AudioVisualInfo from "./handlers/AudioVisualInfo";
import DirectInfo from "./handlers/DirectInfo";
import TorrentInfo from "./handlers/TorrentInfo";
import ResourceInfo from "./handlers/ResourceInfo";

export default {
  name: "components.requests.detail.tabs.info",
  mixin: [formatters],
  components: {
    AudioVisualInfo,
    DirectInfo,
    TorrentInfo,
    ResourceInfo,
  },
  props: {
    active: Boolean,
    item: Object,
  },
};
</script>
