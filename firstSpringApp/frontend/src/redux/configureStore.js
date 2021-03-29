import { createStore,applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import { setAuthorizationHeader } from "../api/apiCalls";

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const avcAuth = secureLs.get('avc-auth');
    let stateInLocalStorage = {
        isLoggedIn : false,
        username: undefined,
        displayName: undefined,
        email: undefined,
        image: undefined,
        password: undefined
    };

    if(avcAuth) {
        return avcAuth;
    }
    return stateInLocalStorage;
};

const updateStateInStorage = newState => {
    secureLs.set('avc-auth', newState);
}

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    
    store.subscribe(()=>{
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })
    return store;
}

export default configureStore;