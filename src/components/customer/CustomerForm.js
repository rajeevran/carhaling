
import React, { Component, Fragment, useEffect, useState, useRef } from 'react'
import { runInThisContext } from 'vm';
import { withFormik, Form, Field, Formik, ErrorMessage, FieldArray } from 'formik'
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Container, Row, Col, Media } from 'reactstrap';
import { Prompt, Link, useHistory  } from 'react-router-dom'
import { baseUrl, localUrl } from '../../shared/baseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import { postAddUser, fetchUser, postEditUser, postDeleteUser, postSendEmail } from '../../actions/admin'
import { connect } from 'react-redux';
import Header from '../header/Header'
import Menu from '../menu/Menu'
import Footer from '../footer/Footer'
import { log } from 'util';
import { Loader } from 'react-overlay-loader';
import NumericInput from 'react-numeric-input';
import 'react-overlay-loader/styles.css';
import Select from 'react-select';
import ReactDropzone from "react-dropzone";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {usePrevious} from '../../shared/utils'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';  
import Thumb from './Thumb'

const CustomerForm = props => {
   // console.log('match values--->',match);
   const history = useHistory()

   let textInput = useRef(null);
   let [adminres, setAdminres] = useState(null);

   function handleAdminResponse(e) {

        console.log('e---',e.target.value);
        setAdminres(e.target.value)

   }

   function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

   function focusTextInput(adminresponse,email,fullname) {
    // console.log('adminresponse---',adminresponse);
    // console.log('email---',email);
    // console.log('fullname---',fullname);

        if(adminresponse == '')
        {
            toast.warn(`Please enter the  Admin response`)
        }else  if(email == '')
        {
            toast.warn(`Please enter the Email`)
        }else  if(!validateEmail(email))
        {
            toast.warn(`Please enter the valid Email`)
        }else  if(fullname == '')
        {
            toast.warn(`Please enter the Full Name`)
        }else{

            props.postSendEmail(
                {
                    adminresponse:adminresponse,
                    email:email,
                    name:fullname
                }   
            )

            toast.success(`Mail has been sent to ${fullname}`)
        }

    }

    useEffect( ()=>(
        props.fetchUser(props.match.params.id)
    ), [])
    console.log('props values--->',props);

    const { id }         = props.match.params;
    let { path }         = props.match;
    let pathEditView     = path.split('/')[2]
    const isAddMode      = !id;
    const prevIsSuccess  = usePrevious(props.isSuccess);    
    const prevIsMailsend = usePrevious(props.ismailsend);    

    useEffect( ()=>{
        console.log('isSuccess hitted',props.isSuccess);

        if(prevIsSuccess !== undefined && prevIsSuccess === false)
        {
            if(props.isSuccess === true)
            {

                toast.success(props.message)

                setTimeout( ()=>{
    
                    history.goBack() 
        
                },2000)

            }else if(props.isSuccess === false){

                toast.warn(props.message)

            }
        }

    }, [prevIsSuccess, props.message])


    let definedid                 = ''
    let definedfirstName          = ''
    let definedlastName           = ''
    let definedemail              = ''
    let definedphoneNumber        = ''
    let definedlocation           = ''
    let definedrole               = ''
    let definedage                = ''
    let definedcountry            = ''
    let definedcity               = ''
    let defineddob                = ''
    let definedgender             = ''
    let definedstatus             = ''
    let defineddeleteId           = ''
    let definedprofileImage       = ''
    let definedimageSavedUrl      =''
    let definedselfieImage        = ''
    let definedselfieImageSavedUrl=''
    let definedadminresponse      = ''

    let definedcvcCode            = ''
    let definedvalidity           = ''
    let definedaccountHolderName  = ''
    let definedaccountNumber      = ''
    let definedpaymentMethod      = ''
    let definedbankName           = ''
    let definedccbill             = []


    //deleteId
    let [dob, setCounter]   = useState(null);
    let [open, setOpen]     = useState(false);
    

    let [openProfile, setOpenProfile] = useState({
        photoIndex: 0,
        isOpenProfileImage: false,
      });

      let [openSelfie, setOpenSelfie] = useState({
        selfieIndex: 0,
        isOpenSelfie: false,
      });
      
      
    let profile        = []
    let profileArray   = []
    let selfieprofile  = []
    if(!isAddMode && props.userList.response.docs.length == 1)
    {
        props.userList.response.docs.map((response) => 
        {
            defineddeleteId          = pathEditView == 'delete' ? response._id: ''
            definedid                = response._id
            definedfirstName         = response.firstName
            definedlastName          = response.lastName
            definedemail             = response.email
            definedphoneNumber       = response.phoneNumber
            definedrole              = response.role
            definedage               = response.age
            definedgender            = response.gender
            definedcountry           = response.country
            definedcity              = response.city
            defineddob               = response.dob
            definedprofileImage      = response.profileImage

            definedimageSavedUrl     = (response.profileImage != '') ?
                                        baseUrl+response.profileImage : baseUrl+'uploads/dummy/demo-profile.png'
            definedstatus            = response.status
            definedccbill.push(response.ccbill)
            if(response.ccbill !== null)
            {   
                definedccbill.map( (paymentData) => {

                    definedcvcCode          = paymentData.cvcCode
                    definedvalidity         = paymentData.validity
                    definedaccountHolderName= paymentData.accountHolderName
                    definedaccountNumber    = paymentData.accountNumber
                    definedpaymentMethod    = paymentData.paymentMethod
                    definedbankName         = paymentData.bankName
                })
            }
       })

    }
    useEffect( ()=>{

         if(defineddob && defineddob != '' )
        {
            setCounter(new Date(defineddob))
        }

    },[defineddob])

 
    const closeLightbox = () => {
        setOpen(false);
    };

    let valdationShape = {}
    let addEditFields = {}

    if(isAddMode)
    {
        addEditFields ={
            deleteId                : defineddeleteId,
            firstName                : definedfirstName,
            lastName                : definedlastName,
            email                   : definedemail,
            phoneNumber             : definedphoneNumber,
            location                : definedlocation,
            role                    : definedrole,
            age                     : definedage,
            gender                  : definedgender,
            country                 : definedcountry,
            city                    : definedcity,
            dob                     : defineddob,
            profileImage            : definedprofileImage,
            status                  : 'false',
            password                : '',
            imagePreviewUrl         : '',

            cvcCode                 : definedcvcCode,
            validity                : definedvalidity,
            accountHolderName       : definedaccountHolderName,
            accountNumber           : definedaccountNumber,
            paymentMethod           : definedpaymentMethod,
            bankName                : definedbankName

        }

        valdationShape= {
            firstName: Yup.string()
                .required('Full Name is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .concat(isAddMode ? Yup.string().required('Password is required') : null)
                .min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .when('password', (password, schema) => {
                    if (password || isAddMode) return schema.required('Confirm Password is required');
                })
                .oneOf([Yup.ref('password')], 'Passwords must match')
        }

    }else{

        addEditFields ={
            deleteId                : defineddeleteId,
            userId                  : definedid,
            firstName               : definedfirstName,
            lastName                : definedlastName,
            profileImage            : definedprofileImage,
            imageSavedUrl           : definedimageSavedUrl,
            email                   : definedemail,
            phoneNumber             : definedphoneNumber,
            location                : definedlocation,
            role                    : definedrole,
            age                     : definedage,
            gender                  : definedgender,
            country                 : definedcountry,
            city                    : definedcity,
            dob                     : defineddob,
            status                  : definedstatus,
            imagePreviewUrl         : '',

            cvcCode                 : definedcvcCode,
            validity                : definedvalidity,
            accountHolderName       : definedaccountHolderName,
            accountNumber           : definedaccountNumber,
            paymentMethod           : definedpaymentMethod,
            bankName                : definedbankName
        }

        valdationShape= {

            firstName: Yup.string()
                .required('Full Name is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required')
        }
    }


    const initialValues = addEditFields

    const validationSchema = Yup.object().shape(valdationShape);

    function onSubmit(fields) {
        

       fields.ccbill = JSON.stringify({
                                paymentMethod           : fields.paymentMethod,
                                accountNumber           : fields.accountNumber,
                                accountHolderName       : fields.accountHolderName,
                                bankName                : fields.bankName,
                                validity                : fields.validity,
                                cvcCode                 : fields.cvcCode
                         })

        console.log('fields---',fields);

        if (isAddMode) {

            props.postAddUser(fields)

        } else {

            props.postEditUser(fields)
        }

    }

    function onDeleteCustomer(id){
        console.log('id---',id);
        props.postDeleteUser({userId:id})
        toast.success("Customer Data Deleted Successfully.")

        setTimeout( ()=>{

            document.getElementById('close-delete-button-model').click() ;

        },2500)

    }
    const setCount = date => {

       console.log('setCount date---',setCount);
        setCounter(date);

    };

   const { photoIndex, isOpenProfileImage } = openProfile;
   const { selfieIndex, isOpenSelfie }      = openSelfie;

   const roundButtonStyle = {
    borderRadius: '50%'
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

            {/*   THIS PART FOR EDIT  START   */}

            { pathEditView == 'edit' && props.userList.success !== false && props.userList.response.docs.length == 1  && 
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit }>
                {({ values, errors, touched, isSubmitting, setFieldValue,handleChange }) => {

                return (
                    <Form>

                        <h1>{isAddMode ? 'Add Customer' : 'Edit Customer'}</h1>
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

                                        <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>

                                    </Col>
                                    </FormGroup>
                                    
                                    <Row>
                                        
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Basic Information :</span></label>
                                                                                            
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Field name="firstName"  
                                                     type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Field name="lastName"  
                                                     type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Email</label>
                                            <Field name="email"  type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Phone Number</label>
                                            <Field name="phoneNumber" type="text" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                     
                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Role</label>
                                            <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                                        <option value="">Select an Option</option>
                                                        <option value="driver">Customer</option>
                                                        <option value="customer">Customer</option>
                                            </Field>                                            
                                            <ErrorMessage name="role" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>


                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>DOB</label>
                                            <div>
                                            <DatePicker
                                                    selected={dob}
                                                    onChange={(dt) => {
                                                    // console.log('dt----',dt);
                                                        setCounter(dt)
                                                        setFieldValue(`dob`,new Date(dt))
                                                    }}
                                                    dateFormat = 'yyyy-MM-dd'
                                                    isClearable
                                                    showYearDropdown
                                                    scrollableYearDropdown
                                            />
                                            </div>
                                            <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Gender</label>
                                            <Field name="gender" as="select" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')}>
                                                        <option value="">Select an Option</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Others">Others</option>
                                            </Field>                                            
                                            <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Status</label>
                                        
                                                <Field name="status" as="select" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')}>
                                                        <option value="true">Active</option>
                                                        <option value="false">DeActive</option>
                                                </Field>

                                                <ErrorMessage name="status" component="div" className="invalid-feedback" />

                                        </FormGroup>
                                        </Col>

                                        <FormGroup>
                                        <label>Profile Image</label>
                                        <div className="photo-upload">

                                            <input className="btn btn-warning btupload"  id="file" name="profileImage"  type="file" accept="image/*" onChange={(e) => {
                                                        // console.log('event.target.files[0]--',event.target.files[0]);
                                                        e.preventDefault();

                                                        let reader = new FileReader();
                                                        let file = e.target.files[0];
                                                    
                                                        reader.onloadend = () => {
                                                            console.log('reader.result---',reader.result);
                                                            
                                                            setFieldValue(`imagePreviewUrl`, reader.result)
                                                            setFieldValue(`profileImage`, file)
                                                            // this.setState({
                                                            // file: file,
                                                            // imagePreviewUrl: reader.result
                                                            // });
                                                        }
                                                    
                                                        reader.readAsDataURL(file)


                                                }} />
                    
                                            <img src={values.imageSavedUrl}  
                                            style={{height:'150px', width:'150px', marginRight:'30px'}}
                                            /> 
                                          
                                            {
                                                values.imagePreviewUrl && 
                                                
                                                <img src={values.imagePreviewUrl}  name="imagePreviewUrl" style={{height:'150px', width:'150px'}} /> 
                                                
                                            } 
                                        
                                        </div>
                                    </FormGroup>
                                        </Row>

                                       <Row>

                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Payment Information :</span></label>                                      
                                            </FormGroup>
                                        </Col>



                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Account Holder Name</label>
                                                
                                            <Field name="accountHolderName" type="text" className={'form-control' + (errors.accountHolderName && touched.accountHolderName ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="accountHolderName" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Account Number</label>
                                            <Field name="accountNumber" type="text" className={'form-control' + (errors.accountNumber && touched.accountNumber ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="accountNumber" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>BankName</label>
                                                
                                            <Field name="bankName" type="text" className={'form-control' + (errors.bankName && touched.bankName ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="bankName" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Payment Method</label>
                                                
                                            <Field name="paymentMethod" type="text" className={'form-control' + (errors.paymentMethod && touched.paymentMethod ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="paymentMethod" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Validity</label>
                                                
                                            <Field name="validity" type="text" className={'form-control' + (errors.validity && touched.validity ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="validity" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Cvc Code</label>
                                                
                                            <Field name="cvcCode" type="text" className={'form-control' + (errors.cvcCode && touched.cvcCode ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="cvcCode" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        </Row>

                                <FormGroup row>
                                <Col md={12}>

                                    <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                    <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
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

            { pathEditView == 'view' && props.userList.success !== false && props.userList.response.docs.length == 1  && 
              <Formik initialValues={initialValues}>
                {({ values, errors, touched, isSubmitting, setFieldValue }) => {
                    console.log('values.status--',values.status);
                    let dobDate =values.dob ?  new Date('2013-08-03T02:00:00Z') : ''
                    if(dobDate !='')
                    {

                        let year    = dobDate.getFullYear();
                        let month   = dobDate.getMonth()+1;
                        let dt      = dobDate.getDate();
    
                        if (dt < 10) {
                        dt = '0' + dt;
                        }
    
                        if (month < 10) {
                        month = '0' + month;
                        }
                        values.dob = year+'-' + month + '-'+dt
    
    
                        console.log(year+'-' + month + '-'+dt);
                    }

                return (
                    <Form>

                        <h1>View Customer</h1>
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
                                                    <label><span style={{ color:'#605ca8'}}>Basic Information :</span></label>
                                                                                               
                                                </FormGroup>
                                            
                                            </Col>

                                            <Col lg={4}>
                                                <FormGroup>
                                                    <label>First Name</label>
                                                    <span name="firstName"  className='form-control  no-border'>
                                                        {values.firstName}
                                                    </span>
                                                                                               
                                                </FormGroup>
                                            
                                            </Col>
                                            

                                            <Col lg={4}>
                                            <FormGroup>
                                                    <label>Last Name</label>
                                                    <span name="lastName"  className='form-control  no-border'>
                                                        {values.firstName}
                                                    </span>
                                            </FormGroup>
                                        
                                            </Col>

                                            <Col lg={4}>
                                            <FormGroup>
                                                <label>Email</label>
                                                <span name="email"  className='form-control  no-border'>
                                                        {values.email}
                                                </span>
                                            </FormGroup>
                                            </Col>

                                            <Col lg={4}>
                                            <FormGroup>
                                                <label>Phone Number</label>
                                                <span name="phoneNumber"  className='form-control  no-border'>
                                                        {values.phoneNumber}
                                                </span>
                                                
                                    
                                            </FormGroup>
                                            </Col>


                                            
                                            <Col lg={4}>
                                            <FormGroup>
                                                <label>Role</label>
                                                <span name="role"  className='form-control  no-border'>
                                                        {values.role =='driver' ? 'Customer': values.role =='customer' ? 'Customer': ''}
                                                </span>
                                    
                                            </FormGroup>
                                            </Col>


                                            <Col lg={4}>
                                            <FormGroup>
                                                <label>DOB</label>
                                                <span name="dob"  className='form-control  no-border'>
                                                        {values.dob}
                                                </span>
                                            </FormGroup>
                                            </Col>

                                            <Col lg={4}>
                                            <FormGroup>
                                                <label>Gender</label>
                                                <span name="gender"  className='form-control  no-border'>
                                                        {values.gender}
                                                </span>
                                            </FormGroup>
                                            </Col>

                                            <Col lg={4}>
                                            <FormGroup>
                                                <label>Status</label>
                                                    <span name="status"  className='form-control  no-border'>
                                                            {values.status === true? 'Active' : 'DeActive'}
                                                    </span>
                                            </FormGroup>
                                            </Col>

                                            <FormGroup>
                                            <label>Profile Image</label>
                                            <div className="photo-upload">                   
                                            
                                                    {
                                                        values.imageSavedUrl && 
                                                        <img src={values.imageSavedUrl}  
                                                        style={{height:'150px', width:'150px', marginRight:'30px'}}
                                                        />                            
                                                    }
                                                    
                                            
                                            </div>
                                        </FormGroup>
                                        </Row>
                                        
                                        <Row>

                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Payment Information :</span></label>                                      
                                            </FormGroup>
                                        </Col>



                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Account Holder Name</label>
                                            <span name="accountHolderName"  className='form-control  no-border'>
                                                        {values.accountHolderName ? values.accountHolderName : 'N/A'}
                                                </span>
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Account Number</label>
                                            <span name="accountNumber"  className='form-control  no-border'>
                                                        {values.accountNumber ? values.accountNumber : 'N/A'}
                                                </span>
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>BankName</label>
                                            <span name="bankName"  className='form-control  no-border'>
                                                        {values.bankName ? values.bankName : 'N/A'}
                                                </span>
                                        </FormGroup>
                                        </Col>


                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Payment Method</label>
                                                
                                            <span name="paymentMethod"  className='form-control  no-border'>
                                                        {values.paymentMethod ? values.paymentMethod : 'N/A'}
                                                </span>
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Validity</label>
                                                
                                            <span name="validity"  className='form-control  no-border'>
                                                        {values.validity ? values.validity : 'N/A'}
                                                </span>
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Cvc Code</label>
                                                
                                            <span name="cvcCode"  className='form-control  no-border'>
                                                        {values.cvcCode ? values.cvcCode : 'N/A'}
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





            {/*   THIS PART FOR ADD  START   */}

            { isAddMode  && 
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, errors, touched, isSubmitting, setFieldValue }) => {

                return (
                    <Form>

                        <h1>{isAddMode ? 'Add Customer' : 'Edit Customer'}</h1>
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

                                        <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>

                                    </Col>
                                    </FormGroup>
                                    
                                    <Row>
                                        
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Basic Information :</span></label>
                                                                                            
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Field name="firstName"  
                                                     type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Field name="lastName"  
                                                     type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Email</label>
                                            <Field name="email"  type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Phone Number</label>
                                            <Field name="phoneNumber" type="text" className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                     
                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Role</label>
                                            <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                                        <option value="">Select an Option</option>
                                                        <option value="driver">Customer</option>
                                                        <option value="customer">Customer</option>
                                            </Field>                                            
                                            <ErrorMessage name="role" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>


                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>DOB</label>
                                            <div>
                                            <DatePicker
                                                    selected={dob}
                                                    onChange={(dt) => {
                                                    // console.log('dt----',dt);
                                                        setCounter(dt)
                                                        setFieldValue(`dob`,new Date(dt))
                                                    }}
                                                    dateFormat = 'yyyy-MM-dd'
                                                    isClearable
                                                    showYearDropdown
                                                    scrollableYearDropdown
                                            />
                                            </div>
                                            <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Gender</label>
                                            <Field name="gender" as="select" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')}>
                                                        <option value="">Select an Option</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Others">Others</option>
                                            </Field>                                            
                                            <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Status</label>
                                        
                                                <Field name="status" as="select" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')}>
                                                        <option value="true">Active</option>
                                                        <option value="false">DeActive</option>
                                                </Field>

                                                <ErrorMessage name="status" component="div" className="invalid-feedback" />

                                        </FormGroup>
                                        </Col>

                                        <FormGroup>
                                        <label>Profile Image</label>
                                        <div className="photo-upload">

                                            <input className="btn btn-warning btupload"  id="file" name="profileImage"  type="file" accept="image/*" onChange={(e) => {
                                                        // console.log('event.target.files[0]--',event.target.files[0]);
                                                        e.preventDefault();

                                                        let reader = new FileReader();
                                                        let file = e.target.files[0];
                                                    
                                                        reader.onloadend = () => {
                                                            console.log('reader.result---',reader.result);
                                                            
                                                            setFieldValue(`imagePreviewUrl`, reader.result)
                                                            setFieldValue(`profileImage`, file)
                                                            // this.setState({
                                                            // file: file,
                                                            // imagePreviewUrl: reader.result
                                                            // });
                                                        }
                                                    
                                                        reader.readAsDataURL(file)


                                                }} />
                    
                                        
                                        </div>
                                    </FormGroup>
                                        </Row>

                                       <Row>

                                        <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Payment Information :</span></label>                                      
                                            </FormGroup>
                                        </Col>



                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Account Holder Name</label>
                                                
                                            <Field name="accountHolderName" type="text" className={'form-control' + (errors.accountHolderName && touched.accountHolderName ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="accountHolderName" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Account Number</label>
                                            <Field name="accountNumber" type="text" className={'form-control' + (errors.accountNumber && touched.accountNumber ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="accountNumber" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>BankName</label>
                                                
                                            <Field name="bankName" type="text" className={'form-control' + (errors.bankName && touched.bankName ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="bankName" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Payment Method</label>
                                                
                                            <Field name="paymentMethod" type="text" className={'form-control' + (errors.paymentMethod && touched.paymentMethod ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="paymentMethod" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Validity</label>
                                                
                                            <Field name="validity" type="text" className={'form-control' + (errors.validity && touched.validity ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="validity" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>
                                        

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Cvc Code</label>
                                                
                                            <Field name="cvcCode" type="text" className={'form-control' + (errors.cvcCode && touched.cvcCode ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="cvcCode" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>

                                        </Row>
                                <Row>

                                    <Col lg={12}>
                                            <FormGroup>
                                                <label><span style={{ color:'#605ca8'}}>Password Information :</span></label>                                      
                                            </FormGroup>
                                        </Col>
                                    <Col lg={6}>
                                    <FormGroup>
                                        <label>Password</label>

                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />

                                    </FormGroup>
                                    </Col>

                                     <Col lg={6}>
                                    <FormGroup>
                                        <label>Confirm Password</label>
                                       
                                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                            
                                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup row>
                                <Col md={12}>

                                    <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                    <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
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
            {/*   THIS PART FOR ADD  END   */}




            {/*   THIS PART FOR DELETE  START   */}

            { pathEditView == 'delete' && props.userList.success !== false && props.userList.response.docs.length == 1  && 
        
               <div className="modal show" id="modal-form-delete">
                            <input type="hidden" name="deleteId" ></input>

                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <Link to={'/driver'}>

                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    </Link>
                                        <h4 className="modal-title" id="myModalLabel"></h4>
                                    </div>
                                    <div className="modal-body">

                                            <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group" >
                                                            <label >Are You Sure You want to delete ?</label>
                                                        </div>
                                
                                                    </div>
                                                </div>                        

                                    </div>
                                    <div className="modal-footer">

                                                <Link to={'/driver'} className="btn btn-link">

                                                    <button type="button" className="btn btn-default" id="close-delete-button-model"
                                                        data-dismiss="modal">Close</button>

                                                </Link>
                                            
                                                    <button type="submit" className="btn btn-primary" onClick = { () => { onDeleteCustomer(id) } }
                                                >Delete</button>

                                    </div>
                                </div>
                            </div>
                            </div> 
            }

            {/*   THIS PART FOR DELETE  START   */}

        </Row>
        </div>
        
        <Footer />
    </div>
    );    


}

const mapStateToProps = ({adminReducer}) => ({
    userList    : adminReducer.userList,
    isSuccess   : adminReducer.isSuccess,
    message     : adminReducer.message,
    ismailsend  : adminReducer.ismailsend,
    sendmailmessage  : adminReducer.sendmailmessage,
    isloading   : adminReducer.isloading
})

export default connect(mapStateToProps, { postSendEmail, postAddUser, postEditUser, postDeleteUser, fetchUser })(CustomerForm)
