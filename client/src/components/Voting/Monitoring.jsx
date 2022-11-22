import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setWorkflow} from '../../features/workflows.slice';



const Monitoring = () => {

    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);
    const owner = useSelector((state)=> state.providers.owner);
    const workflowStatus = useSelector((state)=>state.workflows.workflow);

    const dispatch = useDispatch();

    //update workflow data --------------------
    
    const updateWorkflowStatus = async()=>{
        const workflow = await voting.methods.workflowStatus().call({from:account});
        dispatch(setWorkflow(workflow));
    }

    useEffect(()=>{
        updateWorkflowStatus();

        
    },[workflowStatus])


    const setNameWorkflow=(workflow)=>{
        
        let name="";

        switch (workflow) {
            case 0:
                name = "Registering Voters";
                break;
        
            case 1:
                name = "Proposals Registration Started";
                break;

            case 2:
                name = "Proposals Registration Ended";
             break;

            case 3:
                name = "Voting Session Started";
                break;

            case 4:
                name = "Voting Session Ended";
                break;

            case 5:
                name = "Votes Tallied";
                break;
        
            default:
                break;
        }

        return name;
    }

    // Admin
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

    const talliedVote = async()=>{
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
        <div className="monitoring-container">
            <div className="monitoring-content">
                <h4>Bonjour {account.toLowerCase() === owner.toLowerCase() ? "Admin" : "" }</h4>
                <h3>status : <span>{setNameWorkflow(workflowStatus)}</span></h3>
            </div>
            <div className={account.toLowerCase() === owner.toLowerCase() ? "admin-active":"admin-hide"}>
                
                <h3>Changer le workflow</h3>
                <ul id="workflow-list">
                    <li ><button id="workflow-btn" onClick={startProposalsRegistering}>start Proposals </button></li>
                    <li ><button id="workflow-btn" onClick={endProposalsRegistering}>end Proposals </button></li>
                    <li ><button id="workflow-btn" onClick={startVotingSession}>start Voting </button></li>
                    <li ><button id="workflow-btn" onClick={endVotingSession}>end Voting </button></li>
                    <li ><button id="workflow-btn" onClick={talliedVote}>tally Votes</button></li>
                </ul>
                {/* <h3>Reset le vote </h3> */}
                {/* <button onClick={reset}>Reset </button> */}

            </div>            
            
        </div>
    );
};

export default Monitoring;