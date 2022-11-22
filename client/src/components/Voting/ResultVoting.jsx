import React, { useEffect, useState } from 'react';
import {  useSelector } from "react-redux";

const ResultVoting = () => {

    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);
    const workflowStatus = useSelector((state)=>state.workflows.workflow);

    const [idWinner, setIdWinner] = useState(0);
    const [DescWinner, setDescWinner] = useState("");
    let winnerObject ={id:0,description:"nothing"};
    const getWinner =async()=>{
        
        const getId =  await voting.methods.winningProposalID().call({from:account}).then(async(id)=>{
            setIdWinner(id);
            winnerObject.id = id;

            const getDescription = await voting.methods.getOneProposal(id).call({from:account}).then(async(proposal)=>{
                winnerObject.description = proposal.description;
                setDescWinner(proposal.description);
            })
        });
    }



    useEffect(()=>{
        getWinner();
    },[workflowStatus])

    return (
        <div className="result-container">
            <h2>Resultat</h2>
            <div className="winner">
                <p>la proposition {idWinner}</p>
                <p>{DescWinner}</p>
            </div>
        </div>
        
    );
};

export default ResultVoting