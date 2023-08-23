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

export interface ContextProps {
    dataInputContext: CurrentValue[],
    setDataInputContext: React.Dispatch<React.SetStateAction<CurrentValue[]>>,
    dataEstimacionContext: Data[],
    setDataEstimacionContext: React.Dispatch<React.SetStateAction<Data[]>>
    
}



export const DataContext = createContext<ContextProps | null>(null);

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const [dataInputContext, setDataInputContext] = useState<CurrentValue[]>([])
    const [dataEstimacionContext, setDataEstimacionContext] = useState<Data[]>([])

    return (
        <DataContext.Provider value={{
            dataInputContext: dataInputContext,
            setDataInputContext: setDataInputContext,
            dataEstimacionContext: dataEstimacionContext,
            setDataEstimacionContext: setDataEstimacionContext
        }}>
            {children}
        </DataContext.Provider>
    )
}
