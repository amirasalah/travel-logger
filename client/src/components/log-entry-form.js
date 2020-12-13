import React from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntry } from '../apis'
import { useHistory } from 'react-router-dom'
import { EditContext } from '../context/selectPointContext'
import moment from 'moment'

const LogEntryForm = ({ reloadMap }) => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const editedPoint = React.useContext(EditContext)
    const history = useHistory()
    const onSubmit = async data => {
        try {
            setLoading(true)
            await createLogEntry(data)
            history.push('/')
            reloadMap()
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    const { description, image, latitude, longitude, title, visitDate } =
        editedPoint || {}
    const date = moment(visitDate).format('YYYY-MM-DD')
    console.log(editedPoint)
    console.log(date)
    return (
        <main className='container mx-auto'>
            <form
                className='flex flex-col w-6/12 mx-auto'
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && <h3 className='error'>{error}</h3>}
                {editedPoint === null ? (
                    <input
                        placeholder='Password'
                        className='my-3 p-4 border-solid border-2 border-light-blue-500'
                        type='password'
                        name='password'
                        required
                        ref={register}
                    />
                ) : null}
                <input
                    placeholder='Title'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='title'
                    required
                    value={title || ''}
                    ref={register}
                />
                <input
                    placeholder='Latitude'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='latitude'
                    required
                    value={latitude || ''}
                    ref={register}
                />
                <input
                    placeholder='Longitude'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='longitude'
                    required
                    value={longitude || ''}
                    ref={register}
                />
                <textarea
                    placeholder='Description'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='description'
                    rows={3}
                    value={description || ''}
                    ref={register}
                ></textarea>
                <input
                    placeholder='Image Url'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='image'
                    value={image || ''}
                    ref={register}
                />
                <input
                    placeholder='Visit Date'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='visitDate'
                    type='date'
                    required
                    value={date || ''}
                    ref={register}
                />
                <button
                    className='rounded-none my-8 mx-auto px-20 text-blue-900 h-20 max-w-xs ring-4 ring-blue-100'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Create Entry'}
                </button>
            </form>
        </main>
    )
}
export default LogEntryForm
