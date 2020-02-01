<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-stepper v-model="step" vertical class="elevation-0">
            <v-stepper-step :complete="step > 1" step="1">
              Submit a URL
              <small>{{ step1SubTitle }}</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-text-field
                label="URL"
                name="url"
                type="text"
                v-model="url"
                clearable
              />
              <v-btn
                :color="error ? 'error' : 'primary'"
                :loading="loading"
                :disabled="loading || !step1Valid"
                @click="getHandlers"
              >
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" step="2">
              Select a handler
              <small>{{ step2SubTitle }}</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-row>
                <v-col
                  v-for="_handler in handlers"
                  :key="_handler.request"
                  cols="12"
                  md="6"
                >
                  <v-card
                    outlined
                    :color="handler === _handler ? 'success--text' : ''"
                    :disabled="!_handler.supported"
                    @click="handler = _handler"
                  >
                    <v-card-title>
                      {{ formatRequest(_handler.request) }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ _handler.description }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
              <v-btn
                :color="error ? 'error' : 'primary'"
                :loading="loading"
                :disabled="loading || !step2Valid"
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
              <v-data-table
                v-if="step2Valid"
                v-model="format"
                :headers="format_headers"
                :items="handler.options"
                :single-select="true"
                item-key="format_id"
                show-select
              />
              <v-btn
                :color="error ? 'error' : 'primary'"
                :loading="loading"
                :disabled="loading || !step3Valid"
                @click="createRequest"
              >
                Continue
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import formatters from "../../mixins/formatters";

export default {
  name: "views.requests.create",
  mixin: [formatters],
  data: () => ({
    url: "",
    handlers: {},
    handler: {},
    format: [],
    format_headers: [
      {
        text: "Extension",
        align: "left",
        sortable: true,
        value: "ext"
      },
      {
        text: "Audio codec",
        align: "left",
        sortable: true,
        value: "acodec"
      },
      {
        text: "Video codec",
        align: "left",
        sortable: true,
        value: "vcodec"
      },
      {
        text: "Additional",
        align: "left",
        sortable: false,
        value: "format"
      }
    ],
    step: 1,
    loading: false,
    error: false
  }),
  computed: {
    step1Valid() {
      const regex = RegExp(
        "[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)"
      );
      return regex.test(this.url);
    },
    step1SubTitle() {
      return this.step1Valid && this.step > 1
        ? this.url
        : "Submit the URL of the resource.";
    },
    step2Valid() {
      return !(
        Object.entries(this.handler).length === 0 &&
        this.handler.constructor === Object
      );
    },
    step2SubTitle() {
      return this.step2Valid && this.step > 2
        ? this.formatRequest(this.handler.request)
        : "Select a handler to process the resource.";
    },
    step3Valid() {
      return this.format.length;
    }
  },
  methods: {
    getHandlers() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("handlers/getHandlerStatuses", this.url)
        .then(res => (this.handlers = res))
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false));
    },
    createRequest() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("requests/create", {
          request_type: this.handler.request,
          url: this.url,
          format_selection: this.format[0].format_id
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false));
    }
  },
  watch: {
    handlers() {
      if (this.step === 1) {
        this.step = 2;
      }
    }
  }
};
</script>
