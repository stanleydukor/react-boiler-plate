import React from "react";
import { Helmet } from "react-helmet";
import TestPageStyle from "./style";
import UserService from "../../../../services/user.service";

export function TestPage({}) {
  const [test, setTest] = React.useState(0);
  const getTest = () => {
    UserService.getTest()
      .then(res => {
        setTest(1);
      })
      .catch(error => {
        setTest(0);
      });
  };
  return (
    <TestPageStyle>
      <Helmet>
        <title>RPL - Onboarding</title>
      </Helmet>
      <section>
        <h1>
          Welcome to <code>Main</code>.
        </h1>
        <h3 className="App-link">Test API Connection</h3>
        <button onClick={getTest}>TEST</button>
        <p>{test === 1 ? "WORKED!" : test === -1 ? "FAILED" : ""}</p>
      </section>
    </TestPageStyle>
  );
}

export default TestPage;
