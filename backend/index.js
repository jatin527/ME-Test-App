const express = require("express");
// const { getCompany, createCompany } = require("./company_model");
const pool = require("./database/db");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/company", async (req, res) => {
  try {
    const companyList = await pool.query("SELECT * FROM company");
    res.json(companyList.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/company", async (req, res) => {
  try {
    const { name, cid } = req.body;
    const newCompany = await pool.query(
      "INSERT INTO company (name, cid) VALUES ($1,$2) RETURNING *;",
      [name, cid]
    );
    res.json(newCompany.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
