import React, { useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from "react-redux";
import { signupHandler } from "../redux/authActions";

const UserSignupPage = (props) => {
    
    const [form, setForm] = useState({
        username: null,
        displayName: null,
        email: null,
        password: null,
        passwordRepeat: null,
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const onChange = (event) => {
        const {value, name} = event.target;
        
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
        setForm((previousForm) => ({...previousForm, [name]: value}));
    };
    const onClickedSignUp = async (event) => {
        event.preventDefault();
        
        const {history} = props;
        const {push} = history;

        const {username, displayName, email, password} = form;

        const body = {
           username,
           displayName,
           email,
           password
        };
        try {
            await dispatch(signupHandler(body));
            push('/');
        } catch(error) {
            if(error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    };
    const {username: usernameError, displayName: displayNameError, email: emailError, password: passwordError} = errors;
    
    const {t} = useTranslation();
    
    const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');
    const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('Password mismatch');
    }
    return(
        <div className="container">
            <h1 className="text-center">{t('Sign Up')}</h1>
            <form>
                <Input name="username" label={t("Username")} error={usernameError} onChange={onChange} />
                <Input name="displayName" label={t("Display Name")} error={displayNameError} onChange={onChange} />
                <Input name="email" label={t("Email")} error={emailError} onChange={onChange} />
                <Input name="password" label={t("Password")} error={passwordError} onChange={onChange} type="password" />
                <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeatError} onChange={onChange} type="password" />
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickedSignUp}
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        pendingApiCall={pendingApiCall}
                        text={t('Sign Up')}
                    />
                </div>
            </form>
        </div>
    );
}

export default UserSignupPage;