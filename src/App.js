import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Spinner from "./Components/Spinner";
import { BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

const App =()=>{
const[progress,setProgress]=useState(0);

 
 
  return (
    <div className="App">
      
      <Router>

      
        <Navbar />
        <LoadingBar 
        color="red"
        progress={progress}/>
        <Routes>
        <Route exact path="/" element={ <News setProgress={setProgress}  key="General" pageSize={6} country={"in"} category={"General"}/>}></Route>
        <Route exact path="/Business" element={ <News setProgress={setProgress}  key="Business" pageSize={6} country={"in"} category={"Business"}/>}></Route>
        <Route exact path="/Entertainment" element={ <News setProgress={setProgress}  key="Entertainment" pageSize={6} country={"in"} category={"Entertainment"}/>}></Route>
        <Route exact path="/General" element={ <News setProgress={setProgress}  key="General" pageSize={6} country={"in"} category={"General"}/>}></Route>
        <Route exact path="/Health" element={ <News setProgress={setProgress}  key="Health" pageSize={6} country={"in"} category={"Health"}/>}></Route>
        <Route exact path="/Science" element={ <News setProgress={setProgress}  key="Science" pageSize={6} country={"in"} category={"Science"}/>}></Route>
        <Route exact path="/Sports" element={ <News setProgress={setProgress}  key="Sports" pageSize={6} country={"in"} category={"Sports"}/>}></Route>
        <Route exact path="/Technology" element={ <News setProgress={setProgress}  key="Technology" pageSize={6} country={"in"} category={"Technology"}/>}></Route>
        </Routes>
        </Router>

    </div>
  
  );
  }


export default App;
