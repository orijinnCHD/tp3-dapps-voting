import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
const AddVoter = () => {
    
    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);
    
    const [inputValue, setinputValue] = useState("INPUT");

    const add = async()=>{
        await voting.methods.addVoter(inputValue).send({from:account})
    }

    return (

        <div className="addVoter-container">
            <h2>Ajouter un voter</h2>
            <p>Enregistrer les adresses qui souhaitent participer à la session de vote</p>
            <form>
                <input
                    type="text"
                    placeholder="Entrez votre adresse publique metamask"
                    id="adress-input"
                    onChange = {(e)=>{setinputValue(e.target.value)}}
                />
                <input type="submit" value="Valider" 
                    onClick={(e)=>{e.preventDefault();add();}} 
                />
            </form>

        </div>

    );
};

export default AddVoter;