import React from 'react';
import { useSelector } from "react-redux";
import Voting from './Voting';

const Home = ({handleConnectWallet}) => {

    return (
    
        <div className="home-container">
            <div className="home-left">
                {/* <span>image</span> */}
                <h1>Voting System</h1>
            </div>  
            <div className="home-right">
                <p> Dicta optio non enim facere. Suscipit omnis explicabo iure quidem, id neque?</p>
                <button onClick={()=>(handleConnectWallet())}>Connection</button>
            </div>
        </div>
    );
};

export default Home;