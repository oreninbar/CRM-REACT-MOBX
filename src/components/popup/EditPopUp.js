import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import './EditPopUp.css'
const axios = require('axios')


const EditPopUp = inject("generalStore")(observer((props) => {

    const [inputs, setInputs] = useState({ name: '', surname: '', country: '' })

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const updateCustomer = () => {
        let id = props.item.customer_id
        console.log(id)
        try {
            // props.qeneralStore.updateClientByID(id, inputs)
            updateClientByID(id)
        } catch (error) {
            console.log(error);
        }
    }


    const updateClientByID = async (id) => {
        props.item.first_name = inputs.name
        props.item.last_name = inputs.surname
        props.item.country = inputs.country
        console.log(props.item.first_name);
        console.log(props.item.last_name);
        console.log(props.item.country);
        try {
            const response = await axios.put(`http://localhost:4040/customer/data/${id}`, inputs)
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className='container-popup'>
            <button className="close" ><img alt="close" src="https://img.icons8.com/metro/26/000000/close-window.png" /></button>
            <div className="div">
                <h2 className="headline">Name:</h2>
                <input id="input-name" name="name" className="input-popup" value={inputs.name} onChange={handleChange} placeholder="Name..." />
            </div>
            <div className="div">
                <h2 className="headline">Surname:</h2>
                <input id="input-surname" name="surname" className="input-popup" value={inputs.surname} onChange={handleChange} placeholder="Surname..." />
            </div>
            <div className="div">
                <h2 className="headline">Country</h2>
                <input id="input-cuntry" name="country" className="input-popup" value={inputs.country} onChange={handleChange} placeholder="Country..." />
            </div>
            <button className="btn-update" onClick={updateCustomer}>Update</button>
        </div>
    )
}))

export default EditPopUp