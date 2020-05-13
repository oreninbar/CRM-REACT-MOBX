import React from 'react'
import { inject, observer } from 'mobx-react'
import './DashBoard.css'

// import Sales from './analytics-components/charts/sales/Sales'
// import TopEmployess from './analytics-components/charts/topEmployees/TopEmployees'
// import ClientAcquisition from './analytics-components/charts/clientAcquisition/ClientAcquisition'
// import SalsesByCountry from './analytics-components/charts/salesByCountry/SalesByCountry'
import DataHeader from './analytics-components/dataHeader/DataHeader'

const DashBoard = inject("generalStore")(observer((props) => {
    return (
        <div className='container-dashboard'>
            <div>
                <DataHeader />
            </div>
            <div className='container-charts'>

            </div>
        </div>
    )
}))

export default DashBoard