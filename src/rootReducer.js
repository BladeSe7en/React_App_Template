import { combineReducers }     from 'redux';
import HomeReducer             from './components/Home/HomeReducer';


const rootReducer = combineReducers({
    Home            : HomeReducer

});

export default rootReducer; 
