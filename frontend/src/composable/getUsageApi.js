import axios from "axios";
import { ref } from "vue";

axios.defaults.baseURL = "http://localhost:3000";

export default function getUsageApi() {
  const usage = ref([]);
  const usageList = ref([]);
  const error = ref(null);

  const getUsage = async (data) => {
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
  return { usage, error, getUsage, getUsageList, usageList };
}
