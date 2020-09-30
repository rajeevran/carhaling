import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login/LoginForm'
import AdminList from './components/admin/AdminList'
import AdminForm from './components/admin/AdminForm'

import DriverList from './components/driver/DriverList'
import DriverForm from './components/driver/DriverForm'

import CustomerList from './components/customer/CustomerList'
import CustomerForm from './components/customer/CustomerForm'

import TermList from './components/terms/TermList'
import TermForm from './components/terms/TermForm'

import PrivacyList from './components/privacy/PrivacyList'
import PrivacyForm from './components/privacy/PrivacyForm'


import BookingList from './components/booking/BookingList'
import BookingForm from './components/booking/BookingForm'

import AboutusList from './components/aboutus/AboutusList'
import AboutusForm from './components/aboutus/AboutusForm'

import ChangePassword from './components/admin/ChangePassword'

import Dashboard from './components/dashboard/Dashboard'

import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Footer from './components/footer/Footer'

import { getToken } from './actions/admin'
import { Switch, Redirect,  Route } from 'react-router-dom';




function SecuredPath(props){

      const authentication ={
            isAuthenticated : getToken() !== null ? JSON.parse(getToken()).isAuthenticated: false
      }
      
      console.log('JSON.parse(getToken())---',JSON.parse(getToken()))

      console.log('authentication.isAuthenticated--',authentication.isAuthenticated)

      return (
            <Route path={props.path} render = { data => 
                  authentication.isAuthenticated ? 
                  (
                        <props.component {...data}>
                              
                        </props.component>
                  )
                  :
                  (
                        <Redirect to="/login"  />
                  )
                  }>

            </Route>
      )
}


function App() {
                  console.log('getToken----',getToken());
                  console.log('window.location.href----',window.location.href);
                  var lastIndex = window.location.href.lastIndexOf("/")

                  var urlPath = window.location.href.substring(lastIndex + 1); //after this urlPath="true"
                  console.log('path----',urlPath);

                  let isAuthenticated = getToken() !== null ? JSON.parse(getToken()).isAuthenticated: false
                  return (
                              
                              <div className="App">

                                    <Switch>
                                          {/* <Route exact path="/" render={ () => {
                                                      return (
                                                            isAuthenticated === false ?
                                                            <Redirect to="/login" /> :
                                                            <Redirect to="/dashboard" /> 
                                                      )
                                                }}
                                          /> */}
                                          <SecuredPath path="/dashboard" exact component={() => { return <Dashboard />}} />
                                          <Route path="/" exact component={() => { return <LoginForm />}} /> 
                                          <Route path="/login" exact component={() => { return <LoginForm />}} /> 
                                          
                                          <SecuredPath path="/admin" exact component={() => { return <AdminList />}} /> 
                                          <SecuredPath path='/admin/view/:id' exact component={AdminForm} />    
                                          <SecuredPath path='/admin/edit/:id' exact component={AdminForm} />    
                                          <SecuredPath path='/admin/add' exact component={AdminForm} />    
                                          <SecuredPath path="/admin/delete/:id" exact component={AdminForm} />

                                          <SecuredPath path="/changepassword" exact component={() => { return <ChangePassword />}} /> 

                                          
                                          
                                          <SecuredPath path="/driver" exact component={() => { return <DriverList />}} /> 
                                          <SecuredPath path='/driver/view/:id' component={DriverForm} />    
                                          <SecuredPath path='/driver/edit/:id' component={DriverForm} />    
                                          <SecuredPath path='/driver/add' component={DriverForm} />    
                                          <SecuredPath path="/driver/delete/:id" component={DriverForm} />
                                          
                                          <SecuredPath path="/customer" exact component={() => { return <CustomerList />}} /> 
                                          <SecuredPath path='/customer/view/:id' component={CustomerForm} />    
                                          <SecuredPath path='/customer/edit/:id' component={CustomerForm} />    
                                          <SecuredPath path='/customer/add' component={CustomerForm} />    
                                          <SecuredPath path="/customer/delete/:id" component={CustomerForm} />


                                          <SecuredPath path="/term/" exact component={() => { return <TermList />}} /> 
                                          <SecuredPath path="/term/edit/:id" exact component={() => { return <TermForm />}} /> 
                                            
                                          <SecuredPath path="/privacy/" exact component={() => { return <PrivacyList />}} /> 
                                          <SecuredPath path="/privacy/edit/:id" exact component={() => { return <PrivacyForm />}} /> 
                                            
                                          <SecuredPath path="/booking/" exact component={() => { return <BookingList />}} /> 
                                          <SecuredPath path="/booking/edit/:id" exact component={() => { return <BookingForm />}} /> 
                                          <SecuredPath path="/booking/view/:id" exact component={() => { return <BookingForm />}} /> 
                                            

                                          <SecuredPath path="/aboutus/" exact component={() => { return <AboutusList />}} /> 
                                          <SecuredPath path="/aboutus/edit/:id" exact component={() => { return <AboutusForm />}} /> 
                                            
                                    </Switch>
                                    <Footer />
                              </div>
                             
                  );
}

export default App;
