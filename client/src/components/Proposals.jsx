import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const Proposals = (props) => {

    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);
    const workflowStatus = useSelector((state)=>state.workflows.workflow);

    const [proposalsData,setProposalsData] =useState();
    const [idVoted,setIdVoted] = useState(-1);
  

    const updateProposalsData = async()=>{

        const proposals = await voting.methods.getProposals().call({from:account}).then(function(receipt){
            const newArray = [...receipt];
            setProposalsData(newArray);
        })
    }


    useEffect(()=>{


        if(!props.accountRegister)
            return;

        updateProposalsData();
        (async function () {
           
            await voting.events.ProposalRegistered({ fromBlock: 'earliest' }).on('data', async(event) => {
                let lesevents = event.returnValues.proposalId;
                const proposal = await voting.methods.getOneProposal(lesevents).call({from:account}, function(error, result){
                    if(error)
                        console.log(error);
                    else{
                        console.log(result);
                        setProposalsData(oldArray => [...oldArray, result]);
                    }

                });

            })   
            
            await voting.events.Voted({fromBlock:"earliest"})
            .on('data', (event) => {
                let lesevents = event.returnValues.proposalId;
                updateProposalsData();
                setIdVoted(lesevents);
            })          

        })();
        
    },[props.accountRegister])


    const setYourVote = async(proposalId)=>{
        await voting.methods.setVote(proposalId).send({from:account}).then(function(receipt){
            setIdVoted(proposalId);
        });
    }


    return (
        <div className="proposals-container">
            <h2>Listes des propositions</h2>
            <ul className="proposals-list">
                {   
                    
                    proposalsData && proposalsData
                    .filter(proposal => proposal.description !== "GENESIS")
                    .map((proposal, index)=>
                        <li key={index}>
                            
                            {(index+1)+ " : " + proposal.description + " : " + proposal.voteCount}
                            <button 
                                 id={idVoted ===proposal.id ?"vote-actived":"vote"} 
                                onClick={(e)=>{setYourVote(index+1)}} >
                                    { proposal.voteCount} 
                            </button>
                        
                        </li>
                    )
                    
                }
            </ul>
        </div>
    );
};

export default Proposals;