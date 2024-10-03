import axios from "axios";
import { ref } from "vue";

axios.defaults.baseURL = "http://localhost:3000";

export default function getUsageApi() {
  const usages = ref([]);
  const usage = ref(null);
  const usageList = ref([]);
  const error = ref(null);

  const getUsages = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/oracle",
        data: {
          start_date: data.start_date,
          end_date: data.end_date,
          number: data.number,
        },
      });
      usage.value = res.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  const getUsageList = async () => {
    try {
      const res = await axios.get("/oracle/list");
      usageList.value = res.data;
    } catch (err) {
      error.value = err.message;
    }
  };

  const deleteUsage = async (id) => {
    try {
      const res = await axios.delete(`/oracle/${id}`);
      return res;
    } catch (err) {
      error.value = err.message;
    }
  };

  const getUsage = async (id) => {
    try {
      const res = await axios.get(`/oracle/status/${id}`);
      usage.value = res;
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    usages,
    error,
    getUsages,
    getUsageList,
    usageList,
    deleteUsage,
    getUsage,
    usage,
  };
}
