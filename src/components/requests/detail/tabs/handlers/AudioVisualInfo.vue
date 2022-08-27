<template>
  <v-row>
    <v-col cols="12" md="8">
      <p class="mb-0 body-1">{{ item.data.title }}</p>
      <p class="body-2 font-weight-light">
        By
        <span class="font-weight-bold">
          {{ item.data.uploader }}
        </span>
        <span>on {{ item.data.extractor_key }}</span>
      </p>
      <v-row>
        <v-col cols="12" sm="8" class="py-0">
          <span>{{ Number(item.data.view_count).toLocaleString() }} plays</span>
          &middot;
          <span>{{ formatDate(item.data.upload_date, "LL") }}</span>
        </v-col>
        <v-col cols="12" sm="4" class="py-0">
          <v-rating
            v-if="'average_rating' in item.data && item.data.average_rating"
            :value="item.data.average_rating"
            background-color="orange lighten-3"
            :class="
              $vuetify.breakpoint.smAndDown ? 'mt-2 ml-n2' : 'mt-n2 float-right'
            "
            color="orange"
            half-increments
            readonly
            small
          />
          <p v-else-if="'like_count' in item.data" class="mb-0 text-sm-end">
            <v-icon class="mr-2" small>mdi-thumb-up-outline</v-icon>
            {{
              Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(item.data.like_count)
            }}
          </p>
        </v-col>
      </v-row>
      <v-divider class="mt-4" />
      <pre class="mt-4 mb-8 body-2 font-weight-light" id="pre-description">
        {{ item.data.description }}
      </pre>
      <v-row v-if="'categories' in item.data">
        <v-col class="py-0 body-2 font-weight-light" cols="3">
          Categories
        </v-col>
        <v-col class="py-0 body-2 font-weight-thin" cols="9">
          <v-chip
            v-for="category in item.data.categories"
            :key="category"
            class="ma-1 ml-0"
            label
            x-small
          >
            {{ category }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row v-if="'tags' in item.data && item.data.tags.length">
        <v-col class="py-0 font-weight-light" cols="3"> Tags </v-col>
        <v-col class="py-0 body-2 font-weight-thin" cols="9">
          <v-chip
            v-for="tag in item.data.tags"
            :key="tag"
            class="ma-1 ml-0"
            label
            outlined
            x-small
          >
            {{ tag }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row v-if="'license' in item.data && item.data.license">
        <v-col class="py-0 font-weight-light" cols="3"> Copyright </v-col>
        <v-col class="py-0 grey--text" cols="9">
          {{ item.data.license }}
        </v-col>
      </v-row>
      <v-row class="pt-2">
        <v-col class="py-0 body-2 font-weight-light" cols="3">
          Format selection
        </v-col>
        <v-col class="py-0 body-2 font-weight-thin" cols="9">
          {{ item.format_selection }}
          <span class="info--text" v-if="item.audio_format">
            <br />
            Recoded to {{ item.audio_format }} audio format
          </span>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="4">
      <v-parallax
        :src="item.data.thumbnail"
        height="300"
        class="border-radius"
      />
    </v-col>
  </v-row>
</template>

<script>
import formatters from "../../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.handlers.audio-visual-info",
  mixin: [formatters],
  data: () => ({}),
  props: {
    item: Object,
  },
};
</script>

<style scoped>
#pre-description {
  white-space: pre-line;
}
</style>
