import React, { useEffect, useState } from 'react';
import {  useSelector } from "react-redux";
import AddProposal from './AddProposal';
import AddVoter from './AddVoter';
import EndSession from './Waiting';
import Monitoring from './Monitoring';
import ProposalsList from './ProposalsList';
import SetVote from './SetVote';
import VotersList from './VotersList';
import Waiting from './Waiting';
import ResultVoting from './ResultVoting';


const Voting = ({handleDisconnect}) => {

    const voting = useSelector((state)=> state.providers.contract);

    const account = useSelector((state)=> state.providers.account);
    const owner = useSelector((state)=>state.providers.owner);
    const workflowStatus = useSelector((state)=>state.workflows.workflow);

    const [isVisitor,setIsVisitor] = useState(false);

    const checkVoter = async()=>{
        const voter = await voting.methods.getVoter(account).call({from:account});
        console.log("voter : " + voter);
    }


    /// verifier  le visiteur
//    useEffect(()=>{
//         try{
//             checkVoter();
//         }
//         catch(err){
//             console.log(err);
//         }
        
//    },[workflowStatus,account])

    return (
        <div className="voting-container">
            <nav>
                <span> address : {account}</span> 
                <button onClick={handleDisconnect}> deconnexion </button>  
            </nav>

            <section className="interface-container">
                <Monitoring/>
                <div className="interface">
                    <VotersList/>

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
                        <ResultVoting/>
                        :
                        <></>

                    }
                    </div>
                        <ProposalsList/>
                </div>
            </section>

        </div>
    );

};

export default Voting;