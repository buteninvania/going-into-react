import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../commons/FormsControls/FormsControls";
import {requiredField} from "../../Utils/Validation/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auths-reduser";
import {Redirect} from "react-router-dom";
import f from "./../commons/FormsControls/FormsControls.module.css"



const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField("email", [requiredField], Input,"Email")}
            {createField("password", [requiredField], Input,"Password", "password")}
            {createField("rememberMe", "", Input,"", "checkbox", "remember me")}

            {props.captcha && <img src={props.captcha}/> }
            {props.captcha && createField("captcha", [requiredField], Input,"Symbols")}

            { props.error && <div className={f.formSummaryError}>{props.error}</div>}
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login',})(LoginForm);


const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }
debugger;
    return <div>
        <h1>Login</h1>
        <LoginReduxForm captcha={props.captchaUrl} onSubmit={onSubmit} />
    </div>
}

let mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login,logout})(Login);