import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Voting from '../Voting';
import Welcome from './Welcome';
const Login = (props) => {

    //const provider = useSelector((state)=> state.providers.provider);
    const connected = useSelector((state)=> state.providers.connected);

    const dispatch = useDispatch();


    const [isConnecting,setIsConnecting]=useState(false);
    const [provider, setProvider] = useState(window.ethereum);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    

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
            props.onLogin(provider);
        }
    }
    


    return (
        <div>
            {/* <button onClick={onLoginHandler}>
                {!isConnecting && "Connect ..." }
                {isConnecting && "Loading ..." }
            </button> */}
            
        </div>
    );
};

export default Login;