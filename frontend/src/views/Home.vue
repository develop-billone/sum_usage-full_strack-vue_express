<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-2xl font-bold">Home</h1>
        <div class="grid lg:flex">
          <div class="inline-grid">
            <label for="start_date">Start Date</label>
            <input
              type="datetime-local"
              v-model="start_date"
              id="start_date"
              class="border rounded-md p-3"
            />
          </div>
          <div class="inline-grid">
            <label for="end_date">End Date</label>
            <input
              type="datetime-local"
              v-model="end_date"
              id="end_date"
              class="border rounded-md p-3"
            />
          </div>
          <div class="inline-grid">
            <label for="file">Upload Text File</label>
            <input
              type="file"
              @change="handleFileUpload"
              id="file"
              class="border rounded-md p-3"
            />
          </div>
        </div>
        <v-btn @click="handleSubmit">Submit</v-btn>

        <v-card>
          <v-card-text>
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Name</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in usageList" :key="item.jobId">
                  <td>{{ item.jobId }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import getUsageApi from "../composable/getUsageApi";

const start_date = ref("20240801000000");
const end_date = ref("20240824235959");
const number = ref(["66951623542", "66951623522"]); // ตัวอย่างหมายเลข

const { usage, error, getUsage, usageList, getUsageList } = getUsageApi();

onMounted(async () => {
  await getUsageList();
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // ทำการประมวลผลไฟล์ที่อัปโหลดถ้าจำเป็น
    console.log("Uploaded file:", file);
  }
};

const handleSubmit = async () => {
  try {
    const result = await getUsage({
      start_date: start_date.value,
      end_date: end_date.value,
      number: number.value,
    });
    console.log(result);
  } catch (err) {
    console.error(err);
    error.value = err.message || "An error occurred";
  }
};
</script>
