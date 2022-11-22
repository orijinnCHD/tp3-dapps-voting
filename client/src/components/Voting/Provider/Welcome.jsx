import React from 'react';
import Login from './Login';
import { useEffect, useState } from 'react';
import Web3 from "web3";
import Web3Provider from './Web3Provider';
import { useDispatch, useSelector } from "react-redux";
import {setAccount, setChain,setConnected,setWeb3 } from '../../../features/providers.slice';
import Voting from '../Voting';


const Welcome = () => {

    const account = useSelector((state)=> state.providers.account);
    const chainId = useSelector((state)=> state.providers.chain);
    const connected = useSelector((state)=> state.providers.connected);
    const dispatch = useDispatch();
    const [isConnecting,setIsConnecting]=useState(false);
    const [provider,setProvider] = useState(window.ethereum);
    


    //-----------------------LOGIN ---------------------------------//
    const onLogin = async(provider)=>{
        const web3 = new Web3(provider);
        
        const accounts =await web3.eth.getAccounts();
        const chId =await web3.eth.getChainId();
        if(accounts.length === 0){
            console.log("Please connect to metamask");
        }else if(accounts[0] !== account){
           
            setProvider(provider);
            dispatch(setWeb3(web3));
            dispatch(setChain(chId));
            dispatch(setAccount(accounts[0]));
            dispatch(setConnected(true));
            console.log("connected");
        }
    }

    const onLoginHandler =async()=>{
        const provider = detectProvider();
        if(provider){
            if(provider !== window.ethereum){
                console.error("Not Window ethereum provider : do you have multiple wallet");
            }
            setIsConnecting(true);
            await provider.request({
                method:"eth_requestAccounts",
            });
            setIsConnecting(false);
            onLogin(provider);
        }
    }
    
    //-------------------------logout-----------------------------

    const onLogout = ()=>{

        dispatch(setConnected(false));
        dispatch(setAccount(null));
        dispatch(setChain(null));
    }


    //----------------------------detect Provider----------------------

    useEffect(()=>{
        setProvider(detectProvider());
    },[])


    
    const detectProvider = ()=>{
        let provider;
        if(window.ethereum){
            provider = window.ethereum;
        }else if(window.web3){
            provider = window.web3.currentProvider;
        }else{
            window.alert("no ethereum browser detecteed, install metamask");
        }
        return provider;
    }
    

    const Welcome =
    <div className="home-container">
        <div className="home-left">
            <h1>Voting System</h1>
            </div>  
        <div className="home-right">
            <p> Bienvenue dans l'application "voted", systéme de vote décentralisé basé sur la blockchain</p>
            <button onClick={onLoginHandler}>

                {!isConnecting && "Connect ..." }
                {isConnecting && "Loading ..." }

            </button>
            {/* <p>{"chainid  : " + chainId }</p>
            <p>{"currentAccount  : " + account}</p>
            <p>{"connected  : " + connected}</p> */}
        </div>
    </div>


    return (
        <div className="apps-container">
            <Web3Provider onLogout={onLogout}/>
            {
                connected?
                <Voting onLogout={onLogout}/>
                :
                Welcome
            }


                
        </div>
    );
};

export default Welcome;