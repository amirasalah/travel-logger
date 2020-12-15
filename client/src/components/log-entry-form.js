import React from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntry, updateLogEntry } from '../apis'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import { SelectedLocation } from '../context/appState'

const LogEntryForm = ({ reloadMap }) => {
    const userSelectedLocation = SelectedLocation.useContainer()
    const { handleSubmit, register, setValue } = useForm()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [mode, setMode] = React.useState('add')
    const location = useLocation()
    const history = useHistory()
    const {
        description,
        image,
        latitude,
        longitude,
        title,
        visitDate,
        _id,
    } = userSelectedLocation.selectedLocation
    const date = moment(visitDate).format('YYYY-MM-DD')
    const onSubmit = async data => {
        try {
            setLoading(true)
            if (mode === 'add') {
                await createLogEntry(data)
            } else {
                data._id = _id
                await updateLogEntry(data)
            }
            history.push('/')
            reloadMap()
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (location.pathname === '/new') {
            setMode('add')
        } else {
            setMode('edit')
            setValue('title', title)
            setValue('description', description)
            setValue('image', image)
            setValue('latitude', latitude)
            setValue('longitude', longitude)
            setValue('visitDate', date)
        }
    }, [
        location.pathname,
        title,
        description,
        image,
        latitude,
        longitude,
        date,
        setValue,
    ])

    return (
        <main className='container mx-auto'>
            <form
                className='flex flex-col w-6/12 mx-auto'
                onSubmit={handleSubmit(onSubmit)}
            >
                {error && <h3 className='error'>{error}</h3>}
                {mode === 'add' && (
                    <input
                        placeholder='Password'
                        name='password'
                        type='password'
                        required={true}
                        ref={register}
                        className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    />
                )}
                <input
                    placeholder='Title'
                    name='title'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    ref={register}
                    required={true}
                />
                <input
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    placeholder='Latitude'
                    name='latitude'
                    ref={register}
                    required={true}
                />
                <input
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    placeholder='Longitude'
                    name='longitude'
                    ref={register}
                    required={true}
                />
                <textarea
                    placeholder='Description'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='description'
                    rows={3}
                    ref={register}
                ></textarea>

                <input
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    placeholder='Image Url'
                    ref={register}
                    name='image'
                />
                <input
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    placeholder='Visit Date'
                    name='visitDate'
                    ref={register}
                    type='date'
                    required={true}
                />
                <button
                    className='rounded-none my-8 mx-auto px-20 text-blue-900 h-20 max-w-xs ring-4 ring-blue-100'
                    disabled={loading}
                >
                    {loading
                        ? 'Loading...'
                        : mode === 'edit'
                        ? 'Edit Entry'
                        : 'Create Entry'}
                </button>
            </form>
        </main>
    )
}
export default LogEntryForm
