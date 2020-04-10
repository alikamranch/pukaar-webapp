import React from "react";
import { Helmet } from "react-helmet";
import "./Home.css";

function Home() {
  return (
    <div>
      <div className="background img-fluid">
        <Helmet>
          <title>Home</title>
        </Helmet>
      </div>
    </div>
  );
}

export default Home;
