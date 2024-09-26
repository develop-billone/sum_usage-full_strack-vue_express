import PQueue from "p-queue";
import runOracleQuery from "./models/sumActual.js";

const queue = new PQueue({ concurrency: 1 });

// const runOracle_query = runOracleQuery();

console.log("Queue initialized successfully");

// สร้างงานใหม่
const jobData = {
  start_date: "20240801000000",
  end_date: "20240824235959",
  number: ["66951623542"],
};

queue
  .add(async () => {
    try {
      console.log(`Processing job with data:`, jobData);
      const { start_date, end_date, number } = jobData;

      const result = [];

      for (let i = 0; i < number.length; i++) {
        console.log(`Running query for number: ${number[i]}`);
        const data = await runOracleQuery(start_date, end_date, number[i]);
        console.log(`Query result for number ${number[i]}:`, data);
        result.push({ number: number[i], ...data });
      }

      console.log(`Job completed with result:`, result);
      return result;
    } catch (error) {
      console.error(`Error processing job:`, error);
      throw error;
    }
  })
  .then((result) => {
    console.log("Job result:", result);
  })
  .catch((error) => {
    console.error("Job failed:", error);
  });
