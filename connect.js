import dotenv from "dotenv";
import oracledb from "oracledb";
dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

async function connect() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    // console.log("Successfully connected to Oracle Database");
    return connection;
  } catch (err) {
    console.error("Error: ", err);
  }
}

export { connect };
