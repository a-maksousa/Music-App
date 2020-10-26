import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Tracks from "./views/Tracks";
import Artists from "./views/Artists";
import Albums from "./views/Albums";
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
