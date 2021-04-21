<template>
  <v-tab-item>
    <json-viewer :value="item" theme="custom-json-theme" />
  </v-tab-item>
</template>

<script>
import JsonViewer from "vue-json-viewer";
import "vue-json-viewer/style.css";

export default {
  name: "components.requests.detail.tabs.timeline",
  components: {
    JsonViewer,
  },
  props: {
    active: Boolean,
    item: Object,
  },
};
</script>

<style lang="scss">
.custom-json-theme {
  white-space: nowrap;
  color: #fff;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;

  .jv-ellipsis {
    color: #999;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button {
    color: #0b85db;
  }
  .jv-key {
    color: #fff;
  }
  .jv-item {
    &.jv-array {
      color: #efe4d1;
    }
    &.jv-boolean {
      color: #9eadab;
    }
    &.jv-function {
      color: #203452;
    }
    &.jv-number {
      color: #f23e16;
    }
    &.jv-object {
      color: #fff;
    }
    &.jv-undefined {
      color: #fb8c00;
    }
    &.jv-string {
      color: #bdf2c9;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    padding: 10px 0 10px 0 !important;

    .jv-toggle {
      &:before {
        padding: 0 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: #eee;
        }
      }
    }
  }
}

.v-application a {
  color: #efe4d1;
}
</style>
