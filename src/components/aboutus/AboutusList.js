import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Prompt, Link, useHistory } from 'react-router-dom'
import Pagination from "react-js-pagination";

import { fetchAboutus } from '../../actions/aboutus'
import Header from '../header/Header'
import Menu from '../menu/Menu'
import Footer from '../footer/Footer'
import Aboutus  from './Aboutus'
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
const AboutusList = props => {
    console.log(props)
    useEffect( ()=>(
        props.fetchAboutus()
    ), [])
    let history = useHistory()
    let handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}  `);
        props.fetchAboutus(undefined, pageNumber ,3)
    }

    let handlePageSearch = (e) => {
        console.log(`search name is ${e.target.value}  `);
        props.fetchAboutus(undefined, undefined ,undefined,e.target.value)
    }

    let handleClear = () => {
        console.log(`clear`);
        document.getElementById('searchinput').value=''
        props.fetchAboutus(undefined, undefined ,undefined,'')
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
                                    <h5 className="box-title">Aboutus Management</h5>
                                   
                                </div>

                                <div className="search-box">
            
                                         

                                </div>

                                <div className="box-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered  table-condensed table-hover">
                                            <thead>
                                                <tr>
                                                    <th style= {{ textAlign: 'center' }}>SNo.</th>
                                                    <th style= {{ textAlign: 'center' }}>Description</th>
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
                                                    if (props.aboutuslist.success !== false && props.aboutuslist.STATUSCODE !== 4000) {

                                                        return props.aboutuslist.response.docs
                                                        .map( aboutuslist => <Aboutus key={aboutuslist._id} {...aboutuslist}/> );

                                                    } else if (props.aboutuslist.success === false && props.aboutuslist.STATUSCODE === 4000){
                                                        if (props.login && props.login.success !== false)
                                                        {
                                                            return  history.push('/aboutus')

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
                                props.aboutuslist.success !== false && 
                                <Pagination
                                            activePage={props.aboutuslist.response.page}
                                            itemsCountPerPage={props.aboutuslist.response.limit}
                                            totalItemsCount={props.aboutuslist.response.total}
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

const mapStateToProps = ({aboutusReducer}) => ({

    aboutuslist:aboutusReducer.aboutuslist,
    isloading:aboutusReducer.isloading
})

export default connect(mapStateToProps,{fetchAboutus})(AboutusList)