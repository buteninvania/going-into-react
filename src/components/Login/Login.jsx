import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../commons/FormsControls/FormsControls";
import {requiredField} from "../../Utils/Validation/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auths-reduser";
import {Redirect} from "react-router-dom";



const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} validate={[requiredField]} component={Input} placeholder={"Email"}/>
            </div>
            <div>
                <Field name={"password"} type={"password"} validate={[requiredField]} component={Input}  placeholder={"Password"}/>
            </div>
            <div>
                <Field  component={Input}  name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login',})(LoginForm);


const Login = (props) => {

    const onSubmit = (formData) => {
        debugger;
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login,logout})(Login);