<template>
  <v-row>
    <v-col cols="12" md="7">
      <p class="mb-0 title">{{ item.data.title }}</p>
      <p class="font-weight-light">
        By
        <span class="font-weight-bold">
          {{ item.data.uploader }}
        </span>
        <span>on {{ item.data.extractor_key }}</span>
      </p>
      <span>{{ Number(item.data.view_count).toLocaleString() }} plays</span>
      &middot;
      <span>{{ formatDate(item.data.upload_date, "LL") }}</span>
      <v-rating
        v-if="'average_rating' in item.data"
        class="mt-n2 float-right"
        background-color="orange lighten-3"
        color="orange"
        half-increments
        small
        readonly
        v-model="item.data.average_rating"
      />
      <v-divider class="mt-4" />
      <pre class="mt-4 mb-8 body-2 font-weight-light" id="pre-description">
        {{ item.data.description }}
      </pre>
      <v-row v-if="'categories' in item.data">
        <v-col class="py-0 body-2 font-weight-light" cols="3">
          Categories:
        </v-col>
        <v-col class="py-0 body-2 font-weight-thin" cols="9">
          {{ item.data.categories.join(", ") }}
        </v-col>
      </v-row>
      <v-row v-if="'tags' in item.data && item.data.tags.length">
        <v-col class="py-0 font-weight-light" cols="3">
          Tags:
        </v-col>
        <v-col class="py-0 body-2 font-weight-thin" cols="9">
          {{ item.data.tags.join(", ") }}
        </v-col>
      </v-row>
      <v-row v-if="'license' in item.data && item.data.license">
        <v-col class="py-0 font-weight-light" cols="3">
          Copyright:
        </v-col>
        <v-col class="py-0 body-2 font-weight-thin" cols="9">
          {{ item.data.license }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="5">
      <v-parallax id="thumbnail" :src="item.data.thumbnail" height="300" />
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
    item: Object
  }
};
</script>

<style scoped>
#pre-description {
  white-space: pre-line;
}

#thumbnail {
  border-radius: 4px;
}
</style>
