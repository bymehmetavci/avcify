import { createStore,applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const avcAuth = secureLs.get('avc-auth'); //localStorage.getItem('avc-auth');
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
        /*try {
            stateInLocalStorage = JSON.parse(avcAuth);
        } catch(error) {} */
    }
    return stateInLocalStorage;
};

const updateStateInStorage = newState => {
    secureLs.set('avc-auth', newState);
    //localStorage.setItem('avc-auth', JSON.stringify(newState));
}

const configureStore = () => {
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ==> Chrome Redux Dev Tool
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(()=>{
        updateStateInStorage(store.getState());
    })
    return store;
}

export default configureStore;