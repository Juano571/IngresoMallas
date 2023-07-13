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

interface Column {
    id: 'producto' | 'variedad' | 'fecha' | 'cantidad';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: 'producto',
        label: 'Producto',
        minWidth: 100
    },
    {
        id: 'variedad',
        label: 'Variedad',
        minWidth: 150
    },
    {
        id: 'fecha',
        label: 'Fecha',
        minWidth: 100,
    },
    {
        id: 'cantidad',
        label: 'Cantidad',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    }
];

interface Data {
    producto: string;
    variedad: string;
    fecha: string;
    cantidad: number;
}

function createData(
    producto: string,
    variedad: string,
    fecha: string,
    cantidad: number,
): Data {
    return { producto: producto, variedad: variedad, fecha: fecha, cantidad: cantidad };
}

const rowsData = [
    createData('Alstroemeria', 'Allure', 'Martes (2023-06-27)', 50),
    createData('Alstroemeria', 'Alyna', 'Martes (2023-06-27)', 75),
    createData('Alstroemeria', 'Angelina', 'Martes (2023-06-27)', 100),
    createData('Alstroemeria', 'Belkanto', 'Martes (2023-06-27)', 187),
    createData('Alstroemeria', 'Cheesecake', 'Martes (2023-06-27)', 87),
    createData('Alstroemeria', 'Clear', 'Martes (2023-06-27)', 94),
    createData('Alstroemeria', 'Cleo', 'Martes (2023-06-27)', 74),
    createData('Limonium', 'Montana Blue ', 'Martes (2023-06-27)', 50),
    createData('Limonium', 'Alyna', 'Martes (2023-06-27)', 75),
    createData('Limonium', 'Angelina', 'Martes (2023-06-27)', 100),
    createData('Limonium', 'Belkanto', 'Martes (2023-06-27)', 187),
    createData('Limonium', 'Cheesecake', 'Martes (2023-06-27)', 87),
    createData('Limonium', 'Clear', 'Martes (2023-06-27)', 94),
    createData('Limonium', 'Cleo', 'Martes (2023-06-27)', 74),
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [labelSelected, setLabelSelected] = React.useState('');
    const [filters, setFilters] = React.useState<string[]>([]);
    const [filtersProducto, setFiltersProducto] = React.useState<string[]>([]);
    const [filtersVariedad, setFiltersVariedad] = React.useState<string[]>([]);
    const [filtersFecha, setFiltersFecha] = React.useState<string[]>([]);
    const [filtersCantidad, setFiltersCantidad] = React.useState<string[]>([]);
    const [rows, setRows] = React.useState(rowsData);


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

    newRows = newRows.filter((row) => {
        if (filtersCantidad.length === 0) {
            return row
        }
        return filtersCantidad.includes(row.cantidad.toString())
    })



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
                const cantidadesUnicas = new Set(rows.map((row) => row.cantidad))
                const cantidadesUnicasArreglo: string[] = []
                cantidadesUnicas.forEach((cantidadUnica) => cantidadesUnicasArreglo.push(cantidadUnica.toString()))
                return cantidadesUnicasArreglo
            default:
                return []
        }
    }

    // const addValuesAndInput = (row: Data, value: string | number) => {
    //     columns.map((column) => {
    //         if (column.id === 'cantidad') {
    //             <input type='text' />
    //         } else {
    //             column.format && typeof value === 'number'
    //                 ? column.format(value)
    //                 : value
    //         }
    //     })
    // }


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
                                    style={{ minWidth: column.minWidth, backgroundColor: '#1f2937', color: '#ffffff', fontWeight: 'bold' }}
                                >
                                    <div className='flex items-center gap-3 relative z-50'>
                                        {column.label}
                                        <button onClick={() => handleShowFilter(column.label)}><AiFillCaretDown /></button>
                                        {labelSelected === column.label && (
                                            <Filter options={getOptions(labelSelected)} setFilters={setFilters} filters={filters} />
                                        )}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={`${row.variedad}-${index}`}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
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
