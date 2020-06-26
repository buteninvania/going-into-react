import React from "react"
import {Field, WrappedFieldProps, WrappedFieldMetaProps} from "redux-form"
import {FieldValidatorType} from "../../../Utils/Validation/validators"
import f from "./FormsControls.module.css"

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={f.formControl + " " + (hasError ? f.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<FormsKeysType extends string>(name: FormsKeysType, validate: Array<FieldValidatorType> | "", component: React.FC<WrappedFieldProps>, placeholder: string | undefined, props = {}, text = "") {
    return <div>
        <Field
            name={name}
            validate={validate}
            component={component}
            placeholder={placeholder}
            {...props}
        /> {text}
    </div>
}

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
export type GetStringKeysType<T> = Extract<keyof T, string>