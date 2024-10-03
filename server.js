import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import PQueue from "p-queue";
import runOracleQuery from "./controllers/sumActual.js";
import { fileURLToPath } from 'url';

const JOB_EXPIRATION_TIME = 7200000; // 3 hour

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 5000;
const queue = new PQueue({ concurrency: 3 });
const jobs = new Map(); // Store job states and results

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/dist")));

app.post("/oracle", async (req, res) => {
  const { start_date, end_date, number } = req.body;
  const name = `Usage_${start_date}-${end_date}`;

  try {
    if (!Array.isArray(number)) {
      throw new Error("The 'number' parameter must be an array");
    }

    const jobId = Date.now().toString(); // Use timestamp as jobId or any other method
    jobs.set(jobId, { status: "queued", name, result: null });

    // Remove job after 1 hour
    setTimeout(() => {
      jobs.delete(jobId);
    }, JOB_EXPIRATION_TIME);

    queue.add(async () => {
      jobs.set(jobId, { status: "processing", name, result: null });

      try {
        const result = [];
        for (let i = 0; i < number.length; i++) {
          const data = await runOracleQuery(start_date, end_date, number[i]);
          result.push({ number: number[i], ...data });
        }
        jobs.set(jobId, { status: "completed", name, result });
      } catch (error) {
        jobs.set(jobId, { status: "failed", name, result: error.message });
      }
    });

    console.log("Job added to queue:", jobId);
    res.json({ status: "queued", jobId, name });
  } catch (error) {
    console.error("Error adding job to queue:", error);
    res.status(400).json({ error: error.message });
  }
});

app.get("/oracle/status/:jobId", (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (job) {
    res.json({ status: job.status, name: job.name, result: job.result });
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

app.get("/oracle/list", (req, res) => {
  const jobList = Array.from(jobs).map(([jobId, job]) => ({
    jobId,
    status: job.status,
    name: job.name,
  }));
  res.json(jobList);
});

app.delete("/oracle/:jobId", (req, res) => {
  const job = jobs.get(req.params.jobId);
  if (job) {
    if (job.status === "processing") {
      res.json({
        status: "failed",
        message: "Cannot delete a job that is currently processing",
      });
    } else {
      jobs.delete(req.params.jobId);
      res.json({ status: "success", message: "Job deleted successfully" });
    }
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

app.get("/oracle/:id"),
  (req, res) => {
    const job = jobs.get(req.params.jobId);
    console.log("Job added to queue:", job);
    if (job) {
      res.json({ status: "successfully" });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  };

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});
