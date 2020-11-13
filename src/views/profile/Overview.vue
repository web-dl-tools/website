<template>
  <v-main class="background-wallpaper-subtle-image">
    <v-container>
      <v-row>
        <v-col class="px-0 py-0" cols="12" md="8">
          <p class="mx-3 my-12 black--text font-weight-thin display-3">
            {{ title }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card raised>
            <v-card-title class="subtitle-1 text-capitalize">
              Hello {{ user.first_name || user.username }},
            </v-card-title>
            <v-card-subtitle class="subtitle-2">
              Below you can find your information currently stored in Web DL.
            </v-card-subtitle>
            <v-card-text>
              <v-skeleton-loader type="paragraph" v-if="!user" />
              <v-row>
                <v-col cols="4" class="py-0 font-weight-black">Username</v-col>
                <v-col cols="8" class="py-0">{{ user.username }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="pt-0 font-weight-black">Full name</v-col>
                <v-col cols="8" class="pt-0">{{ user.full_name }}</v-col>
              </v-row>

              <v-row>
                <v-col cols="4" class="py-0 font-weight-black">Joined on</v-col>
                <v-col cols="8" class="py-0">
                  {{ formatDate(user.date_joined, "LLLL") }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                color="error"
                @click="$store.dispatch('application/logout')"
              >
                Sign out
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "views.profile.overview",
  mixin: [formatters],
  computed: {
    ...mapGetters({
      title: "application/getTitle",
      user: "users/getMe",
    }),
  },
};
</script>
