
import React, { Fragment, useEffect } from 'react'
import { Link , Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import { baseUrl, localUrl } from '../../shared/baseUrl'

import DriverForm from './DriverForm'
import { postDeleteUser } from '../../actions/admin'

const Driver = (props) => {

    console.log('admin props --->',props.status);

    return ( 
                    <tr >
                        <td >
                            <img style= {{ height: '50px', width: '50px'}} src={baseUrl+props.profileImage} />   
                        </td>
                        <td >{props.firstName}</td>  
                        <td >{props.lastName}</td>  
                        <td>{props.gender}</td>
                        <td>{props.email}</td>
                        <td>{props.role}</td>
                        <td>{props.status === true ? 'Active':'DeActive'}</td>
                        
                         <td className="text-center">
                                <Link className="view" title="View" style={{marginRight:'5px'}} to= {{ pathname: `/driver/view/${props._id}` }}  >
                                    <i className="fa fa-eye"></i>
                                </Link>

                                <Link className="view" title="Edit" style={{marginRight:'5px'}} to= {{ pathname: `/driver/edit/${props._id}` }}  >
                                    <i className="fa fa-edit"></i>
                                </Link>

                                <Link className="view" title="Delete" to= {{ pathname: `/driver/delete/${props._id}` }}  >
                                    <i className="fa fa-trash" ></i>
                                </Link>
                        </td> 
                    </tr>
               )
    }
    export default connect(null, { postDeleteUser })(Driver)

//export default Driver