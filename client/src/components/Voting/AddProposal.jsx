import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
const AddProposal = () => {
    
    const voting = useSelector((state)=> state.providers.contract);
    const account = useSelector((state)=> state.providers.account);
    const [inputValue, setinputValue] = useState("INPUT");

    const add = async()=>{
        await voting.methods.addProposal(inputValue).send({from:account});
    }

    return (

        <div className="addProposal-container">
            <h2>Ajouter une proposition</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, architecto.</p>
            <form>
                <textarea
                    type="text"
                    cols="30"
                    rows="5"
                    placeholder="ecrivez votre proposition ici"
                    id="adress-input"
                    onChange = {(e)=>{setinputValue(e.target.value)}}
                >

                </textarea>
                <input type="submit" value="Valider" 
                    onClick={(e)=>{e.preventDefault();add();}} 
                />
            </form>
        </div>

    );
};

export default AddProposal;