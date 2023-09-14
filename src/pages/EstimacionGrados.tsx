import React from 'react'
import TablaEstimacionGrados from '../components/TablaEstimacionGrados';
import ButtonTxt from '../components/ButtonTxt';


const EstimacionGrados: React.FC = () => {
    return (
        <>
        <div className='relative flex-col top-32 gap-6'>
            <ButtonTxt/>
            <div className='relative top-16 flex justify-center align-middle'>
                <TablaEstimacionGrados />
            </div>
        </div>
        </>
    )
}

export default EstimacionGrados