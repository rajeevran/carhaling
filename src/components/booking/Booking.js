
import React, { Fragment, useEffect } from 'react'
import { Link , Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import { baseUrl, localUrl } from '../../shared/baseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingForm from './BookingForm'

const Booking = (props) => {

    console.log('admin props --->',props.status);

    return ( 
                    <tr >
                        <td >
                            {props.bookingNumber}   
                        </td>
                        <td >
                        {
                            Intl.DateTimeFormat('en-US',{
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit' }).format(new Date(props.pickupDate))

                        }
                        </td>  
                        <td >
                        {
                            Intl.DateTimeFormat('en-US',{
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit' }).format(new Date(props.dropDate))

                        }
                        </td>  
                        <td>{ props.customerId !== null ? `${props.customerId.firstName} ${props.customerId.lastName} `: '' }</td>
                        <td>{ props.driverId ? `${props.driverId.firstName} ${props.driverId.lastName}     `: '' }</td>
                        <td>{props.driverStatus}</td>
                        <td>
                        {props.deliveryStatus == 'delivered' ?
                         <span class="btn-smbadge badge bg-green">Delivered</span> :
                         <span class="btn-smbadge badge bg-yellow">{props.deliveryStatus}</span> }
                        </td>
                        
                         <td className="text-center">
                                <Link className="view" title="View" style={{marginRight:'5px'}} to= {{ pathname: `/booking/view/${props._id}` }}  >
                                    <i className="fa fa-eye"></i>
                                </Link>
                                {props.deliveryStatus !== 'delivered' ?
                                <Link disabled className="view" title="Edit" style={{marginRight:'5px'}} to= {{ pathname: `/booking/edit/${props._id}` }}  >
                                   <i  className="fa fa-edit"></i>
                                </Link>

                                 :
                                 <Link onClick={e => e.preventDefault()} >
                                   <i  className="fa fa-edit"></i>
                                </Link>
                             }
                        </td> 
                    </tr>
               )
    }
    export default connect(null, {  })(Booking)

//export default Booking