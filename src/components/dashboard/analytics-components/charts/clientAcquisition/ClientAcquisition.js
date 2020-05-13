import React from 'react'
import { inject, observer } from 'mobx-react'

const ClientAcquisition= inject("generalStore")(observer((props) => {
    return (
        <div className='ClientAcquisition-container'>


        </div>
    )
}))

export default ClientAcquisition