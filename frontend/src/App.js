import './App.css';
import Login from "./Login";
import {Switch,Route} from "react-router-dom";
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import ChangePassWord from './ChangePassWord';

function App() {
  return (
    <div className="App">
     <Switch>
       <Route path="/signUp">
       <SignUp></SignUp>
       </Route>
       <Route path="/forgotpass">
       <ForgotPass></ForgotPass>
       </Route>
       <Route path="/changepassword">
       <ChangePassWord></ChangePassWord>
       </Route>
       <Route path="/">
         <Login></Login>
       </Route>
     </Switch>
    </div>
  );
}

export default App;
