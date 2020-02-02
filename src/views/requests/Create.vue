<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-stepper v-model="step" vertical class="elevation-0">
            <v-stepper-step :complete="step > 1" step="1">
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
              Configure the handler settings.
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
              <v-btn
                outlined
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
import helpers from "../../mixins/helpers";
import formatters from "../../mixins/formatters";
import UrlStep from "../../components/requests/steppers/UrlStep";
import RequestTypeStep from "../../components/requests/steppers/RequestTypeStep";
import AudioVisualStep from "../../components/requests/steppers/handlers/AudioVisualStep";

export default {
  name: "views.requests.create",
  mixin: [helpers, formatters],
  components: {
    UrlStep,
    RequestTypeStep,
    AudioVisualStep
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
          ...this.step3Data
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false));
    }
  }
};
</script>
