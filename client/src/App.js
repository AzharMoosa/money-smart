import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import SavingsScreen from "./screens/SavingsScreen";
import SavingCreateScreen from "./screens/SavingCreateScreen";
import SavingsInfoScreen from "./screens/SavingsInfoScreen";
import SavingAddAmountScreen from "./screens/SavingAddAmountScreen";
import SavingEditInfoScreen from "./screens/SavingEditInfoScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import TransactionInfoScreen from "./screens/TransactionInfoScreen";
import AddTransactionScreen from "./screens/AddTransactionScreen";
import ReceiptsScreen from "./screens/ReceiptsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UserInformationScreen from "./screens/UserInformationScreen";
import AccountSettingsScreen from "./screens/AccountSettingsScreen";
import PrivateRoute from "./components/routing/PrivateRoute";
import ReceiptInfoScreen from "./screens/ReceiptInfoScreen";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <PrivateRoute exact path="/savings" component={SavingsScreen} />
        <PrivateRoute
          exact
          path="/savings/sort/:sort"
          component={SavingsScreen}
        />
        <PrivateRoute
          exact
          path="/savings/search/:keyword"
          component={SavingsScreen}
        />
        <PrivateRoute
          path="/savings/page/:pageNumber"
          component={SavingsScreen}
        />
        <PrivateRoute
          path="/savings/search/:keyword/page/:pageNumber"
          component={SavingsScreen}
        />
        <PrivateRoute
          exact
          path="/savings/create"
          component={SavingCreateScreen}
        />
        <PrivateRoute exact path="/savings/:id" component={SavingsInfoScreen} />
        <PrivateRoute
          exact
          path="/savings/add/:id"
          component={SavingAddAmountScreen}
        />
        <PrivateRoute
          exact
          path="/savings/edit/:id"
          component={SavingEditInfoScreen}
        />
        <PrivateRoute
          exact
          path="/transactions"
          component={TransactionsScreen}
        />
        <PrivateRoute
          path="/transactions/page/:pageNumber"
          component={TransactionsScreen}
        />
        <PrivateRoute
          exact
          path="/transactions/:id"
          component={TransactionInfoScreen}
        />
        <PrivateRoute
          exact
          path="/add-transaction"
          component={AddTransactionScreen}
        />
        <PrivateRoute exact path="/receipts" component={ReceiptsScreen} />
        <PrivateRoute
          exact
          path="/receipts/:id"
          component={ReceiptInfoScreen}
        />
        <PrivateRoute
          path="/receipts/page/:pageNumber"
          component={ReceiptsScreen}
        />
        <PrivateRoute exact path="/settings" component={SettingsScreen} />
        <PrivateRoute
          exact
          path="/settings/user/:id"
          component={UserInformationScreen}
        />
        <PrivateRoute
          exact
          path="/settings/account/:id"
          component={AccountSettingsScreen}
        />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
      </Switch>
    </Router>
  );
}

export default App;
