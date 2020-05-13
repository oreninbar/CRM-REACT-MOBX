import React from 'react'
import { inject, observer } from 'mobx-react'

const TopEmployess = inject("generalStore")(observer((props) => {
    return (
        <div className='TopEmployess-container'>


        </div>
    )
}))

export default TopEmployess