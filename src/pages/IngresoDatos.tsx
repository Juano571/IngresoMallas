import TableDataEntry from '../components/TablaIngresoDatos'
import { AiFillSave, AiFillDelete } from "react-icons/ai";

const IngresoDatos: React.FC = () => {
    return (
        <>
            <div className='relative top-32 left-20 flex gap-6'>
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

            <div className='relative top-48 flex justify-center align-middle'>
                <TableDataEntry />
            </div>

        </>
    )
}

export default IngresoDatos