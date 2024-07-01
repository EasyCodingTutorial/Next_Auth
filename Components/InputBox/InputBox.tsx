import React from 'react'

import styles from './InputBox.module.css'


interface InputBoxProps {
    labelText: string,
    id: string,
    InputType: "email" | "password" | "text",
    value: string,
    Required?: boolean,
    onChange?: any,
}


export const InputBox = (
    {
        labelText, id, InputType, value, onChange, Required
    }: InputBoxProps
) => {
    return (
        <div className={styles.InputBox}>
            <label htmlFor={id}>{labelText}</label><br />
            <input id={id} type={InputType} required={Required} value={value} onChange={onChange} />
        </div>
    )
}
