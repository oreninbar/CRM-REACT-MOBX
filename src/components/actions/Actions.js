import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import './Actions.css'
import { Customer } from '../../stores/customer.js'



const Actions = inject("generalStore")(observer((props) => {

    const [inputs, setInputs] = useState({ firstName: "", lastName: "", email: "", owner: "", firstContact: "", country: "", sold: 0 })
    const [updateInput, setUpdateInput] = useState({ name: "", updateOwner: "", emailType: "", updateSold: 0 })
    const [messageState, setMessageState] = useState(null)
    const [message, setMessage] = useState(null)

    const handleInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleInputUpdate = (e) => {
        if (e.target.name !== "updateSold")
            setUpdateInput({ ...updateInput, [e.target.name]: e.target.value })
        else {
            updateInput.updateSold? setUpdateInput({ ...updateInput, updateSold : 0 }):  setUpdateInput({ ...updateInput, updateSold :1 })
        }
    }

    const createClient = () => {
        if ((!inputs.firstName || !inputs.lastName || !inputs.country || !inputs.email || !inputs.firstContact, !inputs.owner)) {
            setMessage('You must fill all the fields!')
        }
        else if (props.generalStore.addCustomer(new Customer(null, inputs.firstName, inputs.lastName, inputs.firstContact, inputs.email, inputs.country, inputs.sold, inputs.owner))) {
            setMessageState(true)
            setMessage('Customer successfully added!')
        }
        else {
            setMessageState(false)
            setMessage('Failed adding the customer!')
        }
        setTimeout(function () { setMessage(null) }, 2000);
    }

    const updateClient = () => {
        try {
            props.generalStore.updateClient(updateInput)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-actions'>
            <div className='update-container'>
                <h1>UPDATE CLIENT</h1>
                <div id="client-name" className="row">
                    <h3 className="title">Name:</h3>
                    <input id="input-first-name" className="input entername" name="name" value={updateInput.name} placeholder="Enter name" onChange={handleInputUpdate} />
                </div>
                <div className="row">
                    <h3 className="title title-update">Transfer ownership to:</h3>
                    <select id="select-owner" className="input-update" name="updateOwner" value={updateInput.updateOwner} onChange={handleInputUpdate}>
                        <option >Select Owner</option>
                        {props.generalStore.ownersList.map((o, index) => <option key={index} value={`${o.firstName} ${o.lastName}`} >{o.firstName} {o.lastName}</option>)}
                    </select>
                </div>
                <div className="row">
                    <h3 className="title title-update">Email:</h3>
                    <select id="select-emailtype" className="input-update" name="emailType" value={updateInput.emailType} onChange={handleInputUpdate} >
                        <option >Select Email</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
                <div className="row">
                    <h3 className="title title-update" >Had sale?</h3>
                    <input type="checkbox" className="input-checkbox input-update" name="updateSold" value={updateInput.updateSold}  onChange={handleInputUpdate}/>
                </div>
                <button id="btn-edit-client" className="btn" onClick={updateClient}>Edit Client</button>
            </div>

            <div className='add-container'>
                <h1>Add Client</h1>
                <div className="row">
                    <h3 className="title">First Name:</h3>
                    <input className="input" placeholder="EnterName" name="firstName" value={inputs.firstName} onChange={handleInput} />
                </div>
                <div className="row">
                    <h3 className="title">Surname:</h3>
                    <input className="input" placeholder="Surname" name="lastName" value={inputs.lastName} onChange={handleInput} />
                </div>
                <div className="row">
                    <h3 className="title">country:</h3>
                    <input className="input" placeholder="country" name="country" value={inputs.country} onChange={handleInput} />
                </div>
                <div className="row">
                    <h3 className="title">owner:</h3>
                    <input className="input" placeholder="owner" name="owner" value={inputs.owner} onChange={handleInput} />
                </div>
                <div className="row">
                    <h3 className="title">email:</h3>
                    <input className="input" placeholder="email" name="email" value={inputs.email} onChange={handleInput} />
                </div>

                <div>
                    <div className="row">
                        <h3 className="title">Had sale?</h3>
                        <input type="checkbox" className="input-checkbox" name="sold" value={inputs.sold} onChange={handleInput} />
                    </div>
                    <button id="btn-add-new-client" className="btn" onClick={createClient} >Add New Client</button>
                    <p id={"message-add-new-client"} className={messageState ? "added" : "no-added"}>{message}</p>
                </div>
            </div>
        </div>
    )
}))

export default Actions