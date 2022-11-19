import React from 'react';
import {  useSelector } from "react-redux";

const Admin = ({updateWorkflowStatus}) => {


    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);

    // WorkflowStatus --------------------------------------

    const startProposalsRegistering = async()=>{
        await voting.methods.startProposalsRegistering().send({from:account}).then(function(receipt){
            updateWorkflowStatus();// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }

    const endProposalsRegistering = async()=>{
        await voting.methods.endProposalsRegistering().send({from:account}).then(function(receipt){
            updateWorkflowStatus();// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }

    const startVotingSession = async()=>{
        await voting.methods.startVotingSession().send({from:account}).then(function(receipt){
            updateWorkflowStatus();// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }

    const endVotingSession = async()=>{
        await voting.methods.endVotingSession().send({from:account}).then(function(receipt){
            updateWorkflowStatus();// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }

    const tallyVotes = async()=>{
        await voting.methods.tallyVotes().send({from:account}).then(function(receipt){
            updateWorkflowStatus();// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }

    const reset = async()=>{
        await voting.methods.reset().send({from:account}).then(function(receipt){
            updateWorkflowStatus();// receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        });
    }


    return (
        <div>
            <h3>Changer le workflow</h3>
            <ul id="workflow-list">
                <li ><button id="workflow-btn" onClick={startProposalsRegistering}>start Proposals Registering</button></li>
                <li ><button id="workflow-btn" onClick={endProposalsRegistering}>end Proposals Registering</button></li>
                <li ><button id="workflow-btn" onClick={startVotingSession}>start Voting Session</button></li>
                <li ><button id="workflow-btn" onClick={endVotingSession}>end Voting Session</button></li>
                <li ><button id="workflow-btn" onClick={tallyVotes}>tally Votes</button></li>
            </ul>
            <h3>Reset le vote </h3>
            <button onClick={reset}>Reset </button>
        </div>
    );
};

export default Admin;