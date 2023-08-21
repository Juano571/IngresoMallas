import { useContext} from "react"
import {DataInputContext, InputContextProps} from '../context/DataInputContext';

export const useDataContext = () => {
    return useContext(DataInputContext) as InputContextProps
}

