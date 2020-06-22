import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input,} from "../commons/FormsControls/FormsControls";
import {requiredField} from "../../Utils/Validation/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auths-reduser";
import {Redirect} from "react-router-dom";
import f from "./../commons/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captcha: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, captcha, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeysType>("email", [requiredField], Input,"Email")}
            {createField<LoginFormValuesKeysType>("password", [requiredField], Input,"Password", {type:"password"})}
            {createField<LoginFormValuesKeysType>("rememberMe", "", Input,"", {type:"checkbox"}, "remember me")}

            {captcha && <img src={captcha}/> }
            {captcha && createField<LoginFormValuesKeysType>("captcha", [requiredField], Input,"Symbols")}

            { error && <div className={f.formSummaryError}>{error}</div>}
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login',})(LoginForm);

type MapStateToPropsType = {
    captchaUrl: string | null,
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesKeysType = keyof LoginFormValuesType

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm captcha={props.captchaUrl} onSubmit={onSubmit} />
    </div>
}
let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps,{login})(Login);