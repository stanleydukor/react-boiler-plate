import React, { Component, Suspense } from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "theme";
import history from "routes/history";
import { authRoutes, defaultRoute } from "routes/routes-list";
import PublicRoute from "routes/publicroute";
import PrivateRoute from "routes/privateroute";
import Error from "components/Error";
import Loading from "components/Loading";
import Authorization from "modules/Auth";
import Main from "modules/Main";
import GlobalStyles from "./Global";

class App extends Component {
  state = {
    noInternetConnection: false,
    darkMode: false
  };
  componentDidMount() {
    this.handleInternetConnectionChange();
    window.addEventListener("online", this.handleInternetConnectionChange);
    window.addEventListener("offline", this.handleInternetConnectionChange);
  }
  handleInternetConnectionChange = () => {
    navigator.onLine ? this.setState({ noInternetConnection: false }) : this.setState({ noInternetConnection: true });
  };
  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };
  render() {
    const { noInternetConnection, darkMode } = this.state;
    const { toggleDarkMode } = this;
    if (noInternetConnection) {
      return <Error text="No Internet Connnection" />;
    }
    return (
      <ThemeProvider theme={darkMode === false ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Suspense fallback={<Loading />}>
          <Router history={history}>
            <header>
              <button onClick={toggleDarkMode}>Toggle Mode</button>
            </header>
            <Switch>
              <PublicRoute restricted path={[authRoutes.signIn]} exact component={Authorization} />
              <PrivateRoute path={defaultRoute} component={Main} />
              <Redirect to={authRoutes.signIn} />
            </Switch>
          </Router>
        </Suspense>
      </ThemeProvider>
    );
  }
}

export default App;
