import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import CitySelector from "./components/CitySelector/CitySelector"
import Login from './components/Login/Login';
import RestaurentsList from './components/RestaurentsList/RestaurentsList';
import RestaurentDetails from './components/RestaurentDetails/RestaurentDetails';
import AddRestaurent from './components/AddRestaurent/AddRestaurent';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path = "/login" component = {Login}/>
          <Route path="/cityselector" component = {CitySelector}/>
          <Route path="/restaurentslist" component = {RestaurentsList}/>
          <Route path="/restaurentdetails" component = {RestaurentDetails}/>
          <Route path ="/addRestaurent" component = {AddRestaurent}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
