
import React, { Component } from 'react'
import { runInThisContext } from 'vm';
import { Link, NavLink } from 'react-router-dom'
import {  getToken } from '../../actions/admin'
import { baseUrl, localUrl } from '../../shared/baseUrl'

class Menu extends Component 
{

    render(){
        const { name, profileImage } = JSON.parse(getToken())

        return (
                    <aside className="main-sidebar">
                    <div className="sidebar" >
        
                        <div className="user-panel">
        
                            <div className="pull-left image">
                                <img src={baseUrl+profileImage} className="img-circle" alt="Admin Image" style={{height : '50px'}} />
                            </div>
        
                            <div className="pull-left info">
                                <p>{name}</p>
                                
                            </div>
                        </div>
        
        
                        <ul className="sidebar-menu"  style= {{ float:"left"}}>
                                            
                            <li className="treeview">
                            <NavLink
                                        to="/admin"
                                        activeStyle={{
                                        background:'black',
                                        color:'white'
                                        }} 
                                        style={{paddingRight:"43px"}}
                                        >
                                   
                                        <i className="fa fa-cubes"></i> <span>Admin Management</span>
                                        <span className="pull-right-container">
                                        </span>
                                  
                            </NavLink>                                    
                            </li> 
                            
                            <li className="treeview">
                            <NavLink
                                        to="/driver"
                                        activeStyle={{
                                        background:'black',
                                        color:'white'
                                        }}  
                                        style={{paddingRight:"54px"}}
                                        >
                                   
                                        <i className="fa fa-truck"></i> <span>Driver Management </span>
                                        <span className="pull-right-container">
                                        </span>
                                  
                            </NavLink>    
                            </li>                                               
                                    
                            <li className="treeview">
                            <NavLink
                                        to="/customer"
                                        activeStyle={{
                                        background:'black',
                                        color:'white'
                                        }}  
                                        style={{paddingRight:"31px"}}
                                        >
                                   
                                        <i className="fa fa-user-plus"></i> <span>Customer Management </span>
                                        <span className="pull-right-container">
                                        </span>
                                  
                            </NavLink>    
                            </li>  

                            <li className="treeview">
                            <NavLink
                                        to="/booking"
                                        activeStyle={{
                                        background:'black',
                                        color:'white'
                                        }}  
                                        style={{paddingRight:"42px"}}
                                        >
                                   
                                        <i className="fa fa-cart-arrow-down"></i> <span>Booking Management </span>
                                        <span className="pull-right-container">
                                        </span>
                                  
                            </NavLink>    
                            </li>  
                            <li className="treeview">
                                <NavLink
                                            to="/term/"
                                            activeStyle={{
                                            background:'black',
                                            color:'white'
                                            }}  
                                            style={{paddingRight:"62px"}}
                                            >
                                    
                                            <i className="fa fa-exclamation-circle"></i> <span>Term Management </span>
                                            <span className="pull-right-container">
                                            </span>
                                    
                                </NavLink>    
                            </li>  
                                                                
                            <li className="treeview">
                                <NavLink
                                            to="/privacy/"
                                            activeStyle={{
                                            background:'black',
                                            color:'white'
                                            }}  
                                            style={{paddingRight:"50px"}}
                                            >
                                    
                                            <i className="fa fa-exclamation-triangle"></i> <span>Privacy Management </span>
                                            <span className="pull-right-container">
                                            </span>
                                    
                                </NavLink>    
                            </li> 
                                      
                            <li className="treeview">
                                <NavLink
                                            to="/aboutus/"
                                            activeStyle={{
                                            background:'black',
                                            color:'white'
                                            }}  
                                            style={{paddingRight:"33px"}}
                                            >
                                    
                                            <i className="fa fa-plus-square-o"></i> <span>About Us Management </span>
                                            <span className="pull-right-container">
                                            </span>
                                    
                                </NavLink>    
                            </li> 
                        </ul>
                        </div>
                    </aside>
            )
        }
}

export default Menu