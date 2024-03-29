<template>
  <v-main class="background-wallpaper">
    <v-container class="pt-3">
      <app-title />
      <v-row>
        <v-col cols="12">
          <v-stepper outlined v-model="step" class="elevation-8 pb-0" vertical>
            <v-stepper-step :complete="step > 1" color="secondary" step="1">
              Submit a URL
              <small>{{ step1Label }}</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-row class="mx-0">
                <url-step
                  :active="step === 1"
                  @data-change="dataChange"
                  @automatic-action="getHandlers"
                />
                <v-col class="pa-0" cols="12" md="4">
                  <v-btn
                    :class="[
                      {
                        'no-border-left no-radius-left':
                          $vuetify.breakpoint.mdAndUp,
                      },
                    ]"
                    height="40"
                    block
                    :color="error ? 'error' : 'secondary'"
                    :disabled="step1continue"
                    :loading="loading"
                    :outlined="step1continue"
                    @click="getHandlers"
                  >
                    <template v-slot:loader>
                      <v-progress-circular indeterminate size="18" width="2" />
                      <span class="pl-2">Getting handlers</span>
                    </template>
                    <v-icon left> mdi-search-web </v-icon>
                    Get handlers
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" color="secondary" step="2">
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
                block
                :color="error ? 'error' : 'secondary'"
                :disabled="step2continue"
                :loading="loading"
                :outlined="step2continue"
                @click="step = 3"
              >
                <v-icon left> mdi-tools </v-icon>
                Configure
              </v-btn>
            </v-stepper-content>

            <v-stepper-step color="secondary" step="3">
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
                class="mb-6 grey--text text--darken-4"
                :color="error ? 'error' : 'success'"
                :disabled="step3continue"
                :loading="loading"
                :outlined="step3continue"
                @click="createRequest"
              >
                <v-icon left> mdi-cloud-download-outline </v-icon>
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
import AppTitle from "../../components/ui/AppTitle";
import UrlStep from "../../components/steppers/UrlStep";
import RequestTypeStep from "../../components/steppers/RequestTypeStep";
import RequestTypeConfigStep from "../../components/steppers/RequestTypeConfigStep";
import AudioVisualStep from "../../components/steppers/handlers/AudioVisualStep";
import ResourceStep from "../../components/steppers/handlers/ResourceStep";

export default {
  name: "views-requests-create",
  mixin: [helpers, formatters],
  components: {
    AppTitle,
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
    step1continue() {
      return this.loading || !this.isEmptyObject(this.step1Data);
    },
    step2continue() {
      return this.loading || !this.isEmptyObject(this.step2Data);
    },
    step3continue() {
      return this.loading || !this.isEmptyObject(this.step3Data);
    },
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
