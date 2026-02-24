
import { Spinner } from '@/components/ui/spinner'
import React from 'react'

const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Spinner />
        </div>
    )
}

export default Loading
