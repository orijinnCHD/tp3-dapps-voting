import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const ProposalsList = () => {

    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);
    const workflowStatus = useSelector((state)=>state.workflows.workflow);


    let proposals =[];
    const [proposalsData,setProposalsData] = useState();
    const [idVoted,setIdVoted] = useState(-1);
    

    useEffect(()=>{

        (async function () {
      
            await voting.events.ProposalRegistered({fromBlock:"earliest"})
            .on('data', async(event) => {
              let lesevents = event.returnValues.proposalId;
              const proposal = await voting.methods.getOneProposal(lesevents).call({from:account});
              let proposalsObject={id:0,description:""};
              proposalsObject.id = lesevents;
              proposalsObject.description = proposal.description;
              proposals.push(proposalsObject);
              setProposalsData(proposals);

            })          
            .on('changed', changed => console.log(changed))
            .on('error', err => console.log(err))
            .on('connected', str => console.log(str))




            await voting.events.Voted({fromBlock:"earliest"})
            .on('data', (event) => {
                let lesevents = event.returnValues.proposalId;
                setIdVoted(lesevents);

            })          
            .on('changed', changed => console.log(changed))
            .on('error', err => console.log(err))
            .on('connected', str => console.log(str))



        })();
    },[voting])

    const giveYourVote = async(idProposal)=>{
        await voting.methods.setVote(idProposal).send({from:account}).then(async(receipt)=>{
              
        })
    }

    return (
        <div className="proposals-container">
            <h2>Listes des propositions</h2>
            <ul className="proposals-list">
                {proposalsData && proposalsData.map((proposal) =>
                    <li 
                        key={proposal.id}>{proposal.id+" : "+proposal.description}
                        {
                            workflowStatus === 3?
                                <button id={idVoted ===proposal.id ?"vote-actived":"vote"} onClick={()=>{giveYourVote(proposal.id)}}>
                                    {idVoted ===proposal.id?"+1":idVoted ===-1?"vote":"end"}
                                </button>
                                :
                                <></>
                        }
                        
                    </li> )
                }
            </ul>
        </div>
    );
};

export default ProposalsList;