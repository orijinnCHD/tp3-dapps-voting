import Web3 from "web3";
import React, { useEffect } from 'react';
import myContract from '../../../contracts/Voting.json';
import { useDispatch, useSelector } from "react-redux";
import {setAccount, setContract, setOwner, setChain,setConnected } from '../../../features/providers.slice';
import {isAccountRegistered } from '../../../features/voters.slice';
import Home from "../Home";
import Voting from "../Voting";



const ClientProvider = () => {
    
    const dispatch = useDispatch();
    const account = useSelector((state)=> state.providers.account);
    const chainId = useSelector((state)=> state.providers.chain);
    const connected = useSelector((state)=> state.providers.connected);
    const provider = useSelector((state)=> state.providers.provider);


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


    const handleConnectWallet = async ()=>{

      const provider = detectProvider() ;
      
      const accounts = await provider.request({method:'eth_requestAccounts'});
      const currentAccount = accounts[0];
      //const chId =await web3.eth.getChainId();
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
            dispatch(isAccountRegistered(0));
            console.log("a");
          })
    
          window.ethereum.on('chainChanged',(chainId)=>{
            console.log('chain ID changed',chainId);
            connectContract();
            dispatch(setChain(chainId));
            dispatch(isAccountRegistered(0));
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
      console.log(rpcURL);
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

      console.log("aaaaaaaaaaaaaa");

      const tryInit = async () => {
        try {
          connectContract();
          console.log("connect contract");
        } catch (err) {
          console.error(err);
        }
      };
  
      tryInit();
    }, []);
    


    return (
        <div>
            {connected ? 
                <Voting handleDisconnect={handleDisconnect}/>
                :
                <Home handleConnectWallet={handleConnectWallet}/>
            }
            {/* <p>{'account : ' + account}</p>
            <p>{"chain : " + chainId}</p> */}
            {/* <Home handleConnectWallet={handleConnectWallet} handleDisconnect ={handleDisconnect}/> */}
        </div>
    );
};

export default ClientProvider;