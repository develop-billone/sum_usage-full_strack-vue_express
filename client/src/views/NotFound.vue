<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card class="d-flex flex-column align-center">
          <v-card-title>Not Found</v-card-title>
          <v-card-text>
            <p>Sorry item is not found, Please check process status</p>
          </v-card-text>
          <template v-slot:actions>
            <v-btn @click="back" variant="outlined">Go Back</v-btn>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const back = () => {
  router.go(-1);
};
</script>
