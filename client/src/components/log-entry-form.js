import React from 'react'
import { useForm } from 'react-hook-form'
// import { createLogEntry } from '../apis'

const LogEntryForm = () => {
    const { register, handleSubmit } = useForm()
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState('')
    const onSubmit = async data => {
        // try {
        //     setLoading(true)
        //     data.latitude = location.latitude
        //     data.longitude = location.longitude
        //     await createLogEntry(data)
        //     onClose()
        // } catch (error) {
        //     console.error(error)
        //     setError(error.message)
        //     setLoading(false)
        // }
    }
    // const addNewMarker = event => {
    //     const [longitude, latitude] = event.lngLat
    //     setAddEntryLocation({
    //         longitude,
    //         latitude,
    //     })
    // }
    return (
        <main className='container mx-auto'>
            <form
                className='flex flex-col w-6/12 mx-auto'
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* {error && <h3 className='error'>{error}</h3>} */}
                <input
                    placeholder='Password'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    type='password'
                    name='password'
                    required
                    ref={register}
                />
                <input
                    placeholder='Title'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='title'
                    required
                    ref={register}
                />
                <textarea
                    placeholder='Description'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='description'
                    rows={3}
                    ref={register}
                ></textarea>
                <input
                    placeholder='Image Url'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='image'
                    ref={register}
                />
                <input
                    placeholder='Visit Date'
                    className='my-3 p-4 border-solid border-2 border-light-blue-500'
                    name='visitDate'
                    type='date'
                    required
                    ref={register}
                />
                {/* <button disabled={loading}>
                {loading ? 'Loading...' : 'Create Entry'}
            </button> */}
            </form>
        </main>
    )
}
export default LogEntryForm
