import { useSelector } from "react-redux";
import Welcome from "./components/Voting/Provider/Welcome";
import React from 'react';
import ClientProvider from "./components/Voting/Provider/ClientProvider";
import Voting from './components/Voting/Voting';

function App() {

  return(
    <div>
      <Welcome/>
    </div>

  );
  
}

export default App;
