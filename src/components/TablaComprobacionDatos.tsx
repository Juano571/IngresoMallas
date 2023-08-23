import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { AiFillCaretDown } from "react-icons/ai";
import Filter from './Filter'
import { v4 as uuidv4 } from 'uuid';
import { CurrentValue } from '../context/DataContext';
import { useDataContext } from '../hooks/useDataContext';

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


let isFull: boolean = false;

export default function TableDataEntry() {

    //useStates
    const [rows, setRows] = React.useState(rowsData);
    const [data, setData] = React.useState([])



    //Conexión con el servidor backend
    // React.useEffect(() => {
    //     //Get de datos para la tabla ingreso datos
    //     if (isFull === false) {
    //         fetch("http://localhost:3000/tableIngresoDatos")
    //             .then((res) => res.json())
    //             .then((response) => setData(response))
    //         isFull = true
    //     }
    // }, [])

    //Agregar los valores obtenidos de la conexion con el backend a un arreglo
    const setRowSData = () => {
        if (rowsData.length === 0) {
            arrayProduct.map((element) => {
                rowsData.push(createData(element, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0))
            })
        }
    }
    setRowSData()

    //useStates utilizados para el manejo de páginas
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //useState utilizado para manejar la etiqueta seleccionada para el filtro
    const [labelSelected, setLabelSelected] = React.useState('');

    // //useState para el manejo de filtros
    // const [filters, setFilters] = React.useState<string[]>([]);
    // const [filtersProducto, setFiltersProducto] = React.useState<string[]>([]);
    // const [filtersVariedad, setFiltersVariedad] = React.useState<string[]>([]);
    // const [filtersFecha, setFiltersFecha] = React.useState<string[]>([]);
    // const [filtersCantidad, setFiltersCantidad] = React.useState<string[]>([]);

    //useState para el manejo de los valores que se ingresan en cantidad
    //const [dataContext, setDataContext] = React.useState<CurrentValue[]>([])



    //Funcion para obtener los valores de cada comlumna para poner los en el filtro
    // const getOptions = (label: string) => {
    //     let index: number = columns.findIndex((column) => column.label === label);
    //     switch (index) {
    //         case 0:
    //             const productosUnicos = new Set(rows.map((row) => row.producto))
    //             const productosUnicosArreglo: string[] = []
    //             productosUnicos.forEach((productoUnico) => productosUnicosArreglo.push(productoUnico))
    //             return productosUnicosArreglo
    //         case 1:
    //             const variedadesUnicas = new Set(rows.map((row) => row.variedad))
    //             const variedadesUnicasArreglo: string[] = []
    //             variedadesUnicas.forEach((variedadUnica) => variedadesUnicasArreglo.push(variedadUnica))
    //             return variedadesUnicasArreglo
    //         case 2:
    //             const fechasUnicas = new Set(rows.map((row) => row.fecha))
    //             const fechasUnicasArreglo: string[] = []
    //             fechasUnicas.forEach((fechaUnica) => fechasUnicasArreglo.push(fechaUnica))
    //             return fechasUnicasArreglo
    //         case 3:
    //             // const cantidadesUnicas = new Set(rows.map((row) => row.cantidad))
    //             // const cantidadesUnicasArreglo: string[] = []
    //             // cantidadesUnicas.forEach((cantidadUnica) => cantidadesUnicasArreglo.push(cantidadUnica.toString()))
    //             // return cantidadesUnicasArreglo
    //             return []
    //         default:
    //             return []
    //     }
    // }

    // React.useEffect(() => {

    //     if (filters.length === 0) {
    //         setFiltersProducto([]);
    //         setFiltersVariedad([]);
    //         setFiltersFecha([]);
    //         setFiltersCantidad([]);
    //         return
    //     }

    //     const opcionesProducto = getOptions("Producto")
    //     const opcionesVariedad = getOptions("Variedad")
    //     const opcionesFecha = getOptions("Fecha")
    //     const opcionesCantidad = getOptions("Cantidad")

    //     setFiltersProducto(filters.filter(filtro => opcionesProducto.includes(filtro)))
    //     setFiltersVariedad(filters.filter(filtro => opcionesVariedad.includes(filtro)))
    //     setFiltersFecha(filters.filter(filtro => opcionesFecha.includes(filtro)))
    //     setFiltersCantidad(filters.filter(filtro => opcionesCantidad.includes(filtro)))
    // }, [filters])


    //Maneja los datos que se muestran en la tabla con el filtro
    // let newRows = rows.filter((row) => {
    //     if (filtersProducto.length === 0) {
    //         return row
    //     }
    //     return filtersProducto.includes(row.producto)
    // })

    // newRows = newRows.filter((row) => {
    //     if (filtersVariedad.length === 0) {
    //         return row
    //     }
    //     return filtersVariedad.includes(row.variedad)
    // })

    // newRows = newRows.filter((row) => {
    //     if (filtersFecha.length === 0) {
    //         return row
    //     }
    //     return filtersFecha.includes(row.fecha)
    // })

    // newRows = newRows.filter((row) => {
    //     if (filtersCantidad.length === 0) {
    //         return row
    //     }
    //     return filtersCantidad.includes(row.cantidad.toString())
    // })

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Se obtiene el label de la columna seleccionada y se cambia el valor del labelSelected
    const handleShowFilter = (label: string) => {
        if (label === labelSelected) {
            return setLabelSelected('');
        }
        setLabelSelected(label);
    }

    // Manejo del arreglo de datos de los input
    const { dataInputContext: dataContext, setDataInputContext: setDataContext } = useDataContext();

    //Funcion para obtener el valor de un input
    const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement>, concatenacion: string) => {
        let value: string = event.target.value
        if (id !== '' && value !== '' && concatenacion !== '') {
            handleAddValue(id, value, concatenacion);
        }

        if (value === '') {
            let newInputValues: CurrentValue[] = dataContext.filter((element) => element.id !== id);
            setDataContext(newInputValues);
        }
    }

    //Funcion para agregar valores al arreglo de InputValues
    const handleAddValue = (id: string, value: string, concatenacion: string) => {
        let newInputValues: CurrentValue[];
        if (dataContext.length !== 0) {
            if (dataContext.some((item) => item.id === id)) {
                newInputValues = dataContext.map((element) => {
                    if (element.id === id) {
                        return { id: id, value: value, concatenacion: concatenacion }
                    } else {
                        return element
                    }
                })
                setDataContext(newInputValues)
            } else {
                setDataContext([...dataContext, { id: id, value: value, concatenacion: concatenacion }]);
            }
        } else {
            setDataContext([{ id: id, value: value, concatenacion: concatenacion }]);
        }
    }

    //Funcion para mantener los valores ya agregados al cambiar de pestaña
    const handleValueInput = (id: string) => {
        const elemento = dataContext.find((element) => element.id === id)
        return elemento?.value
    }

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
                                        {/* <button onClick={() => handleShowFilter(column.label)} className='relative'><AiFillCaretDown />
                                            {labelSelected === column.label && (
                                                <Filter options={getOptions(labelSelected)} setFilters={setFilters} filters={filters} style='absolute bg-gray-200 text-black py-2 px-4 rounded-lg h-64 overflow-auto' />
                                            )}
                                        </button> */}
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
