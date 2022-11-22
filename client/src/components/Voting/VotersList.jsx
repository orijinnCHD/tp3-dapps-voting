import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


const VotersList = (props) => {

    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);

    const [oldEvents,setOldEvents] = useState();
    

    useEffect(()=>{

        (async function () {
            console.log('voter register past : ');
            const previousEvents = await voting.getPastEvents('VoterRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            })
            let oldies = [];
            setOldEvents(oldies);
            previousEvents.forEach(async(event) => {
                let lesevents = event.returnValues.voterAddress;
                if(account === lesevents ){
                    props.setAccountRegister(true);
                }
                
                oldies.push(lesevents);
            });
            setOldEvents(oldies);
            await voting.events.VoterRegistered({ fromBlock: 'earliest' }).on('data', async(event) => {
                let lesevents = event.returnValues.voterAddress;
                
                if(account === lesevents ){
                    props.setAccountRegister(true);
                }
                     
                setOldEvents(oldArray => [...oldArray, lesevents]);
            })          

        })();

        console.log(oldEvents);
    },[account])

    return (
        <div className="voters-container">

            <h2> Liste de voters</h2>
            <ul className="voters-list">

                {
                    
                    oldEvents && oldEvents.map((addr,index) =><li key={index}>{(index + 1) + " : " + addr}</li> )
                   
                } 
            </ul>
        </div>
    );
};

export default VotersList;