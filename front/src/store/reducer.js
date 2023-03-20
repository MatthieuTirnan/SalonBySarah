import {combineReducers} from "redux";
import prestationSlice from "./slices/prestation.js";

import listUsersSlice from "./slices/listUserSlice.js";
import userSlice from "./slices/userSlice.js";

//import reducer from 'chemin/reducer'


const rootReducer = combineReducers({
    //nomDuState: reducer
    user: userSlice,
    prestation: prestationSlice,
    listUsers: listUsersSlice,

})


export default rootReducer