// import "./App.css";
import { Fragment } from "react";
import Searchbar from "../components/searchbar";
import ListCompany from "../components/listcompany";
import company from "../api/company";

function Home() {
  return (
    <Fragment>
      {/* <Searchbar /> */}
      <div className="container mt-5">
        <ListCompany />
      </div>
    </Fragment>
  );
}

export default Home;
