import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import SavingsScreen from "./screens/SavingsScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import ReceiptsScreen from "./screens/ReceiptsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <PrivateRoute exact path="/savings" component={SavingsScreen} />
        <PrivateRoute
          exact
          path="/transactions"
          component={TransactionsScreen}
        />
        <PrivateRoute exact path="/receipts" component={ReceiptsScreen} />
        <PrivateRoute exact path="/settings" component={SettingsScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
      </Switch>
    </Router>
  );
}

export default App;
