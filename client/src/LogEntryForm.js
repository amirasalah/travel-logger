import React from 'react'
import { useForm } from 'react-hook-form'

const LogEntryForm = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = data => console.log(data)
    return (
        <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='apiKey'>API KEY</label>
            <input type='password' name='apiKey' required ref={register} />
            <label htmlFor='title'>Title</label>
            <input name='title' required ref={register} />
            <label htmlFor='comments'>Comments</label>
            <textarea name='comments' rows={3} ref={register}></textarea>
            <label htmlFor='description'>Description</label>
            <textarea name='description' rows={3} ref={register}></textarea>
            <label htmlFor='image'>Image</label>
            <input name='image' ref={register} />
            <label htmlFor='visitDate'>Visit Date</label>
            <input name='visitDate' type='date' required ref={register} />
            <button type='submit'>Add new Location</button>
        </form>
    )
}
export default LogEntryForm
