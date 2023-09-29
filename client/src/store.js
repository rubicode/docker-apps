import { legacy_createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import rootReducer from '../src/reducers'

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))