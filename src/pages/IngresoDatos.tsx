import { useState } from 'react';
import TableDataEntry from '../components/TablaIngresoDatos'
import { AiFillDelete } from "react-icons/ai";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const IngresoDatos: React.FC = () => {

    //Maneja el borrado de datos de la tabla
    const handleBorrarDatosInput = () => {
        window.location.reload();
    }

    //Maneja el barrado del venture
    const handleBorrarVenture = () => {
        console.log('Vanture borrado');
    }

    //Creacion y configuracion del modal
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        borderRadius: '8px 8px 8px 8px',

    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleOpen = () => {
        setIsOpenModal(true);
    }
    const handleClose = () => {
        setIsOpenModal(false);
    }
    //Variables para el manejo de la informacion del modal
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isVenture, setIsVenture] = useState(false);

    return (
        <>
            <div className='relative top-32 left-20 flex gap-6'>
                <button className='bg-gray-800 text-white font-normal px-4 py-2 rounded-lg flex items-center gap-2' onClick={
                    () => {
                        setIsVenture(false);
                        setTitle('Advertencia');
                        setDescription('¿Desea borrar la tabla?');
                        handleOpen();

                    }
                }>
                    <AiFillDelete />
                    Borrar Tabla
                </button>

                <button className='bg-gray-800 text-white font-normal px-4 py-2 rounded-lg flex items-center gap-2' onClick={
                    () => {
                        setIsVenture(true)
                        setTitle('Advertencia');
                        setDescription('¿Desea borrar la información de la sala venture?');
                        handleOpen();
                    }
                }>
                    <AiFillDelete />
                    Borrar Sala Venture
                </button>
                {/*Configuración del modal para los botones*/}
                <Modal
                    open={isOpenModal}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <div className='flex-col'>
                            <div className='fixed top-0 left-0 w-full bg-gray-800 rounded-tl-lg rounded-tr-lg'>
                                <h2 className='font-bold p-3 text-white'>{title}</h2>
                            </div>
                            <div className='flex flex-col items-center mt-10'>
                                <p className='relative p-2 mt-3 mb-3 font-medium'>{description}</p>

                                <div>
                                    <button className='relative p-1 w-10 mr-5 rounded-lg bg-gray-800 text-white' onClick={
                                        () => {
                                            if (isVenture == false) {
                                                handleBorrarDatosInput()
                                            } else {
                                                handleBorrarVenture()
                                                setTimeout(() => {
                                                    handleClose()
                                                }, (1000));
                                            }
                                        }
                                    }>Si</button>
                                    <button className='relative p-1 w-10 ml-5 rounded-lg bg-gray-800 text-white' onClick={handleClose}>No</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>

            </div>

            <div className='relative top-48 flex justify-center align-middle'>
                <TableDataEntry />
            </div>

        </>
    )
}

export default IngresoDatos