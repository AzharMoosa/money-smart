import React from "react";
import Layout from "../components/layout/Layout";

const SavingsInfoScreen = ({ match }) => {
  return (
    <Layout>
      <h1>{match.params.id}</h1>
    </Layout>
  );
};

export default SavingsInfoScreen;
