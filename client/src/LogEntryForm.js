import React from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntry } from './apis'

const LogEntryForm = ({ location, onClose }) => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const onSubmit = async data => {
        try {
            setLoading(true)
            data.latitude = location.latitude
            data.longitude = location.longitude
            await createLogEntry(data)
            onClose()
        } catch (error) {
            console.error(error)
            setError(error.message)
            setLoading(false)
        }
    }
    return (
        <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
            {error && <h3 className='error'>{error}</h3>}
            <label htmlFor='title'>Title</label>
            <input name='title' required ref={register} />
            <label htmlFor='description'>Description</label>
            <textarea name='description' rows={3} ref={register}></textarea>
            <label htmlFor='image'>Image</label>
            <input name='image' ref={register} />
            <label htmlFor='visitDate'>Visit Date</label>
            <input name='visitDate' type='date' required ref={register} />
            <button disabled={loading}>
                {loading ? 'Loading...' : 'Create Entry'}
            </button>
        </form>
    )
}
export default LogEntryForm
