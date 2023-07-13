import React from 'react'
import Header from './Header'
import StickyHeadTable from './TableDataEntry'
import { AiFillSave, AiFillDelete } from "react-icons/ai";

const IngresoDatos: React.FC = () => {
    return (
        <>
            <Header activeSection1={true} activeSection2={false} activeSection3={false} />
            <div className='relative top-16 flex ml-10 gap-6'>
                <button className='bg-gray-800 text-white font-normal px-4 py-2 rounded-lg flex items-center gap-2' onClick={(e) => { }}>
                    <AiFillSave />
                    Guardar
                </button>
                <button className='bg-gray-800 text-white font-normal px-4 py-2 rounded-lg flex items-center gap-2' onClick={(e) => { }}>
                    <AiFillDelete />
                    Borrar Tabla
                </button>
                <button className='bg-gray-800 text-white font-normal px-4 py-2 rounded-lg flex items-center gap-2' onClick={(e) => { }}>
                    <AiFillDelete />
                    Borrar Sala Venture
                </button>
            </div>

            <div className='relative top-32 flex justify-center align-middle'>
                <StickyHeadTable />
            </div>


        </>
    )
}

export default IngresoDatos