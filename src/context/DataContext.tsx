import { createContext, useState } from 'react';

interface DataContextProviderProps {
    children: JSX.Element | JSX.Element[]
}

export interface CurrentValue {
    id: string,
    value: string,
    concatenacion: string
}

export interface Data {
    codigo_cpr: string;
    producto: string;
    variedad: string;
    tallos_por_bunch: number;
    factor_porcentual_3_2: number;
    fecha: string;
    estimacion_ramos_grados: string;
    estimacion_tallos_grados: string;
    id: string;
}

export interface DataEstimacion {
    sku_pv: string; 
    sku_pv_ventas: string;
    grados: string;
    estimacion_ramos_grados: string;
    estimacion_tallos_grados: string;
    codigo_cpr: string;
    fecha1TPO: string,
    fechaTPO: string,
    cantidadTPO: string,
}

export interface ContextProps {
    dataInputContext: CurrentValue[],
    setDataInputContext: React.Dispatch<React.SetStateAction<CurrentValue[]>>,
    dataEstimacionGradosContext: DataEstimacion[],
    setDataEstimacionGradosContext: React.Dispatch<React.SetStateAction<DataEstimacion[]>>
    
}



export const DataContext = createContext<ContextProps | null>(null);

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const [dataInputContext, setDataInputContext] = useState<CurrentValue[]>([])
    const [dataEstimacionGradosContext, setDataEstimacionGradosContext] = useState<DataEstimacion[]>([])

    return (
        <DataContext.Provider value={{
            dataInputContext: dataInputContext,
            setDataInputContext: setDataInputContext,
            dataEstimacionGradosContext: dataEstimacionGradosContext,
            setDataEstimacionGradosContext: setDataEstimacionGradosContext
        }}>
            {children}
        </DataContext.Provider>
    )
}
