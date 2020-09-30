

import {
    
    FETCH_BOOKING_LIST_START,
    FETCH_BOOKING_LIST_SUCCESS,
    FETCH_BOOKING_LIST_FAILURE,

    POST_BOOKING_EDIT_START,
    POST_BOOKING_EDIT_SUCCESS,
    POST_BOOKING_EDIT_FAILURE,

    FETCH_DRIVER_LIST_START,
    FETCH_DRIVER_LIST_SUCCESS,
    FETCH_DRIVER_LIST_FAILURE,

    FETCH_CUSTOMER_LIST_START,
    FETCH_CUSTOMER_LIST_SUCCESS,
    FETCH_CUSTOMER_LIST_FAILURE,
} from  '../actions/booking'


const initialState = {
    bookinglist : { success: false ,STATUSCODE:2000, error: false , response : {docs:[]} },
    driverlist  : { success: false ,STATUSCODE:2000, error: false , response : {docs:[]} },
    customerlist  : { success: false ,STATUSCODE:2000, error: false , response : {docs:[]} },
    isSuccess:false,
    isloading:false
}

export default( state=initialState, action) =>{

    const newState = {...state}

    switch(action.type){
        
        case FETCH_BOOKING_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_BOOKING_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                bookinglist:action.payload
            };
        case FETCH_BOOKING_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };

        case POST_BOOKING_EDIT_START:
            return {
                ...state,
                isSuccess:false,
                isloading:true
            };
        case POST_BOOKING_EDIT_SUCCESS:
            return {
                ...state,
                isSuccess:true,
                isloading:false,
            };
        case POST_BOOKING_EDIT_FAILURE:
            return {
                ...state,
                isSuccess:false,
                isloading:false
            };                      
            
        case FETCH_DRIVER_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_DRIVER_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                driverlist:action.payload
            };
        case FETCH_DRIVER_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };
        case FETCH_CUSTOMER_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_CUSTOMER_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                customerlist:action.payload
            };
        case FETCH_CUSTOMER_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };
        default :
            return state
    }
    //console.log(newState);
    
    
}
