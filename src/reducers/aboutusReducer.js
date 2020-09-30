

import {
    
    FETCH_ABOUTUS_LIST_START,
    FETCH_ABOUTUS_LIST_SUCCESS,
    FETCH_ABOUTUS_LIST_FAILURE,

    POST_ABOUTUS_EDIT_START,
    POST_ABOUTUS_EDIT_SUCCESS,
    POST_ABOUTUS_EDIT_FAILURE,


} from  '../actions/aboutus'


const initialState = {
    aboutuslist:{ success: false ,STATUSCODE:2000, error: false , response : {docs:[]}},
    isSuccess:false,
    isloading:false
}

export default( state=initialState, action) =>{

    const newState = {...state}

    switch(action.type){
        
        case FETCH_ABOUTUS_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_ABOUTUS_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                aboutuslist:action.payload
            };
        case FETCH_ABOUTUS_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };

        case POST_ABOUTUS_EDIT_START:
            return {
                ...state,
                isSuccess:false,
                isloading:true
            };
        case POST_ABOUTUS_EDIT_SUCCESS:
            return {
                ...state,
                isSuccess:true,
                isloading:false,
            };
        case POST_ABOUTUS_EDIT_FAILURE:
            return {
                ...state,
                isSuccess:false,
                isloading:false
            };                      

        default :
            return state
    }
    //console.log(newState);
    
    
}
