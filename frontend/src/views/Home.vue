<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="space-y-3">
        <v-card>
          <v-card-text>
            <div class="grid lg:flex">
              <div class="flex gap-3">
                <div class="grid w-full">
                  <label for="start_date">Start Date</label>
                  <input
                    type="date"
                    v-model="start_date"
                    id="start_date"
                    class="border rounded-md p-3"
                  />
                </div>
                <div class="grid w-full">
                  <label for="end_date">End Date</label>
                  <input
                    type="date"
                    v-model="end_date"
                    id="end_date"
                    class="border rounded-md p-3"
                  />
                </div>
              </div>
              <div class="lg:ml-9 w-full">
                <label for="file"
                  >Upload Text File
                  <span class="text-red-500"
                    >*(request .txt limit 1000 record )</span
                  ></label
                >
                <input
                  type="file"
                  @change="handleFileUpload"
                  id="file"
                  class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                />
              </div>
            </div>
            <div class="mt-7">
              <v-btn @click="handleSubmit" class="w-full">Submit</v-btn>
            </div>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title>
            <div class="flex justify-between items-center">
              <h1>Usage List</h1>
              <button
                name="reload"
                @click="reload"
                class="inline-flex justify-center p-1 w-16 border rounded-md shadow-md hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="fill-current"
                >
                  <path
                    d="M19.89 10.105a8.696 8.696 0 0 0-.789-1.456l-1.658 1.119a6.606 6.606 0 0 1 .987 2.345 6.659 6.659 0 0 1 0 2.648 6.495 6.495 0 0 1-.384 1.231 6.404 6.404 0 0 1-.603 1.112 6.654 6.654 0 0 1-1.776 1.775 6.606 6.606 0 0 1-2.343.987 6.734 6.734 0 0 1-2.646 0 6.55 6.55 0 0 1-3.317-1.788 6.605 6.605 0 0 1-1.408-2.088 6.613 6.613 0 0 1-.382-1.23 6.627 6.627 0 0 1 .382-3.877A6.551 6.551 0 0 1 7.36 8.797 6.628 6.628 0 0 1 9.446 7.39c.395-.167.81-.296 1.23-.382.107-.022.216-.032.324-.049V10l5-4-5-4v2.938a8.805 8.805 0 0 0-.725.111 8.512 8.512 0 0 0-3.063 1.29A8.566 8.566 0 0 0 4.11 16.77a8.535 8.535 0 0 0 1.835 2.724 8.614 8.614 0 0 0 2.721 1.833 8.55 8.55 0 0 0 5.061.499 8.576 8.576 0 0 0 6.162-5.056c.22-.52.389-1.061.5-1.608a8.643 8.643 0 0 0 0-3.45 8.684 8.684 0 0 0-.499-1.607z"
                  ></path>
                </svg>
              </button>
            </div>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Usage</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in usageList"
                  :key="item.jobId"
                  class="cursor-pointer hover:bg-gray-50"
                >
                  <td @click="pathToDetail(item.jobId)">
                    {{ item.jobId }}
                  </td>
                  <td @click="pathToDetail(item.jobId)">
                    {{ item.name }}
                  </td>
                  <td @click="pathToDetail(item.jobId)">{{ item.status }}</td>
                  <td class="flex items-center justify-center">
                    <div class="space-x-3 flex items-center">
                      <button
                        name="download"
                        class="w-20 border rounded-md shadow-md flex justify-center p-2 hover:bg-green-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        @click="handleDownload(item.jobId)"
                        :disabled="item.status !== 'completed'"
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
                      </button>
                      <button @click="handleDelete(item.jobId)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          class="fill-red-500 hover:fill-red-700"
                        >
                          <path
                            d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"
                          ></path>
                          <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
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
import { useRouter } from "vue-router";
import getUsageApi from "../composable/getUsageApi";
import Export from "../scripts/export";
import { useToast } from "vue-toastification";

const toast = useToast();

const start_date = ref("");
const end_date = ref("");
const number = ref([]);

function parseDateString(date) {
  const dateConf = new Date(date);
  return (
    dateConf.getFullYear() +
    (dateConf.getMonth() + 1).toString().padStart(2, "0") +
    dateConf.getDate().toString().padStart(2, "0")
  );
}

const {
  error,
  getUsages,
  usageList,
  getUsageList,
  deleteUsage,
  getUsage,
  usage,
} = getUsageApi();

onMounted(async () => {
  await getUsageList();
  usageList.value.sort((a, b) => b.jobId.localeCompare(a.jobId));
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.name.endsWith(".txt")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const numbers = text.split("\n").map((line) => line.trim());
      if (numbers.length > 1000) {
        toast.error("File limit exceeded");
        return (error.value = "File limit exceeded");
      }
      toast.success("File uploaded successfully");
      return (number.value = numbers);
    };
    reader.readAsText(file);
  }
};

const handleSubmit = async () => {
  if (!number.value.length || !start_date.value || !end_date.value) {
    toast.error("Please upload a file numbers and select a date range");
    return (error.value = "Please upload a file");
  }

  try {
    await getUsages({
      start_date: parseDateString(start_date.value) + "000000",
      end_date: parseDateString(end_date.value) + "235959",
      number: number.value,
    });
    await getUsageList();
    usageList.value.sort((a, b) => b.jobId.localeCompare(a.jobId));
    toast.success("Usage submitted successfully");
  } catch (err) {
    console.error(err);
    error.value = err.message || "An error occurred";
  }
};

const handleDelete = async (id) => {
  confirm(`Are you sure you want to delete this usage(${id})?`) || null;
  try {
    await deleteUsage(id);
    await getUsageList();
    usageList.value.sort((a, b) => b.jobId.localeCompare(a.jobId));
    toast.success("Usage deleted successfully");
  } catch (err) {
    console.error(err);
    error.value = err.message || "An error occurred";
  }
};

const reload = async () => {
  location.reload();
};

const router = useRouter();
const pathToDetail = (id) => {
  router.push({ name: "Detail", params: { id } });
};

const { exportToCsv } = Export();
const handleDownload = async (id) => {
  try {
    await getUsage(id);
    exportToCsv(usage.value.data.result, "usage" + usage.value.data.name);
  } catch (err) {
    console.error(err);
    error.value = err.message || "An error occurred";
  }
};
</script>
