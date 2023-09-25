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

    // const handleFiltersSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const results = filters.filter((element) => {
    //         const elementLowerCase = element.toLowerCase();
    //         const valueToSearch = e.target.value.toLowerCase();

    //         return elementLowerCase.includes(valueToSearch);
    //     })

    //     setFilters(results);
    // }
    return (
        //Caja de filtros
        <div className = {style}>
            {/* <input type='text' className='rounded-md' placeholder='Buscar'/> */}
            {options.map((option)=>(
                <div key={option} className='flex gap-3 justify-between pb-2 text-left w-auto'>
                <label className='text-xs w-max' htmlFor={option}>{option}</label>
                <input className='w-auto ' id={option} type="checkbox" onChange={handleFilters} value={option} checked = {filters.includes(option)} />
            </div>
            ))}
        </div>
    )
}

export default Filter