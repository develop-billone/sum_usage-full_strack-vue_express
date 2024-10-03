<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="flex space-x-5 mb-4">
          <v-btn @click="back"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style="fill: rgba(0, 0, 0, 1)"
            >
              <path
                d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"
              ></path>
            </svg>
          </v-btn>
          <h1 class="text-2xl font-bold">Usage Detail {{ route.params.id }}</h1>
        </div>
        <v-card>
          <v-card-title>
            <div class="flex justify-between">
              <h1>Detail</h1>
              <v-btn
                name="download"
                class="w-20"
                @click="handleDownload"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="fill-current"
                >
                  <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                  <path
                    d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"
                  ></path>
                </svg>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>MSISDN</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Voice Usage(Second)</th>
                  <th>SMS Usage(Item)</th>
                  <th>Data Usage(Byte)</th>
                  <th>Debit Usage(Baht)</th>
                </tr>
              </thead>
              <tbody v-for="items in data">
                <tr v-for="item in items.result">
                  <td>{{ item.number }}</td>
                  <td>{{ item.min_start_date }}</td>
                  <td>{{ item.max_end_date }}</td>
                  <td>{{ item.voice_usage }}</td>
                  <td>{{ item.sms_usage }}</td>
                  <td>{{ item.data_usage }}</td>
                  <td>{{ item.debit_amount }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import getUsageApi from "../composable/getUsageApi";
import Export from "../scripts/export";

const router = useRouter();
const route = useRoute();
const { getUsage, usage, error } = getUsageApi();
const data = ref(null);

onMounted(async () => {
  await getUsage(route.params.id);
  data.value = usage.value;
});

const { exportToCsv } = Export();
const handleDownload = () => {
  try {
    exportToCsv(usage.value.data.result, "usage" + usage.value.data.name);
  } catch (err) {
    console.error(err);
    error.value = err.message || "An error occurred";
  }
};

const back = () => {
  router.go(-1);
};
</script>
