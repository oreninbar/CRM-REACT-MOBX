import React from 'react'
import { inject, observer } from 'mobx-react'
import './DataHeaderStyle.css'

const DataHeader = inject("generalStore")(observer((props) => {
    return (
        <div className='data-header'>
            <div className="header-item">
                <img src="https://img.icons8.com/nolan/96/combo-chart.png" alt="New Clents" className='round-image' />
                <h1 className='number-item'>{props.generalStore.monthlyNewClients}</h1>
                <h3 className='title-item'>{`New ${props.generalStore.month} Clients`}</h3>
            </div>
            <div className="header-item">
                <img src="https://img.icons8.com/nolan/96/filled-message.png" alt="Emails" className="round-image" />
                <h1 className='number-item'>{props.generalStore.totEmails}</h1>
                <h3 className='title-item'>Emails Sent</h3>
            </div>
            <div className="header-item">
                <img src="https://img.icons8.com/nolan/96/user-male--v1.png" alt='Outstanding Clients' className='round-image' />
                <h1 className='number-item'>{props.generalStore.vipClients}</h1>
                <h3 className='title-item'>OutStanding Clients</h3>
            </div>
            <div className="header-item">
                <img src="https://img.icons8.com/nolan/96/geography.png" alt='Hottest Country' className="round-image" />
                <h1 className='number-item'>{props.generalStore.hottestCountry}</h1>
                <h3 className='title-item'>Hottest Country</h3>
            </div>
        </div>

    )
}))

export default DataHeader

/*

      <Emailsent />
        <OutStandingClients />
        <HottestCountry />
        <NewClients />

*/