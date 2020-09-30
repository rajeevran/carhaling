import axios from 'axios'
import { type } from 'os';
import { baseUrl, localUrl } from '../shared/baseUrl'
import { getToken } from './admin'


export const FETCH_BOOKING_LIST_START = 'FETCH_BOOKING_LIST_START'
export const FETCH_BOOKING_LIST_SUCCESS = 'FETCH_BOOKING_LIST_SUCCESS'
export const FETCH_BOOKING_LIST_FAILURE = 'FETCH_BOOKING_LIST_FAILURE'

export const POST_BOOKING_ADD_START = 'POST_BOOKING_ADD_START'
export const POST_BOOKING_ADD_SUCCESS = 'POST_BOOKING_ADD_SUCCESS'
export const POST_BOOKING_ADD_FAILURE = 'POST_BOOKING_ADD_FAILURE'

export const POST_BOOKING_EDIT_START = 'POST_BOOKING_EDIT_START'
export const POST_BOOKING_EDIT_SUCCESS = 'POST_BOOKING_EDIT_SUCCESS'
export const POST_BOOKING_EDIT_FAILURE = 'POST_BOOKING_EDIT_FAILURE'

export const POST_BOOKING_DELETE_START = 'POST_BOOKING_DELETE_START'
export const POST_BOOKING_DELETE_SUCCESS = 'POST_BOOKING_DELETE_SUCCESS'
export const POST_BOOKING_DELETE_FAILURE = 'POST_BOOKING_DELETE_FAILURE'

export const FETCH_DRIVER_LIST_START = 'FETCH_DRIVER_LIST_START'
export const FETCH_DRIVER_LIST_SUCCESS = 'FETCH_DRIVER_LIST_SUCCESS'
export const FETCH_DRIVER_LIST_FAILURE = 'FETCH_DRIVER_LIST_FAILURE'

export const FETCH_CUSTOMER_LIST_START = 'FETCH_CUSTOMER_LIST_START'
export const FETCH_CUSTOMER_LIST_SUCCESS = 'FETCH_CUSTOMER_LIST_SUCCESS'
export const FETCH_CUSTOMER_LIST_FAILURE = 'FETCH_CUSTOMER_LIST_FAILURE'

//...................BOOKING ...............................

    export const postEditBooking = postData => dispatch =>{

    dispatch( {type:'POST_BOOKING_EDIT_START'} )

    console.log('Post  edit data--->', postData);
    let token = JSON.parse(getToken()).token

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-access-token': token
    }

    const formData = new FormData();
    for (const key in postData) {
    formData.append(key, postData[key]);
    }

    axios
    .post(baseUrl+'admin/editBooking/',formData, {
        headers: headers
        })
    .then(res =>{
        console.log(res)
        dispatch( { type:'POST_BOOKING_EDIT_SUCCESS', payload: res.data } )
    })
    .catch(err => {
        console.log(err.response)
        dispatch( { type:'POST_BOOKING_EDIT_FAILURE', payload: err.response  } )
        
    })
    }

    export const fetchBooking = (id,page,limit,searchName) => {

    let token = JSON.parse(getToken()).token
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token
        }
    return (dispatch) => {
        dispatch(fetchBookingRequest())

        axios
        .get(baseUrl+'api/listBooking/', {
            headers: headers,
            params:{
                ...(id ? { bookingId: id } : {}),
                ...(searchName ? { searchName: searchName } : {}),
                ...(page ? { page: page } : {}),
                ...(limit ? { limit: limit } : {})
            }
            })
        .then(res =>{
            console.log('Response-------->',res)
            dispatch(fetchBookingSuccess(res.data))

        })
        .catch(err => {
            console.log(err.response)
            dispatch(fetchBookingFailure(err.message))
        })
    }
    }

    export const fetchBookingRequest = () => {
    return {
        type: FETCH_BOOKING_LIST_START
    }
    }

    export const fetchBookingSuccess = booking => {
    return {
        type: FETCH_BOOKING_LIST_SUCCESS,
        payload: booking
    }
    }

    export const fetchBookingFailure = err => {
    return {
        type: FETCH_BOOKING_LIST_FAILURE,
        payload: err
    }
    }


    export const fetchDriver = (id) => dispatch =>{

        console.log('LOGIN auth data--->', JSON.parse(getToken()).token);
        let token = JSON.parse(getToken()).token
    
        dispatch( {type:'FETCH_DRIVER_LIST_START'} )
    
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
          
        axios
        .get(baseUrl+'admin/listDriver/', {
            headers: headers,
            params:{
                ...(id ? { driverId: id } : {})
            }
            })
        .then(res =>{
            console.log(res)
            dispatch( { type:'FETCH_DRIVER_LIST_SUCCESS', payload: res.data } )
        })
        .catch(err => {
            console.log(err.response)
            dispatch( { type:'FETCH_DRIVER_LIST_FAILURE', payload: err.response  } )
            
        })
    }

    export const fetchCustomer = (id) => dispatch =>{

        console.log('LOGIN auth data--->', JSON.parse(getToken()).token);
        let token = JSON.parse(getToken()).token
    
        dispatch( {type:'FETCH_CUSTOMER_LIST_START'} )
    
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token
          }
          
        axios
        .get(baseUrl+'admin/listCustomer/', {
            headers: headers,
            params:{
                ...(id ? { customerId: id } : {})
            }
            })
        .then(res =>{
            console.log(res)
            dispatch( { type:'FETCH_CUSTOMER_LIST_SUCCESS', payload: res.data } )
        })
        .catch(err => {
            console.log(err.response)
            dispatch( { type:'FETCH_CUSTOMER_LIST_FAILURE', payload: err.response  } )
            
        })
    }


