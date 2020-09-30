
import { combineReducers } from 'redux'

import adminReducer from './adminReducer'
import privacyReducer from './privacyReducer'
import termReducer from './termReducer'
import aboutusReducer from './aboutusReducer'
import bookingReducer from './bookingReducer'


export default combineReducers ({

        adminReducer,
        privacyReducer,
        termReducer,
        aboutusReducer,
        bookingReducer


})