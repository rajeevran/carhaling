
import React, { Component, Fragment, useEffect, useState,useRef } from 'react'
import { runInThisContext } from 'vm';
import { withFormik, Form, Field, Formik, ErrorMessage } from 'formik'
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Container, Row, Col, Media } from 'reactstrap';
import { Prompt, Link, useHistory  } from 'react-router-dom'
import { baseUrl, localUrl } from '../../shared/baseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  fetchBooking, postEditBooking, fetchDriver, fetchCustomer } from '../../actions/booking'
import { connect } from 'react-redux';
import Header from '../header/Header'
import Menu from '../menu/Menu'
import Footer from '../footer/Footer'
import { log } from 'util';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import Select from 'react-select';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    return ref.current;
  }

const BookingForm = props => {
   // console.log('match values--->',match);
   const history = useHistory()

   var lastIndex = window.location.href.lastIndexOf("/")
   console.log('lastIndex----',lastIndex);
   
   var id = window.location.href.substring(lastIndex + 1); //after this id="true"
   console.log('path----',id);

    useEffect( ()=>(
        props.fetchBooking(id),
        props.fetchDriver(),
        props.fetchCustomer()
    ), [])
    console.log('props values--->',props);

    var lastIndex = window.location.href.lastIndexOf("/")
    console.log('lastIndex----',lastIndex);

    let pathEditView = window.location.href.split('/')[ window.location.href.split('/').length -2]
    console.log('pathEditView--------->',pathEditView);

    const isAddMode = id=='add' ? true:false;

    const prevIsSuccess = usePrevious(props.isSuccess);    

    useEffect( ()=>{
        console.log('isSuccess hitted',props.isSuccess);

        if(prevIsSuccess === false && props.isSuccess === true)
        {
   
                toast.success("Booking Updated Successfully.")

                setTimeout( ()=>{
    
                    history.goBack() 
        
                },2000)

           
        }

    }, [props.isSuccess,prevIsSuccess])

    let [pickupDate, setPickupDate]   = useState(null);
    let [dropDate, setDropDate]   = useState(null);


    let definedid = ''
    let definedpickupLocation  = ''
    let defineddropLocation = ''
    let definedpickupDate = ''
    let defineddropDate = ''
    let definedcustomerId = ''
    let defineddriverId = ''
    let defineddistance = ''
    let definedprice = ''
    let definedbookingNumber = ''
    let defineddriverStatus = ''
    let definedcustomerConfirmation = ''
    let defineddriverConfirmation = ''
    let definedisJourneyCompleted = ''
    let defineddeliveryStatus = ''
    let definedvehicleDetail = ''
    let definedpickupNotes = ''
    let definedvehicleId = ''

    //deleteId
    if(!isAddMode && props.bookinglist.response.docs.length == 1)
    {
        props.bookinglist.response.docs.map((response) => 
        {
            definedid = response._id
            definedpickupLocation  = response.pickupLocation
            defineddropLocation = response.dropLocation
            definedpickupDate = response.pickupDate
            defineddropDate = response.dropDate
            definedcustomerId = response.customerId ? response.customerId._id : null
            defineddriverId   =  response.driverId  ? response.driverId._id   : null
            defineddistance = response.distance
            definedprice = response.price
            definedbookingNumber = response.bookingNumber
            defineddriverStatus = response.driverStatus
            definedcustomerConfirmation = response.customerConfirmation
            defineddriverConfirmation = response.driverConfirmation
            definedisJourneyCompleted = response.isJourneyCompleted
            defineddeliveryStatus = response.deliveryStatus
            definedvehicleDetail = response.vehicleDetail
            definedpickupNotes = response.pickupNotes
            definedvehicleId = response.vehicleId
        })
    }
    useEffect( ()=>{

        if(definedpickupDate && definedpickupDate != '' )
       {
           setPickupDate(new Date(definedpickupDate))
       }

   },[definedpickupDate])

   useEffect( ()=>{

    if(defineddropDate && defineddropDate != '' )
   {
       setDropDate(new Date(defineddropDate))
   }

    },[defineddropDate])

    let valdationShape = {}
    let addEditFields = {}

    if(isAddMode)
    {

        addEditFields ={
            pickupLocation  : definedpickupLocation,
            dropLocation : defineddropLocation,
            pickupDate : definedpickupDate,
            dropDate : defineddropDate,
            customerId : definedcustomerId,
            driverId : defineddriverId,
            distance : defineddistance,
            price : definedprice,
            bookingNumber : definedbookingNumber,
            driverStatus : defineddriverStatus,
            customerConfirmation : definedcustomerConfirmation,
            driverConfirmation : defineddriverConfirmation,
            isJourneyCompleted : definedisJourneyCompleted,
            deliveryStatus : defineddeliveryStatus,
            vehicleDetail : definedvehicleDetail,
            pickupNotes : definedpickupNotes     
        }

        valdationShape= {
            bookingNumber: Yup.string()
                .required('bookingNumber is required')
        }

    }else{

        addEditFields ={
            bookingId: definedid,
            pickupLocation  : definedpickupLocation,
            dropLocation : defineddropLocation,
            pickupDate : definedpickupDate,
            dropDate : defineddropDate,
            customerId : definedcustomerId,
            driverId : defineddriverId,
            distance : defineddistance,
            price : definedprice,
            bookingNumber : definedbookingNumber,
            driverStatus : defineddriverStatus,
            customerConfirmation : definedcustomerConfirmation,
            driverConfirmation : defineddriverConfirmation,
            isJourneyCompleted : definedisJourneyCompleted,
            deliveryStatus : defineddeliveryStatus,
            vehicleDetail : definedvehicleDetail,
            pickupNotes : definedpickupNotes 
        }

        valdationShape= {

            bookingNumber: Yup.string()
                .required('bookingNumber is required')
        }
    }


    const initialValues = addEditFields

    const validationSchema = Yup.object().shape(valdationShape);

    function onSubmit(fields) {

        console.log('fields---',fields);

        if (isAddMode) {

            props.postAddBooking(fields)

        } else {

            props.postEditBooking(fields)
        }
    }

    const DriverDetail=({onChange, onBlur, name, driverdetail, value, errors, touched, mode}) => {

        console.log('name---------->',name);
        console.log('value---------->',value);
        console.log('practiceLabs---------->',driverdetail);
        //let savedValue= value.map( mappval => mappval._id)

        const handleChange = value => {
        // This is going to call setFieldValue and manually update values 
        onChange(name,  value.value  );
        };
    
        const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        onBlur(name, true);
        };

        return (
        <div>
            <Select
            options={driverdetail.map(v=>({value:v._id, label:`${v.firstName} ${v.lastName}`, isDisabled: mode ==='view'? true:false}))}
            withAll={true}
            isDisabled={mode ==='view'? true:false}
            onChange={handleChange}
            onBlur={handleBlur}
            value={driverdetail.map(v=>({value:v._id, label:`${v.firstName} ${v.lastName}`})).filter(v=>value ===v.value)}

            />
        </div>);
    }

    let allDriverDetail = []

    if (props.driverlist.success !== false && props.driverlist.STATUSCODE !== 400) {
        allDriverDetail=props.driverlist.response.docs
    }    

    const CustomerDetail=({onChange, onBlur, name, customerdetail, value, errors, touched, mode}) => {

        console.log('name---------->',name);
        console.log('value---------->',value);
        console.log('practiceLabs---------->',customerdetail);
        //let savedValue= value.map( mappval => mappval._id)

        const handleChange = value => {
        // This is going to call setFieldValue and manually update values 
        onChange(name,  value.value  );
        };
    
        const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        onBlur(name, true);
        };

        return (
        <div>
            <Select
            options={customerdetail.map(v=>({value:v._id, label:`${v.firstName} ${v.lastName}`, isDisabled: mode ==='view'? true:false}))}
            
            withAll={true}
            isDisabled={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={customerdetail.map(v=>({value:v._id, label:`${v.firstName} ${v.lastName}`})).filter(v=>value ===v.value)}

            />
        </div>);
    }

    let allCustomerDetail = []

    if (props.customerlist.success !== false && props.customerlist.STATUSCODE !== 400) {
        allCustomerDetail=props.customerlist.response.docs
    }    

    return (
        <div className="wrapper">
        <ToastContainer />
        <Header />
        <Menu />
        <div className="content-wrapper" style={{minHeight:'576px'}}>
          <Row>
            <Col xs="12" md={{size:10, offset:0}}></Col>


            {props.isloading &&

                <Loader fullPage loading />

            }

            { pathEditView == 'edit' && props.bookinglist.success !== false && props.bookinglist.response.docs.length == 1  && 
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit }>
                {({ values, errors, touched, isSubmitting, setFieldValue, setFieldTouched,handleChange }) => {

                return (
                    <Form>

                        <h1>{isAddMode ? 'Add Booking' : 'Edit Booking'}</h1>
                        <Row>
                            <Col md={12}>
                            
                            <div className="portlet box blue">
                                <div className="portlet-title">
                                <div className="caption">
                                    <i className="fa fa-user-plus"></i>
                                </div>
                                <div className="tools">
                                    <a href="" className="collapse" data-original-title="" title="">
                                    </a>

                                </div>
                                </div>
                                <div className="portlet-body form" style={{"display": "block"}}>
                                    <div className="form-body">
                                        
                                    <FormGroup row>
                                    <Col md={12}>

                                        <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                        <button style={{'marginRight':'20px'}}  type="submit"  className="pull-right btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>

                                    </Col>
                                    </FormGroup>
                                    
                                    <Row>
                                        
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Customer Booking Information :</span></label>
                                                                                            
                                            </FormGroup>
                                        
                                        </Col>
                                     
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Booking Number</label>
                                                <Field name="bookingNumber"  
                                                     disabled type="text" className={'form-control' + (errors.bookingNumber && touched.bookingNumber ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="bookingNumber" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Customer Name</label>
                                            <CustomerDetail 
                                                name={"customerId"} 
                                                customerdetail={allCustomerDetail}
                                                value={values.customerId} 
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                errors={errors}
                                                touched={touched}
                                                mode={"edit"} 

                                             />
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Pickup Location</label>
                                                <Field name="pickupLocation"  
                                                     type="text" className={'form-control' + (errors.pickupLocation && touched.pickupLocation ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="pickupLocation" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Drop Location</label>
                                                <Field name="dropLocation"  
                                                     type="text" className={'form-control' + (errors.dropLocation && touched.dropLocation ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="dropLocation" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}> 
                                        <FormGroup>
                                            <label>Pickup Date</label>
                                            <div>
                                            <DatePicker
                                                    selected={pickupDate}
                                                    onChange={(dt) => {
                                                    // console.log('dt----',dt);
                                                        setPickupDate(dt)
                                                        setFieldValue(`pickupDate`,new Date(dt))
                                                    }}
                                                    dateFormat = 'yyyy-MM-dd'
                                                    isClearable
                                                    showYearDropdown
                                                    scrollableYearDropdown
                                            />
                                            </div>                                            
                                            <ErrorMessage name="pickupDate" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Drop Date</label>
                                            <div>
                                            <DatePicker
                                                    selected={dropDate}
                                                    onChange={(dt) => {
                                                    // console.log('dt----',dt);
                                                        setDropDate(dt)
                                                        setFieldValue(`dropDate`,new Date(dt))
                                                    }}
                                                    dateFormat = 'yyyy-MM-dd'
                                                    isClearable
                                                    showYearDropdown
                                                    scrollableYearDropdown
                                            />
                                            </div>                                             
                                            <ErrorMessage name="dropDate" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        </Row>
                                        <Row>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Distance</label>
                                                <Field name="distance"  
                                                     type="text" className={'form-control' + (errors.distance && touched.distance ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="distance" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Price</label>
                                                <Field name="price"  
                                                     type="text" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="price" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Customer Confirmation</label>
                                                <Field name="customerConfirmation" as="select" className={'form-control' + (errors.customerConfirmation && touched.customerConfirmation ? ' is-invalid' : '')}>
                                                        <option value="initiate">Select an Option </option>
                                                        <option value="confirm">Confirm</option>
                                                        <option value="decline">Decline</option>
                                                </Field>  
                                                <ErrorMessage name="customerConfirmation" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>PickupNotes</label>
                                                <Field name="pickupNotes"  
                                                     type="text" className={'form-control' + (errors.pickupNotes && touched.pickupNotes ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="pickupNotes" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
 

                                    </Row>

                                    <Row>
    
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Driver Information :</span></label>
                                                                                            
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Driver Status</label>
                                                <Field name="driverStatus" as="select" className={'form-control' + (errors.driverStatus && touched.driverStatus ? ' is-invalid' : '')}>
                                                        <option value="free">Free</option>
                                                        <option value="assigned">Assigned</option>
                                                        <option value="schedule">Schedule</option>
                                                        <option value="complete">Complete</option>
                                                </Field>  

                                                <ErrorMessage name="driverStatus" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Driver Confirmation</label>
                                                <Field name="driverConfirmation" as="select" className={'form-control' + (errors.driverConfirmation && touched.driverConfirmation ? ' is-invalid' : '')}>
                                                         <option value="initiate">Select an Option</option>
                                                        <option value="confirm">Confirm</option>
                                                        <option value="decline">Decline</option>
                                                </Field>  
                                                <ErrorMessage name="driverConfirmation" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>IsJourneyCompleted ? </label>
                                                <Field name="driverStatus" as="select" className={'form-control' + (errors.driverStatus && touched.driverStatus ? ' is-invalid' : '')}>
                                                        <option value="false">No</option>
                                                        <option value="true">Yes</option>
                                                </Field>  
                                                <ErrorMessage name="driverStatus" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>DeliveryStatus</label>
                                                <Field name="deliveryStatus" as="select" className={'form-control' + (errors.deliveryStatus && touched.deliveryStatus ? ' is-invalid' : '')}>
                                                         <option value="initiate">Select an Option</option>
                                                        <option value="delivered">Delivered</option>
                                                </Field>  
                                                <ErrorMessage name="deliveryStatus" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Driver</label>
                                       
                                            <DriverDetail 
                                                name={"driverId"} 
                                                driverdetail={allDriverDetail}
                                                value={values.driverId} 
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                errors={errors}
                                                touched={touched}
                                                mode={"edit"} 

                                             />
                                        </FormGroup>
                                        </Col>
                                 

                                    </Row>


                                <FormGroup row>
                                <Col md={12}>

                                    <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                    <button style={{'marginRight': '20px'}}  type="submit"  className="pull-right btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Save
                                    </button>

                                </Col>
                                </FormGroup>

                            </div>

                    </div>
                 </div>
                           
                            </Col>
                        
                        </Row>
                        
                    </Form>
                );
                }}
              </Formik>
            
            }

            {/*   THIS PART FOR EDIT  END   */}






            {/*   THIS PART FOR VIEW  START   */}

            { pathEditView == 'view' && props.bookinglist.success !== false && props.bookinglist.response.docs.length == 1  && 
              <Formik initialValues={initialValues}>
                {({ values, errors, touched, isSubmitting, setFieldValue, setFieldTouched }) => {
                    console.log('values.status--',values.status);


                return (
                    <Form>

                        <h1>View Booking</h1>
                        <Row>
                            <Col md={12}>
                            
                            <div className="portlet box blue">
                                <div className="portlet-title">
                                <div className="caption">
                                    <i className="fa fa-user-plus"></i>
                                </div>
                                <div className="tools">
                                    <a href="" className="collapse" data-original-title="" title="">
                                    </a>

                                </div>
                                </div>
                                <div className="portlet-body form" style={{"display": "block"}}>
                                    <div className="form-body">
                                        
                                    <FormGroup row>
                                    <Col md={12}>

                                        <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>


                                    </Col>
                                    </FormGroup>
                                    
                                    <Row>
                                        
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Customer Booking Information :</span></label>
                                                                                            
                                            </FormGroup>
                                        
                                        </Col>
                                     
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Booking Number</label>
                                                <span name="bookingNumber"  className='form-control  no-border'>
                                                            {values.bookingNumber}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Customer</label>
                                       
                                            <span name="customerId"  className='form-control  no-border'>
                                                {
                                                 values.customerId ? 
                                                  allCustomerDetail.map((e) => {
                                                      if(e._id == values.customerId)
                                                      {
                                                          return e.firstName + ' ' + e.lastName
                                                      }
                                                  }) 
                                                 
                                                 : 'N/A' 
                                                }
                                            </span>

                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Pickup Location</label>
                                                <span name="pickupLocation"  className='form-control  no-border'>
                                                            {values.pickupLocation}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Drop Location</label>
                                                <span name="dropLocation"  className='form-control  no-border'>
                                                            {values.dropLocation}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}> 
                                        <FormGroup>
                                            <label>Pickup Date</label>
                                                <span name="pickupDate"  className='form-control  no-border'>
                                                            {
                                                                Intl.DateTimeFormat('en-US',{
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: '2-digit' }).format(new Date(values.pickupDate))

                                                            }
                                                </span>
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Drop Date</label>
                                                <span name="dropDate"  className='form-control  no-border'>
                                                            {
                                                                Intl.DateTimeFormat('en-US',{
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: '2-digit' }).format(new Date(values.dropDate))

                                                            }
                                                </span>
                                            
                                        </FormGroup>
                                        </Col>

                                     
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Distance</label>
                                                <span name="distance"  className='form-control  no-border'>
                                                            {values.distance}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Price</label>
                                                <span name="price"  className='form-control  no-border'>
                                                            {values.price}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Customer Confirmation</label>
                                                <span name="customerConfirmation"  className='form-control  no-border'>
                                                            {values.customerConfirmation == 'initiate' ? 'N/A' : values.customerConfirmation}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>PickupNotes</label>
                                                <span name="pickupNotes"  className='form-control  no-border'>
                                                            {values.pickupNotes}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>


                                    </Row>

                                    <Row>
    
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Driver Information :</span></label>
                                                                                            
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Driver Status</label>
                                                <span name="driverStatus"  className='form-control  no-border'>
                                                            {values.driverStatus }
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Driver Confirmation</label>
                                                <span name="driverConfirmation"  className='form-control  no-border'>
                                                            {values.driverConfirmation == 'initiate' ? 'N/A' : values.driverConfirmation}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>IsJourneyCompleted ? </label>
                                                <span name="isJourneyCompleted"  className='form-control  no-border'>
                                                    {values.driverStatus == 'false' ? 'No' : 'Yes'}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Delivery Status</label>
                                                <span name="deliveryStatus"  className='form-control  no-border'>
                                                            {values.deliveryStatus == 'initiate' ? 'N/A' : values.deliveryStatus}
                                                </span>
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Driver</label>
                                       
                                            <span name="driverId"  className='form-control  no-border'>
                                                {
                                                 values.driverId ? 
                                                  allDriverDetail.map((e) => {
                                                      if(e._id == values.driverId)
                                                      {
                                                          return e.firstName + ' ' + e.lastName
                                                      }
                                                  }) 
                                                 
                                                 : 'N/A' 
                                                }
                                            </span>

                                        </FormGroup>
                                        </Col>

                                    </Row>


                                <FormGroup row>
                                <Col md={12}>

                                    <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>


                                </Col>
                                </FormGroup>

                            </div>

                    </div>
                 </div>
                           
                            </Col>
                        
                        </Row>
       
                    </Form>
                    );
                    }}
                    </Formik>
                }

            {/*   THIS PART FOR VIEW  END   */}


        </Row>
        </div>
        <Footer />
    </div>
    );    


}

const mapStateToProps = ({bookingReducer}) => ({

                bookinglist  : bookingReducer.bookinglist,
                driverlist   : bookingReducer.driverlist,
                customerlist : bookingReducer.customerlist,
                isSuccess    : bookingReducer.isSuccess,
                isloading    :  bookingReducer.isloading
})

export default connect(mapStateToProps, {postEditBooking, fetchBooking, fetchDriver, fetchCustomer })(BookingForm)
