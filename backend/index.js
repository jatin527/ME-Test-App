const express = require("express");
// const { getCompany, createCompany } = require("./company_model");
const pool = require("./database/db");
const app = express();
const cors = require("cors");
const port = 3001;
const fetch = require("node-fetch");

const request = require("postman-request");
var FormData = require("form-data");

app.use(cors());
// app.use(express.json());

app.get("/company", async (req, res) => {
  try {
    const companyList = await pool.query("SELECT * FROM company");
    res.json(companyList.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/companies/:cname", async (req, res) => {
  try {
    var form = new FormData();
    form.append("search", req.params.cname);
    form.append("filter", "company");
    const requestOptions = {
      method: "POST",
      body: form,
    };
    const response = await fetch(
      "https://www.zaubacorp.com/custom-search",
      requestOptions
    ).then((resp) => {
      return resp.text();
    });

    res.set("Content-Type", "text/html");
    res.send(response);
  } catch (error) {
    console.log(error.message);
  }
});

// app.post("/", async (req, res) => {
//   const re = request(
//     {
//       url: "https://www.zaubacorp.com/custom-search?search=a&filter=company",
//       json: false,
//     },
//     (error, res1) => {console.log(res1);}
//   );
// });

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
