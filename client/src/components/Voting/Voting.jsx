import React, { useEffect } from 'react';
import {  useSelector } from "react-redux";
import Monitoring from './Monitoring';


const Voting = ({handleDisconnect}) => {

    const account = useSelector((state)=> state.providers.account);
    const owner = useSelector((state)=>state.providers.owner);
    const connected = useSelector((state)=> state.providers.connected);

   

    return (
        <div className="voting-container">
            <nav>
                <span> address : {account}</span> 
                <button onClick={handleDisconnect}> deconnexion </button>  
            </nav>

            <section className="voting">
                <Monitoring/>
                
            </section>

        </div>
    );

};

export default Voting;