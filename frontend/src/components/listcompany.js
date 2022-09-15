import React, { Fragment, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

const ListCompany = () => {

  const navigate = useNavigate();

  const navigateToadd = () => {
    navigate('/add');
  };



  const [companies, setcompany] = useState([]);
  const getCompanies = async () => {
    try {
      const res = await fetch("http://localhost:3001/company");
      const jsondata = await res.json();
      setcompany(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);
  console.log(companies);
  return (
    <Fragment>
      <div>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>CIN</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(company=> (
                <tr>
                    <td>{company.cid}</td>
                    <td>{company.name}</td>
                </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={navigateToadd}>Add Company</button>
      </div>
    </Fragment>
  );
};

export default ListCompany;
