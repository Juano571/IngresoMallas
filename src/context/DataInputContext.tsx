import { createContext, useState } from 'react';

interface DataInputContextProviderProps {
    children: JSX.Element | JSX.Element[]
}

export interface CurrentValue {
    id: string,
    value: string,
    concatenacion: string
}

export interface InputContextProps {
    dataContext: CurrentValue[],
    setDataContext: React.Dispatch<React.SetStateAction<CurrentValue[]>>
}


export const DataInputContext = createContext<InputContextProps | null>(null);

export const DataInputContextProvider = ({ children }: DataInputContextProviderProps) => {
    const [dataContext, setDataContext] = useState<CurrentValue[]>([])

    return (
        <DataInputContext.Provider value={{
            dataContext: dataContext,
            setDataContext: setDataContext
        }}>
            {children}
        </DataInputContext.Provider>
    )
}
