import React from 'react'
import { inject, observer } from 'mobx-react'

const Sales = inject("generalStore")(observer((props) => {
    return (
        <div className='Sales-container'>


        </div>
    )
}))

export default Sales