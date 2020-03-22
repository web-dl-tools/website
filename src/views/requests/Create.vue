<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container class="pt-3">
      <v-row>
        <p class="mx-3 my-12 black--text font-weight-thin display-3">
          {{ title }}
        </p>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-stepper v-model="step" vertical class="elevation-8 pb-2">
            <v-stepper-step
              :editable="step === 2"
              :complete="step > 1"
              step="1"
            >
              Submit a URL
              <small>{{ step1Label }}</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <url-step :active="step === 1" @dataChange="dataChange" />
              <v-btn
                outlined
                :color="error ? 'error' : 'primary'"
                :loading="loading"
                :disabled="loading || !isEmptyObject(step1Data)"
                @click="getHandlers"
              >
                Continue
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
                @dataChange="dataChange"
              />
              <v-btn
                class="mt-2"
                outlined
                :color="error ? 'error' : 'primary'"
                :loading="loading"
                :disabled="loading || !isEmptyObject(step2Data)"
                @click="step = 3"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step step="3">
              Configure the handler settings
              <small>
                Configure the required custom settings for this handler.
              </small>
            </v-stepper-step>

            <v-stepper-content step="3">
              <audio-visual-step
                v-if="step2Data.request_type === 'AudioVisualRequest'"
                :active="step === 3"
                :data="handlers.find(i => i.request === 'AudioVisualRequest')"
                @dataChange="dataChange"
              />
              <resource-step
                v-else-if="step2Data.request_type === 'ResourceRequest'"
                :active="step === 3"
                :data="handlers.find(i => i.request === 'ResourceRequest')"
                @dataChange="dataChange"
              />
              <request-type-config-step
                v-else
                :active="step === 3"
                @dataChange="dataChange"
              />
              <v-btn
                outlined
                class="mb-4"
                :color="error ? 'error' : 'primary'"
                :loading="loading"
                :disabled="loading || !isEmptyObject(step3Data)"
                @click="createRequest"
              >
                Create
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
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
    ResourceStep
  },
  data: () => ({
    step1Data: {},
    step1Label: "Submit the URL of the resource.",
    step2Data: {},
    step2Label: "Select a handler to process the resource.",
    step3Data: {},
    step3Label: "",
    handlers: [],
    step: 1,
    loading: false,
    error: false
  }),
  computed: {
    ...mapGetters({
      title: "application/getTitle"
    })
  },
  methods: {
    dataChange(data) {
      this[`step${data.step}Data`] = data.data;
      this[`step${data.step}Label`] = data.label;
    },
    getHandlers() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("handlers/getHandlerStatuses", this.step1Data.url)
        .then(res => {
          this.handlers = res;
          this.step = 2;
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false));
    },
    createRequest() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("requests/create", {
          ...this.step1Data,
          ...this.step2Data,
          ...("skip" in this.step3Data ? {} : this.step3Data)
        })
        .then(() => this.$router.push({ name: "overview" }).catch(() => {}))
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false));
    }
  }
};
</script>
