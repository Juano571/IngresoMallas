import { useContext } from "react"
import { DataContext, ContextProps } from '../context/DataContext';

export const useDataContext = () => {
    return useContext(DataContext) as ContextProps
}
