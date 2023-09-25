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
import { CurrentValue } from '../context/DataContext';
import { useDataContext } from '../hooks/useDataContext';

//Interfaz para definir los campos de la columna
interface Column {
    id: 'producto' | 'variedad' | 'fecha' | 'cantidad';
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
        id: 'variedad',
        label: 'Variedad',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'fecha',
        label: 'Fecha',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'cantidad',
        label: 'Cantidad',
        minWidth: 50,
        align: 'center',
    }
];


export default function TableDataEntry() {
    //useStates
    // const [rows, setRows] = React.useState<Data[]>([]);

    // Manejo del arreglo de datos de los input
    const { dataInputContext, setDataInputContext, rows, setRows } = useDataContext();

    //Conexión con el servidor backend
    React.useEffect(() => {
        if (rows.length === 0) {
            //Get de datos para la tabla ingreso datos
            fetch("http://localhost:3000/tableIngresoDatos")
                .then((res) => res.json())
                .then((response) => setRows(response))
        }
    }, [])

    //useStates utilizados para el manejo de páginas
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    //useState utilizado para manejar la etiqueta seleccionada para el filtro
    const [labelSelected, setLabelSelected] = React.useState('');

    //useState para el manejo de filtros
    const [filters, setFilters] = React.useState<string[]>([]);
    const [filtersProducto, setFiltersProducto] = React.useState<string[]>([]);
    const [filtersVariedad, setFiltersVariedad] = React.useState<string[]>([]);
    const [filtersFecha, setFiltersFecha] = React.useState<string[]>([]);
    const [_filtersCantidad, setFiltersCantidad] = React.useState<string[]>([]);

    //Funcion para obtener los valores de cada comlumna para poner los en el filtro
    const getOptions = (label: string) => {
        let index: number = columns.findIndex((column) => column.label === label);
        switch (index) {
            case 0:
                const productosUnicos = new Set(rows.map((row) => row.producto))
                const productosUnicosArreglo: string[] = []
                productosUnicos.forEach((productoUnico) => productosUnicosArreglo.push(productoUnico))
                return productosUnicosArreglo
            case 1:
                const variedadesUnicas = new Set(rows.map((row) => row.variedad))
                const variedadesUnicasArreglo: string[] = []
                variedadesUnicas.forEach((variedadUnica) => variedadesUnicasArreglo.push(variedadUnica))
                return variedadesUnicasArreglo
            case 2:
                const fechasUnicas = new Set(rows.map((row) => row.fecha))
                const fechasUnicasArreglo: string[] = []
                fechasUnicas.forEach((fechaUnica) => fechasUnicasArreglo.push(fechaUnica))
                return fechasUnicasArreglo
            case 3:
                // const cantidadesUnicas = new Set(rows.map((row) => row.cantidad))
                // const cantidadesUnicasArreglo: string[] = []
                // cantidadesUnicas.forEach((cantidadUnica) => cantidadesUnicasArreglo.push(cantidadUnica.toString()))
                // return cantidadesUnicasArreglo
                return []
            default:
                return []
        }
    }

    React.useEffect(() => {

        if (filters.length === 0) {
            setFiltersProducto([]);
            setFiltersVariedad([]);
            setFiltersFecha([]);
            setFiltersCantidad([]);
            return
        }

        const opcionesProducto = getOptions("Producto")
        const opcionesVariedad = getOptions("Variedad")
        const opcionesFecha = getOptions("Fecha")
        const opcionesCantidad = getOptions("Cantidad")

        setFiltersProducto(filters.filter(filtro => opcionesProducto.includes(filtro)))
        setFiltersVariedad(filters.filter(filtro => opcionesVariedad.includes(filtro)))
        setFiltersFecha(filters.filter(filtro => opcionesFecha.includes(filtro)))
        setFiltersCantidad(filters.filter(filtro => opcionesCantidad.includes(filtro)))
    }, [filters])


    //Maneja los datos que se muestran en la tabla con el filtro
    let newRows = rows.filter((row) => {
        if (filtersProducto.length === 0) {
            return row
        }
        return filtersProducto.includes(row.producto)
    })

    newRows = newRows.filter((row) => {
        if (filtersVariedad.length === 0) {
            return row
        }
        return filtersVariedad.includes(row.variedad)
    })

    newRows = newRows.filter((row) => {
        if (filtersFecha.length === 0) {
            return row
        }
        return filtersFecha.includes(row.fecha)
    })

    // newRows = newRows.filter((row) => {
    //     if (filtersCantidad.length === 0) {
    //         return row
    //     }
    //     return filtersCantidad.includes(row.cantidad.toString())
    // })

    const handleChangePage = (_event: unknown, newPage: number) => {
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


    //Funcion para obtener el valor de un input
    const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement>, concatenacion: string) => {
        let value: string = event.target.value
        if (id !== '' && value !== '' && concatenacion !== '') {
            handleAddValue(id, value, concatenacion);
        }

        //En caso de que la cantidad se borra se elimina el elemento del arreglo
        if (value === '') {
            let newInputValues: CurrentValue[] = dataInputContext.filter((element) => element.id !== id);
            setDataInputContext(newInputValues);
        }
    }

    //Funcion para agregar valores al arreglo de InputValues
    const handleAddValue = (id: string, value: string, concatenacion: string) => {
        let newInputValues: CurrentValue[];
        if (dataInputContext.length !== 0) {
            if (dataInputContext.some((item) => item.id === id)) {
                newInputValues = dataInputContext.map((element) => {
                    if (element.id === id) {
                        return { id: id, value: value, concatenacion: concatenacion }
                    } else {
                        return element
                    }
                })
                setDataInputContext(newInputValues)
            } else {
                setDataInputContext([...dataInputContext, { id: id, value: value, concatenacion: concatenacion }]);
            }
        } else {
            setDataInputContext([{ id: id, value: value, concatenacion: concatenacion }]);
        }
    }

    //Funcion para mantener los valores ya agregados al cambiar de pestaña
    const handleValueInput = (id: string) => {
        const elemento = dataInputContext.find((element) => element.id === id)
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
                                        {column.label !== 'Cantidad' && (
                                            <button onClick={() => handleShowFilter(column.label)} className='relative'>
                                                <AiFillCaretDown />
                                                {labelSelected === column.label && (
                                                    <Filter options={getOptions(labelSelected)} setFilters={setFilters} filters={filters} style='absolute bg-gray-200 top-10 text-black -left-36 py-2 px-4 rounded-lg h-32 w-auto overflow-auto'/>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            newRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={`${row.id}${row.fecha}`}>
                                            {columns.map((column) => {
                                                if (column.id !== 'cantidad') {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>

                                                    );
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <input id={row.id} className='border border-gray-800 rounded-lg w-36 h-6 text-center' type='number' placeholder={handleValueInput(row.id)} onChange={(e) => {
                                                                e.preventDefault();
                                                                handleInputChange(row.id, e, row.concatenacion)
                                                            }} />
                                                        </TableCell>
                                                    );
                                                }
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
