import React, { useEffect } from 'react'
import TablaEstimacionGrados from '../components/TablaEstimacionGrados';

const EstimacionGrados: React.FC = () => {
    return (
        <>
            <div className='relative top-24 flex justify-center align-middle'>
                <TablaEstimacionGrados />
            </div>
        </>
    )
}

export default EstimacionGrados