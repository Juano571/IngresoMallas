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
import Filter from './Filter';
import { useDataContext } from '../hooks/useDataContext';

//Interfaz para definir los campos de la columna
interface Column {
    id: 'codigo_cpr' | 'producto' | 'variedad' | 'tallos_por_bunch' | 'factor_porcentual_3_2' | 'fecha' | 'estimacion_ramos_grados' | 'estimacion_tallos_grados';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

//Declaración de la columnas a crear
const columns: readonly Column[] = [
    {
        id: 'codigo_cpr',
        label: 'Codigo_cpr',
        minWidth: 75,
        align: 'left',
    },
    {
        id: 'producto',
        label: 'Producto',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'variedad',
        label: 'Variedad',
        minWidth: 150,
        align: 'center',
    },
    {
        id: 'tallos_por_bunch',
        label: 'Tallos_por_Bunch',
        minWidth: 50,
        align: 'right',
    },
    {
        id: 'factor_porcentual_3_2',
        label: 'Factor_Porcentual_3_2',
        minWidth: 150,
        align: 'right',
    },
    {
        id: 'fecha',
        label: 'Fecha',
        minWidth: 200,
        align: 'center',
    },
    {
        id: 'estimacion_ramos_grados',
        label: 'Estimacion_Ramos_Grados',
        minWidth: 150,
        align: 'right',
    },
    {
        id: 'estimacion_tallos_grados',
        label: 'Estimacion_Tallos_Grados',
        minWidth: 150,
        align: 'right',
    }
];

export default function TableDataEntry() {

    //UseState para data del  backend
    const [rows, setRows] = React.useState([]);

    //Manejo del arreglo de datos de los input
    const { dataInputContext, setDataEstimacionGradosContext } = useDataContext();


    //Conexión con el servidor backend
    React.useEffect(() => {
        //Post de los datos del DataInputContext
        fetch("http://localhost:3000/obtenerDataInput", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataInputContext),
        }).then((res) => {
            if (res.ok) {
                console.log('Petición resuelta con éxito');
                fetch("http://localhost:3000/tableEstimacionGrados")
                    .then((res) => res.json())
                    .then((response) => {
                        setDataEstimacionGradosContext(response[0]);
                        setRows(response[1]);
                    })
            } else {
                console.log(res.statusText);
            }
        }).catch((err) => {
            console.log(err)
        });
    }, [])


    //useStates utilizados para el manejo de páginas
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [labelSelected, setLabelSelected] = React.useState('');

    //UseState para filtros
    const [filters, setFilters] = React.useState<string[]>([]);
    const [filtersCodigoCPR, setFiltersCodigoCPR] = React.useState<string[]>([]);
    const [filtersProducto, setFiltersProducto] = React.useState<string[]>([]);
    const [filtersVariedad, setFiltersVariedad] = React.useState<string[]>([]);
    const [filtersTallosPorBunch, setFiltersTallosPorBunch] = React.useState<string[]>([]);
    const [filtersFactorPorcentual, setFiltersFactorPorcentual] = React.useState<string[]>([]);
    const [filtersFecha, setFiltersFecha] = React.useState<string[]>([]);
    const [filtersEstimacionRamos, setFiltersEstimacionRamos] = React.useState<string[]>([]);
    const [filtersEstimacionTallos, setFiltersEstimacionTallos] = React.useState<string[]>([]);


    //Funcion para obtener los valores de cada comlumna para poner los en el filtro
    const getOptions = (label: string) => {
        let index: number = columns.findIndex((column) => column.label === label);
        switch (index) {
            case 0:
                const codigos_cprUnicos = new Set(rows.map((row) => row['codigo_cpr']))
                const codigosUnicosArreglo: string[] = []
                codigos_cprUnicos.forEach((codigoUnico) => codigosUnicosArreglo.push(codigoUnico))
                return codigosUnicosArreglo
            case 1:
                const productosUnicos = new Set(rows.map((row) => row['producto']))
                const productosUnicosArreglo: string[] = []
                productosUnicos.forEach((productoUnico) => productosUnicosArreglo.push(productoUnico))
                return productosUnicosArreglo
            case 2:
                const variedadesUnicas = new Set(rows.map((row) => row['variedad']))
                const variedadesUnicasArreglo: string[] = []
                variedadesUnicas.forEach((variedadUnica) => variedadesUnicasArreglo.push(variedadUnica))
                return variedadesUnicasArreglo
            case 3:
                const tallosBunchUnicos = new Set(rows.map((row) => row['tallos_por_bunch']))
                const tallosBunchArreglo: string[] = []
                tallosBunchUnicos.forEach((talloBunchUnico) => tallosBunchArreglo.push(talloBunchUnico))
                return tallosBunchArreglo
            case 4:
                const factorPorcentualUnicos = new Set(rows.map((row) => row['factor_porcentual_3_2']))
                const factorPorcentualArreglo: string[] = []
                factorPorcentualUnicos.forEach((factorPorcentualUnico) => factorPorcentualArreglo.push(factorPorcentualUnico))
                return factorPorcentualArreglo
            case 5:
                const fechasUnicas = new Set(rows.map((row) => row['fecha']))
                const fechasUnicasArreglo: string[] = []
                fechasUnicas.forEach((fechaUnica) => fechasUnicasArreglo.push(fechaUnica))
                return fechasUnicasArreglo
            case 6:
                const estimacionRamosUnicos = new Set(rows.map((row) => row['estimacion_ramos_grados']))
                const estimacionRamosUnicosArreglo: string[] = []
                estimacionRamosUnicos.forEach((estimacionRamoUnico) => estimacionRamosUnicosArreglo.push(estimacionRamoUnico))
                return estimacionRamosUnicosArreglo
            case 7:
                const estimacionTallosUnicos = new Set(rows.map((row) => row['estimacion_tallos_grados']))
                const estimacionTallosUnicosArreglo: string[] = []
                estimacionTallosUnicos.forEach((estimacionTalloUnico) => estimacionTallosUnicosArreglo.push(estimacionTalloUnico))
                return estimacionTallosUnicosArreglo
            default:
                return []
        }
    }

    React.useEffect(() => {

        if (filters.length === 0) {
            setFiltersCodigoCPR([]);
            setFiltersProducto([]);
            setFiltersVariedad([]);
            setFiltersTallosPorBunch([]);
            setFiltersFactorPorcentual([]);
            setFiltersFecha([]);
            setFiltersEstimacionRamos([]);
            setFiltersEstimacionTallos([]);
            return
        }

        const opcionesCodigoCPR = getOptions("Codigo_cpr")
        const opcionesProducto = getOptions("Producto")
        const opcionesVariedad = getOptions("Variedad")
        const opcionesTallosBunch = getOptions("Tallos_por_Bunch")
        const opcionesFactorPorcentual = getOptions("Factor_Porcentual_3_2")
        const opcionesFecha = getOptions("Fecha")
        const opcionesEstimacionRamos = getOptions("Estimacion_Ramos_Grados")
        const opcionesEstimacionTallos = getOptions("Estimacion_Tallos_Grados")

        setFiltersCodigoCPR(filters.filter(filtro => opcionesCodigoCPR.includes(filtro)))
        setFiltersProducto(filters.filter(filtro => opcionesProducto.includes(filtro)))
        setFiltersVariedad(filters.filter(filtro => opcionesVariedad.includes(filtro)))
        setFiltersTallosPorBunch(filters.filter(filtro => opcionesTallosBunch.includes(filtro)))
        setFiltersFactorPorcentual(filters.filter(filtro => opcionesFactorPorcentual.includes(filtro)))
        setFiltersFecha(filters.filter(filtro => opcionesFecha.includes(filtro)))
        setFiltersEstimacionRamos(filters.filter(filtro => opcionesEstimacionRamos.includes(filtro)))
        setFiltersEstimacionTallos(filters.filter(filtro => opcionesEstimacionTallos.includes(filtro)))
    }, [filters])


    //Maneja los datos que se muestran en la tabla con el filtro
    let newRows = rows.filter((row) => {
        if (filtersCodigoCPR.length === 0) {
            return row
        }

        if (filtersCodigoCPR.includes(row['codigo_cpr'])) {
            return row
        }
    })

    newRows = newRows.filter((row) => {
        if (filtersProducto.length === 0) {
            return row
        }

        if (filtersProducto.includes(row['producto'])) {
            return row
        }
    })

    newRows = newRows.filter((row) => {
        if (filtersTallosPorBunch.length === 0) {
            return row
        }

        if (filtersTallosPorBunch.includes(row['tallos_por_bunch'])) {
            return row
        }
    })

    newRows = newRows.filter((row) => {
        if (filtersFactorPorcentual.length === 0) {
            return row
        }

        if (filtersFactorPorcentual.includes(row['factor_porcentual_3_2'])) {
            return row
        }
    })

    newRows = newRows.filter((row) => {
        if (filtersVariedad.length === 0) {
            return row
        }

        if (filtersVariedad.includes(row['variedad'])) {
            return row
        }
    })

    newRows = newRows.filter((row) => {
        if (filtersFecha.length === 0) {
            return row
        }

        if (filtersFecha.includes(row['fecha'])) {
            return row
        }
    })

    newRows = newRows.filter((row) => {
        if (filtersEstimacionRamos.length === 0) {
            return row
        }

        if (filtersEstimacionRamos.includes(row['estimacion_ramos_grados'])) {
            return row
        }
    })

    newRows = newRows.filter((row) => {
        if (filtersEstimacionTallos.length === 0) {
            return row
        }
        if (filtersEstimacionTallos.includes(row['estimacion_tallos_grados'])) {
            return row
        }
    })

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
                                    <div className='flex gap-3 relative pr-5 pl-0'>
                                        {column.label}
                                        <button onClick={() => handleShowFilter(column.label)} className='relative'><AiFillCaretDown />
                                            {labelSelected === column.label && (
                                                <Filter options={getOptions(labelSelected)} setFilters={setFilters} filters={filters} style='absolute bg-gray-200 text-black py-2 px-4 rounded-lg h-64 overflow-auto' />
                                            )
                                            }
                                        </button>
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row['id']}>
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
