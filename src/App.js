import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Tracks from "./views/Tracks";
import Artists from "./views/Artists";
import Albums from "./views/Albums";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
