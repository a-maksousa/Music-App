import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import { MainRoute } from "./Routes";
const App = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path={MainRoute}>
            <Dashboard />
          </Route>
          <Route render={() => <NotFound />} />
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
