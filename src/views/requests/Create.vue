<template>
  <v-main class="background-wallpaper">
    <v-container class="pt-3">
      <v-row>
        <p
          class="mx-3 my-12 black--text font-weight-thin display-3 text-shadow"
        >
          {{ title }}
        </p>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-stepper v-model="step" class="elevation-8 pb-0" vertical>
            <v-stepper-step :complete="step > 1" step="1">
              Submit a URL
              <small>{{ step1Label }}</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <url-step
                :active="step === 1"
                @data-change="dataChange"
                @automatic-action="getHandlers"
              />
              <v-btn
                block
                text
                :color="error ? 'error' : 'white'"
                :loading="loading"
                :disabled="loading || !isEmptyObject(step1Data)"
                @click="getHandlers"
              >
                Get handlers
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" step="2">
              Select a handler
              <small>{{ step2Label }}</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <request-type-step
                :active="step === 2"
                :handlers="handlers"
                @data-change="dataChange"
              />
              <v-btn
                class="mt-2"
                block
                text
                :color="error ? 'error' : 'white'"
                :loading="loading"
                :disabled="loading || !isEmptyObject(step2Data)"
                @click="step = 3"
              >
                Configure
              </v-btn>
            </v-stepper-content>

            <v-stepper-step step="3">
              Configure the handler
              <small>What are the specifics to download?</small>
            </v-stepper-step>

            <v-stepper-content step="3">
              <audio-visual-step
                v-if="step2Data.request_type === 'AudioVisualRequest'"
                :active="step === 3"
                :data="handlers.find((i) => i.request === 'AudioVisualRequest')"
                @data-change="dataChange"
              />
              <resource-step
                v-else-if="step2Data.request_type === 'ResourceRequest'"
                :active="step === 3"
                :data="handlers.find((i) => i.request === 'ResourceRequest')"
                @data-change="dataChange"
              />
              <request-type-config-step
                v-else
                :active="step === 3"
                @data-change="dataChange"
              />
              <v-btn
                block
                text
                class="mb-6"
                :color="error ? 'error' : 'success'"
                :loading="loading"
                :disabled="loading || !isEmptyObject(step3Data)"
                @click="createRequest"
              >
                Download
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import helpers from "../../mixins/helpers";
import formatters from "../../mixins/formatters";
import UrlStep from "../../components/steppers/UrlStep";
import RequestTypeStep from "../../components/steppers/RequestTypeStep";
import RequestTypeConfigStep from "../../components/steppers/RequestTypeConfigStep";
import AudioVisualStep from "../../components/steppers/handlers/AudioVisualStep";
import ResourceStep from "../../components/steppers/handlers/ResourceStep";

export default {
  name: "views.requests.create",
  mixin: [helpers, formatters],
  components: {
    UrlStep,
    RequestTypeStep,
    RequestTypeConfigStep,
    AudioVisualStep,
    ResourceStep,
  },
  data: () => ({
    step1Data: {},
    step1Label: "Where is the resource located?",
    step2Data: {},
    step2Label: "How do you want to download the resource?",
    step3Data: {},
    step3Label: "ignored value.",
    handlers: [],
    step: 1,
    loading: false,
    error: false,
  }),
  computed: {
    ...mapGetters({
      title: "application/getTitle",
    }),
  },
  methods: {
    /**
     * Update the component data on step data changes.
     *
     * @param data
     */
    dataChange(data) {
      this[`step${data.step}Data`] = data.data;
      this[`step${data.step}Label`] = data.label;
    },
    /**
     * Get all the handler statuses.
     */
    getHandlers() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("handlers/getHandlerStatuses", this.step1Data.url)
        .then((res) => {
          this.handlers = res;
          this.step = 2;
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false));
    },
    /**
     * Create a new request.
     */
    createRequest() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("requests/create", {
          ...this.step1Data,
          ...this.step2Data,
          ...("skip" in this.step3Data ? {} : this.step3Data),
        })
        .then(() => this.$router.push({ name: "overview" }).catch(() => {}))
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
