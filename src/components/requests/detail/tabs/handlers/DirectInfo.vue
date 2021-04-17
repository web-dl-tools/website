<template>
  <v-row>
    <v-col class="mt-n2" cols="12">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Header</th>
              <th class="text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, key) in item.data" :key="key">
              <td>{{ key }}</td>
              <td>{{ i }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "components.requests.detail.tabs.handlers.direct-info",
  data: () => ({}),
  props: {
    item: Object,
  },
};
</script>
