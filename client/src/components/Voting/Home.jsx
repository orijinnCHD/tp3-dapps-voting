import React from 'react';
import { useSelector } from "react-redux";
import Voting from './Voting';

const Home = (props) => {

    return (
    
        <div className="home-container">
            <div className="home-left">
                {/* <span>image</span> */}
                <h1>Voting System</h1>
            </div>  
            <div className="home-right">
                <p> Dicta optio non enim facere. Suscipit omnis explicabo iure quidem, id neque?</p>
                <button onClick={()=>(props.handleConnectWallet())}>Connection</button>
                {/* <button onClick={()=>(props.handleDisconnect())}>Deconnection</button> */}
            </div>
        </div>
    );
};

export default Home;