import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import './Client.css'
import Item from '../item/Item.js'
import backward from '../../icons/back.png'
import forward from '../../icons/forward.png'

const Client = inject("generalStore")(observer((props) => {

    const [categoryFilter, setCategoryFilter] = useState("")
    const [searchFilter, setSearchFilter] = useState("")
    const [pageNumber, setPageNumber] = useState(1)

    const handleInput = (e) => {
        // console.log(e.target.value);
        switch (e.target.name) {
            case 'searchFilter':
                setSearchFilter(e.target.value)
                break;
            case 'categoryFilter':
                setCategoryFilter(e.target.value)
                setPageNumber(1)
                break;
            default:
                console.log('problem with the input binding');
        }
    }

    const forwardNumber = () => {
        setPageNumber(pageNumber + 20)
    }
    const backwardNumber = () => {
        if (pageNumber > 20)
            setPageNumber(pageNumber - 20)
    }

    return (
        
        <div className='container-client'>
            <div className="client-search">
                <input id="input-name" className="search-div" placeholder="Search.." name="searchFilter" value={searchFilter} onChange={handleInput}></input>
                <select id="input-owner" className="search-owner" placeholder=".." name="categoryFilter" value={categoryFilter} onChange={handleInput}>
                    <option value="Name">Name</option>
                    <option value="Country">Country</option>
                    <option value="Email">Email</option>
                    <option value="Owner">Owner</option>
                </select>
                <div className="arrows">
                    <div id="arrow-left" className="arrow">
                        <img src={backward} alt="left arrow" onClick={backwardNumber} />
                    </div>
                    <div id="number" className="numbers">{pageNumber}-{pageNumber + 19}</div>
                    <div id="arrow-right" className="arrow">
                        <img src={forward} alt="right arrow" onClick={forwardNumber} />
                    </div>
                </div>
            </div>
            <div className="client-header">
                <div id="name" className="header-field">Name</div>
                <div id="surename" className="header-field">Surname</div>
                <div id="country" className="header-field">Country</div>
                <div id="first-contact" className="header-field">First Contact</div>
                <div id="email" className="header-field">Email</div>
                <div id="sold" className="header-field">Sold</div>
                <div id="owner" className="header-field">Owner</div>
            </div>
            <div className="list-container">
                {(categoryFilter === "Owner" && searchFilter !== "") ? props.generalStore.customersList.splice(pageNumber, 20).filter(c => c.owner === searchFilter).map((c, index) => <Item key={index} item={c} />)
                    : (categoryFilter === "Email" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.email === searchFilter).splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
                        : (categoryFilter === "Country" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.country === searchFilter).splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
                            : (categoryFilter === "Name" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.first_name === searchFilter.split(" ")[0] && c.last_name === searchFilter.split(" ")[1]).splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
                                : props.generalStore.customersList.splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
                }
            </div>
        </div >
    )
}))

export default Client


    //<img src="https://img.icons8.com/metro/26/000000/back.png"/>


//     < div className = "list-container" >
//         {(categoryFilter === "Owner" && searchFilter !== "") ? props.generalStore.customersList.splice(pageNumber, 20).filter(c => c.owner === searchFilter).map((c, index) => <Item key={index} item={c} />)
//         : (categoryFilter === "Email" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.email === searchFilter).splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
//             : (categoryFilter === "Country" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.country === searchFilter).splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
//                 : (categoryFilter === "Name" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.first_name === searchFilter.split(" ")[0] && c.last_name === searchFilter.split(" ")[1]).splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
//                     : props.generalStore.customersList.splice(pageNumber, 20).map((c, index) => <Item key={index} item={c} />)
// }
// </ >


/*


                {(categoryFilter === "Owner" && searchFilter !== "") ? props.generalStore.customersList.splice(pageNumber, 20).filter(c => c.owner === searchFilter).map((c, index) => {return ( <Link className="link" to={`/client/${c.first_name}`}><Item key={index} item={c} /></Link>)})
                    : (categoryFilter === "Email" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.email === searchFilter).splice(pageNumber, 20).map((c, index) =>{return ( <Link className="link" to={`/client/${c.first_name}`}><Item key={index} item={c} /></Link>)})
                        : (categoryFilter === "Country" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.country === searchFilter).splice(pageNumber, 20).map((c, index) => {return ( <Link className="link" to={`/client/${c.first_name}`}><Item key={index} item={c} /></Link>)})
                            : (categoryFilter === "Name" && searchFilter !== "") ? props.generalStore.customersList.filter(c => c.first_name === searchFilter.split(" ")[0] && c.last_name === searchFilter.split(" ")[1]).splice(pageNumber, 20).map((c, index) => {return ( <Link to={`/client/${c.first_name}`}><Item key={index} item={c} /></Link>)})
                                : props.generalStore.customersList.splice(pageNumber, 20).map((c, index) =>{return ( <Link to={`/client/${c.first_name}`} className="link"><Item key={index} item={c} /></Link>)})
                }


                */