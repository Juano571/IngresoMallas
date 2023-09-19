import { AiOutlineExport } from 'react-icons/ai';
import { useDataContext } from '../hooks/useDataContext';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//Interfaz para establecer los datos que se van a guardar en el txt
interface Data {
    codigoTPO: string;
    codigoMTP: string;
    codigoMCA: string;
    codigoCPR: string;
    codigoECO: string;
    codigoCOM: string;
    codigoPRO: string;
    codigoDBU: string;
    codigoDTC: string;
    codigoSUC: string;
    fecha1TPO: string;
    fechaTPO: string;
    cantidadTPO: string;
    numerFactuTPO: string;
    rowguid: string;
    codigoMes: string;
    emCodigoMes: string;
    codigoCTP: string;
    codigoCCM: string;
    precioTPO: string;
    codigoDOC: string;
    numerSeguiTPO: string;
    codigoCCR: string;
    codigoUSU: string;
    sCodigoUSU: string;
    eCodigoTPO: string;
}

function createData(
    fecha1TPO: string,
    fechaTPO: string,
    cantidadTPO: string,
    codigoCPR: string
): Data {
    return {
        codigoTPO: '',
        codigoMTP: '001058',
        codigoMCA: '001022',
        codigoCPR: codigoCPR,
        codigoECO: '001000001',
        codigoCOM: '001',
        codigoPRO: '0010001',
        codigoDBU: '',
        codigoDTC: '',
        codigoSUC: '001',
        fecha1TPO: fecha1TPO,
        fechaTPO: fechaTPO,
        cantidadTPO: cantidadTPO,
        numerFactuTPO: '',
        rowguid: '',
        codigoMes: '001001',
        emCodigoMes: '001001',
        codigoCTP: '',
        codigoCCM: '',
        precioTPO: '',
        codigoDOC: '',
        numerSeguiTPO: '',
        codigoCCR: '',
        codigoUSU: '',
        sCodigoUSU: '',
        eCodigoTPO: '',
    };
}

const rowsData: Data[] = [];

const ButtonTxt = () => {

    const [rows, _setRows] = useState(rowsData);

    //Manejo del arreglo de datos de estimacion grados
    const { dataEstimacionGradosContext } = useDataContext();

    const setRowSData = () => {
        if (rowsData.length === 0) {
            dataEstimacionGradosContext.map((element) => {

                const fechaNormal: string = element['fecha1TPO'];
                const fechaPartes: string[] = fechaNormal.split('T');

                if (element['cantidadTPO'] !== '0') {
                    rowsData.push(
                        createData(
                            fechaPartes[0],
                            fechaPartes[0],
                            element['estimacion_ramos_grados'],
                            element['codigo_cpr']))
                }
            })
        }
    }

    setRowSData()

    const generarTxt = () => {
        // Generar el contenido del archivo con los datos separados por tabulaciones
        fetch("http://localhost:3000/generarTxt", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rows),
        }).then((res) => {
            if (res.ok) {
                console.log('Petición resuelta con éxito');
            } else {
                console.log(res.statusText);
            }
        }).catch((err) => {
            console.log(err)
        });
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
    const [description, setDescription] = useState('')

    return (
        <>
            <div>
                <button className='relative bg-gray-800 text-white font-normal px-4 py-2 rounded-lg flex items-center gap-2 left-20' onClick={
                    () => {
                        setTitle('Información');
                        setDescription('Espere un momento estamos generando el archivo');
                        
                        handleOpen();

                        // Usar setTimeout para cambiar el texto después de 5 segundos
                        setTimeout(() => {
                            generarTxt();
                            setTitle('Archivo Generado');
                            setDescription('Archivo generado exitosamente');
                        }, 5000);
                    }
                }>
                    <AiOutlineExport />
                    Generar txt
                </button>
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
                                <button className='relative p-2 rounded-lg bg-gray-800 text-white' onClick={handleClose}>Cerrar</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>

        </>
    )
}

export default ButtonTxt

