import React, { useEffect, useState } from 'react';
import {  useSelector } from "react-redux";
import AddProposal from './AddProposal';
import AddVoter from './AddVoter';
import EndSession from './Waiting';
import Monitoring from './Monitoring';
import SetVote from './SetVote';
import VotersList from './VotersList';
import Waiting from './Waiting';
import ResultVoting from './ResultVoting';
import { useDispatch } from "react-redux";
import {setAccount, setChain,setConnected } from '../../features/providers.slice';
import Proposals from '../Proposals';



const Voting = () => {

    //const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);
    //const owner = useSelector((state)=>state.providers.owner);
    const workflowStatus = useSelector((state)=>state.workflows.workflow);
    
    const dispatch = useDispatch();

    const [accountRegister,setAccountRegister] = useState(false);
    const [isOneProposal,setIsOneProposal] = useState(false);


    const onLogout = ()=>{

        dispatch(setConnected(false));
        dispatch(setAccount(null));
        dispatch(setChain(null));
    }


    
        const formatETHAddress = function(s, size = 4) {
            var first = s.slice(0, size + 1);
            var last = s.slice(-size);
            return first + "..." + last;
        }
    
   

    return (
        <div className="voting-container">
            <nav>
                <span> address : {formatETHAddress(account)}</span> 
                <button onClick={onLogout}> deconnexion </button>  
            </nav>


            <section className="interface-container">
                <Monitoring/>

                <div className="interface">

                    <VotersList setAccountRegister={setAccountRegister} accountRegister={accountRegister}/>

                    <div className="invite-container">
                    {
                        workflowStatus === 0?
                        <AddVoter/>
                        :
                        workflowStatus === 1?
                        <AddProposal/>
                        :
                        workflowStatus === 2?
                        <Waiting/>
                        :
                        workflowStatus === 3?
                        <SetVote/>
                        :
                        workflowStatus === 4?
                        <Waiting/>
                        :
                        workflowStatus === 5?
                        <ResultVoting/>
                        :
                        <></>

                    }
                    </div>

                    <Proposals setAccountRegister={setAccountRegister} accountRegister={accountRegister}/>
                </div>
            </section>

        </div>
    );

};

export default Voting;