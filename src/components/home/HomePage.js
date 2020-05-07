import React from 'react'
import './HomePage.css'
import { observer, inject } from 'mobx-react'
import Item from '../item/Item.js'

const HomePage = inject("generalStore")(observer((props) => {
    return (
        <div className='container-home'>
            {props.generalStore.customersList.map((c, index) => {
                return (<Item key={index} item={c} />)
            })}
        </div>
    )
}))

export default HomePage