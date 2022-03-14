import {createStore,combineReducers,applyMiddleware} from 'redux'
import userReducer from '../reducers/userReducer'
import thunk from 'redux-thunk'
import taskListReducer from '../reducers/taskListReducer'
const configureStore=()=>{
    const store = createStore(combineReducers({
        user:userReducer,
        taskList:taskListReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore