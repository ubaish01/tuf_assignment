import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type optionsType = {
    label: string,
    value: string | number
}
interface optionsProps {
    value: any,
    updateValue: (item: any) => void,
    options: optionsType[]
}

const Options = ({ value, updateValue, options }: optionsProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (item: optionsType) => {
        updateValue(item);
        setIsOpen(false)
    }

    return (
        <div className='w-full relative ' >
            <div className='px-4  flex items-center justify-between py-2 border-b-2 border-amber-500 w-full rounded-sm' onClick={() => { setIsOpen(!isOpen) }} >
                <div>{value.label}</div>
                <IoIosArrowDown size={22} className={`text-amber-500 transition-all duration-500 ${isOpen && '-rotate-180'}`} />
            </div>
            <div className={`absolute  bg-amber-100 text-amber-500 w-full top-8 left-0 overflow-hidden z-10 ${!isOpen ? 'h-0 p-0' : 'py-0'} rounded-md `} >
                {
                    options.map((item: any, index: number) => (
                        <div key={index} className={`p-2 text-base cursor-pointer transition-all duration-300 ${value === item && 'bg-amber-500 text-white font-semibold'} hover:bg-amber-500 hover:text-white`} onClick={() => { handleChange(item) }} >{item.label}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Options;