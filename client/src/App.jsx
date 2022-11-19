
import Home from "./components/Voting/Home";
import ClientProvider from "./components/Voting/Provider/ClientProvider";
import { useSelector } from "react-redux";
import Voting from "./components/Voting/Voting";

function App() {

  const connected = useSelector((state)=> state.providers.connected);


  return (
    <div>
        <ClientProvider/>
    </div>
    

    
  );
}

export default App;
