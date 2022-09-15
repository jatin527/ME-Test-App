import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
var parse = require("html-react-parser");

// import ReactHtmlParser from "react-html-parser";

function Searchbar() {
  const [cname, setName] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();

  const navigateTohome = () => {
    navigate("/");
  };

  const getCompanies = async (e) => {
    var form = new FormData();
    form.append("search", e.target.value);
    form.append("filter", "company");
    setName(e.target.value);
    const url = "http://127.0.0.1:3001/companies/" + e.target.value;
    const response = await fetch(url)
      .then((resp) => {
        return resp.text();
      })
      .then((text) => {
        const result = text.split('id="company/');
        const result1 = [];
        for (let i = 1; i < 6; i++) {
          const newData = result[i].split('">')[0];
          result1[i - 1] = newData.split("/");
        }
        setCompany(result1);
      });
    // const data = await response.json();
    // setCompany(data);
    // .then((text) => {
    //   console.log(text);
    // });
    // console.log(response);
    // document.getElementsByClassName("dataresult").innerHTML = response;
  };
  useEffect(() => {
    getCompanies();
  }, []);

  console.log(company);
  console.log(cname);
  return (
    <Fragment>
      <form>
        <div className="container mt-5">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Company Name"
              value={cname}
              onChange={getCompanies}
            ></input>
          </div>
          <div>
          {company.map(company=> (
                <tr>
                    <td>{company.cid}</td>
                    <td>{company.name}</td>
                </tr>
            ))}
          </div>
          <button className="btn btn-primary" onClick={navigateTohome}>
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default Searchbar;
