import Web3 from "web3";
import React, { useEffect, useState } from 'react';
import myContract from '../../../contracts/Voting.json';
import { useDispatch, useSelector } from "react-redux";
import {setAccount, setContract, setOwner, setChain} from '../../../features/providers.slice';


const Web3Provider = (props) => {


    const account = useSelector((state)=> state.providers.account);
    const chainId = useSelector((state)=> state.providers.chain);
    const connected = useSelector((state)=> state.providers.connected);
    const AccountRegistered = useSelector((state)=> state.voters.voter);
    const web3 = useSelector((state)=> state.providers.web3);
    //const provider = useSelector((state)=> state.providers.provider);

    const [provider,setProvider] = useState(window.ethereum);
    
    const dispatch = useDispatch();


    useEffect(()=>{

        const handleAccountsChanged = async(accounts)=>{
            createContract();
            const web3Accounts = await web3.eth.getAccounts();
            if(accounts.length === 0){
                props.onLogout();
            }else if(accounts[0] !== account){
                dispatch(setAccount(accounts[0]));
                console.log("owner : " + accounts[0] + " account : " + account);
            }
        }
        const handleChainChanged = async(chainId)=>{
            console.log(chainId);
            createContract();
            const web3ChainId = await web3.eth.getChainId();
            dispatch(setChain(web3ChainId));
        }

        if(connected){
            provider.on("accountsChanged",handleAccountsChanged);
            provider.on("chainChanged",handleChainChanged);
        }

        return()=>{
            if(connected){
                provider.removeListener("accountsChanged",handleAccountsChanged);
                provider.removeListener("chainChanged",handleChainChanged);
            }
        }
            
    },[connected]);


    //-----------------------contract----------------------------///

    const createContract = async() =>{
        const rpcURL = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const web3 = new Web3(rpcURL);
        const id = await web3.eth.net.getId();
        const deployedNetwork = myContract.networks[id];
        const contract =  new web3.eth.Contract(myContract.abi,deployedNetwork.address);
        const owner = await contract.methods.owner().call();
        dispatch(setOwner(owner));
        dispatch(setContract(contract));

    }


    useEffect(() => {
        const tryInit = async () => {
          try {
            createContract();
            //console.log("connect contract");
          } catch (err) {
            console.error(err);
          }
        };
    
        tryInit();
      }, []);


      

    return (
        <div>
           
        </div>
    );
};

export default Web3Provider;