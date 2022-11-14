import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Spinner from "./Components/Spinner";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Router>

      
        <Navbar />
        <Routes>
        <Route exact path="/" element={ <News key="General" pageSize={6} country={"in"} category={"General"}/>}></Route>
        <Route exact path="/Business" element={ <News key="Business" pageSize={6} country={"in"} category={"Business"}/>}></Route>
        <Route exact path="/Entertainment" element={ <News key="Entertainment" pageSize={6} country={"in"} category={"Entertainment"}/>}></Route>
        <Route exact path="/General" element={ <News key="General" pageSize={6} country={"in"} category={"General"}/>}></Route>
        <Route exact path="/Health" element={ <News key="Health" pageSize={6} country={"in"} category={"Health"}/>}></Route>
        <Route exact path="/Science" element={ <News key="Science" pageSize={6} country={"in"} category={"Science"}/>}></Route>
        <Route exact path="/Sports" element={ <News key="Sports" pageSize={6} country={"in"} category={"Sports"}/>}></Route>
        <Route exact path="/Technology" element={ <News key="Technology" pageSize={6} country={"in"} category={"Technology"}/>}></Route>
        </Routes>
        </Router>

    </div>
  );
}

export default App;
