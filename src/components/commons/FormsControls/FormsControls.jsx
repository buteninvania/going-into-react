import React from "react";
import f from "./FormsControls.module.css"
import {Field} from "redux-form";

const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={f.formControl + " " + (hasError ? f.error : "")}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (name, validate, component, placeholder, type="null", text="") => (
    <div>
        <Field name={name} validate={validate} component={component} placeholder={placeholder} type={type}/>{text}
    </div>

)