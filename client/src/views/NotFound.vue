<template>
    <v-container>
        <v-row>
        <v-col cols="12">
            <v-card>
            <v-card-title>404 Not Found</v-card-title>
            <v-card-text>
                <p>Sorry, the page you are looking for could not be found.</p>
                <v-btn @click="back">Go Back</v-btn>
            </v-card-text>
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
