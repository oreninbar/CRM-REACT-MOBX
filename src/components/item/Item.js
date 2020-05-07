import React from 'react'
import './Item.css'
import Popup from 'reactjs-popup'
import EditPopUP from '../popup/EditPopUp.js'
import { observer, inject } from 'mobx-react'


const Item = inject("generalStore")(observer((props) => {
    return (
        <Popup trigger={<div className='container-CustomerItem'   >
            <p id="item-first-name">{props.item.first_name}</p>
            <p id="item-last-name">{props.item.last_name}</p>
            <p id="item-country">{props.item.country}</p>
            <p id="item-firstContact">{props.item.firstContact}</p>
            <p id="item-email">{props.item.email}</p>
            <p id="item-sold" className={props.item.sold ? 'sold' : 'notSold'}>{props.item.sold ? <img alt="confirm sold" src="https://img.icons8.com/color/32/000000/checkmark.png" /> : <img alt="not sold" src="https://img.icons8.com/windows/32/000000/delete-sign.png" />}</p>
            <p id="item-owner">{props.item.owner}</p>
        </div>} position="center center"><EditPopUP item={props.item}/></Popup>
    )
}))

export default Item

//            <Popup trigger={<p id="item-first-name">{props.item.first_name}</p>} position="center center"><EditPopUP/></Popup>
