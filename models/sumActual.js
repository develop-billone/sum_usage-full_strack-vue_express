// const connect = require("../connect");
import { connect } from "../connect.js";

async function runOracleQuery(start_date, end_date, number) {
  const connection = await connect();

  const query = `SELECT CDR_ID, CDR_SUB_ID, C_START_DATE, C_END_DATE, C_A_PARTY_NUMBER, C_B_PARTY_NUMBER, C_C_PARTY_NUMBER, 
    USAGE_SERVICE_TYPE, ACTUAL_USAGE, RATE_USAGE, ACTUAL_USAGE2, RATE_USAGE2, C_EVENT_TYPE, C_PAY_TYPE, APN, GGSN_ADDRESS, 
    CALLING_CELL_ID, RAT_TYPE, MAIN_OFFERING_ID, DEBIT_AMOUNT, CALLING_ROAM_COUNTRY_CODE, CALLING_ROAM_NETWORK_CODE,OBJECT_TYPE1, 
    OWNER_TYPE1, OWNER_CODE1, OBJECT_TYPE_ID1, CUR_AMOUNT1, CHG_AMOUNT1, OFFERING_CODE1,OBJECT_TYPE2, OWNER_TYPE2, OWNER_CODE2, 
    OBJECT_TYPE_ID2, CUR_AMOUNT2, CHG_AMOUNT2, OFFERING_CODE2,OBJECT_TYPE3, OWNER_TYPE3, OWNER_CODE3, OBJECT_TYPE_ID3, CUR_AMOUNT3, 
    CHG_AMOUNT3, OFFERING_CODE3,OBJECT_TYPE4, OWNER_TYPE4, OWNER_CODE4, OBJECT_TYPE_ID4, CUR_AMOUNT4, CHG_AMOUNT4, OFFERING_CODE4,CURRENT_AMOUNT,
    CASE WHEN LAST_EFFECT_OFFERING != '0' THEN LAST_EFFECT_OFFERING ELSE MAIN_OFFERING_ID END AS LAST_EFFECT_AND_MAIN_OFFER,
    CASE WHEN C_EVENT_TYPE IN (1, 2) THEN SUBSTR(CALLING_CELL_ID, 1, 5) ELSE CALLING_ROAM_INFO END AS CALLING_ROAM_INFO 
    FROM REPORTDB.CDR_EVENT 
    WHERE C_START_DATE BETWEEN ${start_date} AND ${end_date} and C_A_PARTY_NUMBER IN '${number}'`;
  const result = await connection.execute(query);

  result.rows = result.rows.map((row) => {
    return row.reduce((acc, cur, index) => {
      acc[result.metaData[index].name] = cur;
      return acc;
    }, {});
  });

  const min_start_date = result.rows.reduce(
    (acc, cur) => Math.min(acc, cur.C_START_DATE),
    Infinity
  );
  const max_end_date = result.rows.reduce(
    (acc, cur) => Math.max(acc, cur.C_END_DATE),
    -Infinity
  );
  const data_usage = result.rows
    .filter((row) => row.C_EVENT_TYPE === 4)
    .reduce((acc, cur) => acc + cur.ACTUAL_USAGE2, 0);
  const voice_usage = result.rows
    .filter((row) => row.C_EVENT_TYPE === 1)
    .reduce((acc, cur) => acc + cur.ACTUAL_USAGE, 0);
  const sms_usage = result.rows
    .filter((row) => row.C_EVENT_TYPE === 2)
    .reduce((acc, cur) => acc + cur.ACTUAL_USAGE, 0);
  const debit_amount =
    result.rows.reduce((acc, cur) => acc + cur.DEBIT_AMOUNT, 0) / 1000000;

  return {
    min_start_date,
    max_end_date,
    data_usage,
    voice_usage,
    sms_usage,
    debit_amount,
  };
}

export default runOracleQuery;
