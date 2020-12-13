import React from 'react'
import { useForm } from 'react-hook-form'

const InputField = ({...props}) => {
    const { register } = useForm()

    return (
        <input
            {...props}
            ref={register}
            className='my-3 p-4 border-solid border-2 border-light-blue-500'
        />
    )
}
export default InputField
