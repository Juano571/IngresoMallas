import React from 'react'

interface FilterProps {
    options: string[]
    setFilters: (filters: string[]) => void
    filters: string[]
    style: string
}

const Filter: React.FC<FilterProps> = ({ options, setFilters, filters, style }) => {

    //Funcion para obtener los filtros que se han seleccionado
    const handleFilters = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const isChecked = e.target.checked;
        if (!isChecked) {
            const newFilters = filters.filter((filter) => filter !== e.target.value);
            setFilters(newFilters);
        }else{
            setFilters([...filters, e.target.value]);
        }
    }

    // const handleFiltersSearch = () => {
        
    // }
    return (
        //Caja de filtros
        <div className = {style}>
            <input type='text' className='rounded-md' placeholder='Buscar'/>
            {options.map((option)=>(
                <div key={option} className='flex gap-3 items-center justify-between'>
                <label htmlFor={option}>{option}</label>
                <input id={option} type="checkbox" onChange={handleFilters} value={option} checked = {filters.includes(option)} />
            </div>
            ))}
        </div>
    )
}

export default Filter