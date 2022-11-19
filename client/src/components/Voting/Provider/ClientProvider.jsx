import Web3 from "web3";
import React, { useEffect, useState } from 'react';
import myContract from '../../../contracts/Voting.json';
import { useDispatch, useSelector } from "react-redux";
import {setAccount, setContract, setOwner, setChain,setConnected } from '../../../features/providers.slice';
import Home from "../Home";
import Voting from "../Voting";


const ClientProvider = () => {
    
    const dispatch = useDispatch();
    const account = useSelector((state)=> state.providers.account);
    const connected = useSelector((state)=> state.providers.connected);
    const handleConnectWallet = async ()=>{

      const provider = window.ethereum ;
      const accounts = await provider.request({method:'eth_requestAccounts'});
      const currentAccount = accounts[0];
      dispatch(setAccount(currentAccount));
      console.log('Account: ',currentAccount.toLowerCase());
    }

    const handleDisconnect = async()=>{
        console.log('disconnecting Metamask ...');
        dispatch(setConnected(false));
        dispatch(setAccount(''));
        dispatch(setChain(''));
    }


    // personnal sign

    const handlePersonalSign = async()=>{
        console.log('Sign Authentication');

        const message =[
            "this site is requesting your signature to approve login authorization!"
        ].join("\n\n");

        const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
        const currentAccount = accounts[0];
        const sign = await window.ethereum.request({method:'personal_sign',params:[message,currentAccount]});
        dispatch(setAccount(currentAccount));
        dispatch(setConnected(true));
        //console.log('sign : ' + sign);
    }


    const handleConnectOnce =async()=>{

      const accounts = await window.ethereum.request({method:'wallet_requestPermissions',
          params:[{
              eth_accounts:{}
          }]
  
      }).then(()=> window.ethereum.request({method:'eth_requestAccounts'}));

      dispatch(setAccount(accounts[0]));

    }

    useEffect(()=>{
        if(window.ethereum != 'undefined'){
    
          window.ethereum.on('accountsChanged',(accounts)=>{
            console.log('Account changed',accounts[0]);
            connectContract();
            dispatch(setAccount(accounts[0]));
            console.log("a");
          })
    
          window.ethereum.on('chainChanged',(chainId)=>{
            console.log('chain ID changed',chainId);
            connectContract();
            dispatch(setChain(chainId));
            console.log("b");
          })
        }
        else
          alert('install Metamask extension');
    
    
    },[])


    useEffect(()=>{
      //setIsConnected(account?true:false);
      dispatch(setConnected(account?true:false));
        
    },[account])

    //////////////////////// contract ////////////////

    const connectContract = async()=>{
    
      const rpcURL = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const web3 = new Web3(rpcURL);
      
      const id = await web3.eth.net.getId();
      const deployedNetwork = myContract.networks[id];
      const contract =  new web3.eth.Contract(myContract.abi,deployedNetwork.address);
      const owner = await contract.methods.owner().call();
      dispatch(setContract(contract));
      console.log("owner" + owner.toLowerCase());
      dispatch(setOwner(owner));
      
    }

    useEffect(() => {
      const tryInit = async () => {
        try {
          connectContract();
        } catch (err) {
          console.error(err);
        }
      };
  
      tryInit();
    }, [connectContract]);
    


    return (
        <div>
            {connected ? 
                <Voting handleDisconnect={handleDisconnect}/>
                :
                <Home handleConnectWallet={handleConnectWallet}/>
            }
            
        </div>
    );
};

export default ClientProvider;