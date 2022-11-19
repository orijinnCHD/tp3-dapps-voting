import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


const VotersList = () => {

    const voting = useSelector((state)=> state.providers.contract);

    let voters =[];
    const [voterData, setVoterData] = useState();
    const [oldEvents,setOldEvents] = useState();

    useEffect(()=>{
        (async function () {
      
             await voting.events.VoterRegistered({fromBlock:"earliest"})
             .on('data', event => {
               let lesevents = event.returnValues.voterAddress;
               voters.push(lesevents);
               setVoterData(voters);

             })          
             .on('changed', changed => console.log(changed))
             .on('error', err => console.log(err))
             .on('connected', str => console.log(str))


            let oldEvents= await voting.getPastEvents('VoterRegistered', {
            fromBlock: 0,
            toBlock: 'latest'
            });
            let oldies=[];
            oldEvents.forEach(event => {
                oldies.push(event.returnValues.voterAddress);
            });
            setOldEvents(oldies);
            
         })();
         
    },[voting])

    return (
        <div className="voters-container">

            <h2> Liste de voters</h2>

            <ul className="voters-list">
                {voterData && voterData.map((addr,index) =><li key={index}>{(index + 1) + " : " + addr}</li> )}
                {/* {oldEvents && oldEvents.map((addr,index) =><li key={index}>{(index + 1) + " : " + addr}</li> )}  */}
            </ul>
        </div>
    );
};

export default VotersList;