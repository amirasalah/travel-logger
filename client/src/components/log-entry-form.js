import React from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntry } from '../apis'
import { useHistory } from 'react-router-dom'
import { EditContext } from '../context/selectPointContext'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import InputField from './inputField'

const LogEntryForm = ({ reloadMap }) => {
    const { handleSubmit, register } = useForm()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    let location = useLocation()
    console.log(location.pathname)
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
    return (
        <main className='container mx-auto'>
            <form
                className='flex flex-col w-6/12 mx-auto'
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && <h3 className='error'>{error}</h3>}
                {location.pathname === '/new' && (
                    <InputField
                        placeholder='Password'
                        name='password'
                        type='password'
                        required={true}
                    />
                )}
                <InputField
                    placeholder='Title'
                    name='title'
                    defaultValue={title || ''}
                    required={true}
                />
                <InputField
                    placeholder='Latitude'
                    name='latitude'
                    defaultValue={latitude || ''}
                    required={true}
                />
                <InputField
                    placeholder='Longitude'
                    name='longitude'
                    defaultValue={longitude || ''}
                    required={true}
                />
                <textarea
                    placeholder='Description'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='description'
                    rows={3}
                    defaultValue={description || ''}
                    ref={register}
                ></textarea>

                <InputField
                    placeholder='Image Url'
                    name='image'
                    defaultValue={image || ''}
                />
                <InputField
                    placeholder='Visit Date'
                    name='visitDate'
                    type='date'
                    defaultValue={date || ''}
                    required={true}
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
