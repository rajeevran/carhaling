import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Prompt, Link, useHistory } from 'react-router-dom'
import Pagination from "react-js-pagination";

import { fetchBooking } from '../../actions/booking'
import Header from '../header/Header'
import Menu from '../menu/Menu'
import Footer from '../footer/Footer'
import Booking  from './Booking'
import { Loader } from 'react-overlay-loader';
 
import 'react-overlay-loader/styles.css';
const BookingList = props => {
    console.log(props)
    useEffect( ()=>(
        props.fetchBooking()
    ), [])
    let history = useHistory()
    let handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}  `);
        props.fetchBooking(undefined, pageNumber ,10,undefined)
    }

    let handlePageSearch = (e) => {
        console.log(`search name is ${e.target.value}  `);
        props.fetchBooking(undefined, undefined ,undefined,e.target.value)
    }

    let handleClear = () => {
        console.log(`clear`);
        document.getElementById('searchinput').value=''
        props.fetchBooking(undefined, undefined ,undefined,'')
    }

    return ( 
        <div className="wrapper">
            <Header />
            <Menu />
           <div className="content-wrapper" style={{minHeight:'576px'}}>
                <section className="content-header">
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h5 className="box-title">Booking Management</h5>
                                 
                                </div>

                                <div className="search-box">
            
                                            <input id="searchinput" placeholder="Search By Booking Name" type="search" onChange={ (e) => { handlePageSearch(e) } } className="form-control" />
                                            
                                            <span id="searchclear" className="glyphicon" onClick={ ()=> {handleClear()}}>
                                                <i className="fa fa-times"></i>
                                            </span>

                                </div>

                                <div className="box-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered  table-condensed table-hover">
                                            <thead>
                                                <tr>
                                                    <th style= {{ textAlign: 'center' }}>Booking Number</th>
                                                    <th style= {{ textAlign: 'center' }}>Pickup Date</th>
                                                    <th style= {{ textAlign: 'center' }}>Drop Date</th>
                                                    <th style= {{ textAlign: 'center' }}>Customer Name</th>
                                                    <th style= {{ textAlign: 'center' }}>Driver Name</th>
                                                    <th style= {{ textAlign: 'center' }}>Driver Status</th>
                                                    <th style= {{ textAlign: 'center' }}>Delivery Status</th>
                                                    <th style= {{ textAlign: 'center' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(function() {
                                                
                                                     if (props.isloading) {
                                                        return (
                                                            <Loader fullPage loading />

                                                        )
                                                     }else 
                                                    if (props.bookinglist.success !== false && props.bookinglist.STATUSCODE !== 4000) {

                                                        return props.bookinglist.response.docs
                                                        .map( bookinglist => <Booking key={bookinglist._id} {...bookinglist}/> );

                                                    } else if (props.bookinglist.success === false && props.bookinglist.STATUSCODE === 4000){
                                                        if (props.login && props.login.success !== false)
                                                        {
                                                            return  history.push('/booking')

                                                        }
                                                        return  history.push('/login')
                                                    }
                                                    })
                                             ()}

                                           </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div className="col-xs-12">
                            <div className="pagination-center">
                            { 
                                props.bookinglist.success !== false && 
                                <Pagination
                                            activePage={props.bookinglist.response.page}
                                            itemsCountPerPage={props.bookinglist.response.limit}
                                            totalItemsCount={props.bookinglist.response.total}
                                            pageRangeDisplayed={5}
                                            onChange={handlePageChange}
                                />
      
                            }
                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
   
  
        </div>
    )
}

const mapStateToProps = ({bookingReducer}) => ({

    bookinglist : bookingReducer.bookinglist,
    isSuccess   : bookingReducer.isSuccess,
    message     : bookingReducer.message,
    isloading   : bookingReducer.isloading
})

export default connect(mapStateToProps,{fetchBooking})(BookingList)