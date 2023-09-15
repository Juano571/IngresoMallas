import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { v4 as uuidv4 } from 'uuid';
import { useDataContext } from '../hooks/useDataContext';
import { DataEstimacion } from '../context/DataContext'

//Interfaz para definir los campos de la columna
interface Column {
    id: 'producto' | 'veinte' | 'cuarenta' | 'cincuenta' | 'cincuentaCinco' | 'sesenta' | 'setenta' | 'setentaCinco' | 'ochenta' | 'ochentaCinco' | 'noventa' | 'cien' | 'cientoDiez' | 'cientoVeinte' | 'cientoTreinta' | 'total';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

//Declaración de la columnas a crear
const columns: readonly Column[] = [
    {
        id: 'producto',
        label: 'Producto',
        minWidth: 100,
        align: 'left',
    },
    {
        id: 'veinte',
        label: '20',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'cuarenta',
        label: '40',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'cincuenta',
        label: '50',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'cincuentaCinco',
        label: '55',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'sesenta',
        label: '60',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'setenta',
        label: '70',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'setentaCinco',
        label: '75',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'ochenta',
        label: '80',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'ochentaCinco',
        label: '85',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'noventa',
        label: '90',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'cien',
        label: '100',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'cientoDiez',
        label: '110',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'cientoVeinte',
        label: '120',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'cientoTreinta',
        label: '130',
        minWidth: 25,
        align: 'right',
    },
    {
        id: 'total',
        label: 'Total',
        minWidth: 25,
        align: 'right',
    }
];

//Método para generar un id único
const generateUniqueId = (): string => {
    return uuidv4();
}

//Definición de los datos que va a aceptar el arreglo rowsData
interface Data {
    id: string;
    producto: string;
    veinte: number;
    cuarenta: number;
    cincuenta: number;
    cincuentaCinco: number;
    sesenta: number;
    setenta: number;
    setentaCinco: number;
    ochenta: number;
    ochentaCinco: number;
    noventa: number;
    cien: number;
    cientoDiez: number;
    cientoVeinte: number;
    cientoTreinta: number;
    total: number;
}

function createData(
    producto: string,
    veinte: number,
    cuarenta: number,
    cincuenta: number,
    cincuentaCinco: number,
    sesenta: number,
    setenta: number,
    setentaCinco: number,
    ochenta: number,
    ochentaCinco: number,
    noventa: number,
    cien: number,
    cientoDiez: number,
    cientoVeinte: number,
    cientoTreinta: number,
    total: number,
): Data {
    return {
        id: generateUniqueId(),
        producto: producto,
        veinte: veinte,
        cuarenta: cuarenta,
        cincuenta: cincuenta,
        cincuentaCinco: cincuentaCinco,
        sesenta: sesenta,
        setenta: setenta,
        setentaCinco: setentaCinco,
        ochenta: ochenta,
        ochentaCinco: ochentaCinco,
        noventa: noventa,
        cien: cien,
        cientoDiez: cientoDiez,
        cientoVeinte: cientoVeinte,
        cientoTreinta: cientoTreinta,
        total: total,
    };
}


const rowsData: Data[] = [];

const arrayProduct: string[] = [

    'Alstroemeria Green',
    'Alstroemeria Hot Pink',
    'Alstroemeria Lavender',
    'Alstroemeria Orange',
    'Alstroemeria Pink',
    'Alstroemeria Purple',
    'Alstroemeria Red',
    'Alstroemeria White',
    'Alstroemeria Yellow',
    'Alstroemeria Bicolor Orange',
    'TOTAL Alstroemeria',


    'Perfection Hot Pink',
    'Perfection Lavender',
    'Perfection Orange',
    'Perfection Pink',
    'Perfection Purple',
    'Perfection Red',
    'Perfection White',
    'Perfection Yellow',
    'Perfection Bicolor Orange',
    'TOTAL Alstroemeria Perfection',

    'Aster Purple',
    'Aster White',
    'Aster Pink',
    'Carnival Doble Purple',
    'Aster Petit Pink',
    'TOTAL Aster',

    'Bouquet',
    'TOTAL Bouquet',

    'Carnival Aster Pink',
    'Carnival Aster Purple',
    'Carnival Aster White',
    'Carnival  hot Pink',
    'Carnival Doble Purple',
    'Carnival Doble Aster Hot Pink',
    'Carnival Aster Petit Pink',
    'TOTAL Carnival',

    'Carnival Solidago Gold',
    'Carnival Solidago Taramba',
    'TOTAL Carnival Solidago',

    'Delphinium Deep Blue Jay',
    'Delphinium Royal Dark Blue',
    'Delphinium Royal Light Blue',
    'Delphinium Royal White',
    'Delphinium Belladona Lince',
    'TOTAL Delphinium Belladona',

    'Delphinium Elatum Asia',
    'Delphinium Elatum Black Velvet',
    'Delphinium Elatum Blue River',
    'Delphinium Elatum Full Moon',
    'Delphinium Elatum Manuela',
    'Delphinium Elatum Sky Blue',
    'Delphinium Elatum White River',
    'I+D Delphinium Elatum Kronos',
    'Delphinium Elatum Mauve River',
    'Delphinium Elatum Deep Blue',
    'TOTAL Delphinium Elatum',

    'Carnival Eryngium Arabiam',
    'Carnival Eryngium Blue',
    'Eryngium Arabian',
    'Eryngium Blue',
    'TOTAL Eryngium',

    'Limonium California',
    'Limonium Maine Blue',
    'Limonium Kansas',
    'TOTAL Limonium',

    'Solidago Gold',
    'TOTAL Solidago',

    'Statice Blue',
    'Statice Hot Pink',
    'Statice Lavender',
    'Statice Pink',
    'Statice Purple',
    'Statice Rainbow',
    'Statice White',
    'Statice Yellow',
    'TOTAL Statice',

    'Carnival Statice Lavender',
    'Carnival Statice Pink',
    'Carnival Statice Purple',
    'Carnival Statice White',
    'Carnival Statice Yellow',
    'Statice Purple',
    'TOTAL Statice Carnival',

    'Eucalipto',
    'TOTAL Eucalipto',

    'Cipres',
    'TOTAL Cipres',

    'Ligustrum',
    'TOTAL Ligustrum',

    'Hebes',
    'TOTAL Hebes',

    'Carnival Solidago Gold',
    'TOTAL CF',

    'Aster Petit Blue',
    'TOTAL Dark',

    'Lepidium Green',
    'TOTAL lepidium',

    'Aster Petit Pink',
    'TOTAL Pink'


];

export default function TableDataEntry() {

    //useStates
    const [rows, setRows] = React.useState(rowsData);

    // Manejo del arreglo de datos de los input
    const { dataEstimacionGradosContext } = useDataContext();

    //Filtrar datos para ingreso en la tabla
    const filter = (sku_pv_ventas: string) => {
        const dataFilter = dataEstimacionGradosContext.filter((element) => element.sku_pv_ventas === sku_pv_ventas && element.estimacion_ramos_grados !== '0')
        return dataFilter
    }

    //Agregar los valores obtenidos de la conexion con el backend a un arreglo
    const setRowSData = () => {
        if (rowsData.length === 0) {
            arrayProduct.map((element) => {
                const dataFilter = filter(element);
                let total: number = 0;
                let veinte: number = 0;
                let cuarenta: number = 0;
                let cincuenta: number = 0;
                let cincuentaCinco: number = 0;
                let sesenta: number = 0;
                let setenta: number = 0;
                let setentaCinco: number = 0;
                let ochenta: number = 0;
                let ochentaCinco: number = 0;
                let noventa: number = 0;
                let cien: number = 0;
                let cientoDiez: number = 0;
                let cientoVeinte: number = 0;
                let cientoTreinta: number = 0;
                dataFilter.map((dato) => {
                    switch (dato.grados) {
                        case '20':
                            veinte += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '40':
                            cuarenta += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '50':
                            cincuenta += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '55':
                            cincuentaCinco += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '60':
                            sesenta += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '70':
                            setenta += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '75':
                            setentaCinco += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '80':
                            ochenta += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '85':
                            ochentaCinco += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '90':
                            noventa += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '100':
                            cien += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '110':
                            cientoDiez += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '120':
                            cientoVeinte += parseInt(dato.estimacion_ramos_grados);
                            break;
                        case '130':
                            cientoTreinta += parseInt(dato.estimacion_ramos_grados);
                            break;
                        default:
                            break;
                    }
                    total = veinte + cuarenta + cincuenta + cincuentaCinco + sesenta + sesenta + setenta + setentaCinco + ochenta + ochentaCinco + noventa + cien + cientoDiez + cientoVeinte + cientoTreinta;
                })
                rowsData.push(createData(element, veinte, cuarenta, cincuenta, cincuentaCinco, sesenta, setenta, setentaCinco, ochenta, ochentaCinco, noventa, cien, cientoDiez, cientoVeinte, cientoTreinta, total))
            })
        }
    }

    setRowSData()

    //useStates utilizados para el manejo de páginas
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '90%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 450, minHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ backgroundColor: '#1f2937', color: '#ffffff', fontWeight: 'bold', width: column.minWidth }}
                                >
                                    <div className='flex gap-3 relative justify-center'>
                                        {column.label}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                const stringValue = value.toString().split(' ')[0];
                                                return (
                                                    <TableCell key={column.id} align={column.align} className={`${stringValue === 'TOTAL' ? 'bg-gray-100' : 'bg-white'}`}>
                                                        <div className={`${stringValue === 'TOTAL' ? 'font-bold' : 'font-normal'}`}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </div>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
