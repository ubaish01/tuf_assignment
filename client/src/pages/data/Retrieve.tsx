import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { REQUEST } from '../../config/URL';
import { getRequest } from '../../services/requests';
import { format } from 'timeago.js';

interface datatype {
    id: number,
    username: string,
    language: string,
    stdin: string,
    code: string,
    created_at: any
}

const limit = 10;

const Retrieve = () => {
    const [data, setData] = useState<datatype[]>([]);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchData = async (pageNo: number) => {
        try {
            setLoading(true);
            const url = `${REQUEST.DATA}?page=${pageNo}&limit=${limit}`
            const res = await getRequest(url);
            const data = res.data.data;
            if (data.length === 0) {
                setLoading(false);
                setPage(page - 1)
                return
            }
            setData(data)
            setDataCount(res.data.count);
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            console.log(error.message);

        }
    };

    useEffect(() => {
        fetchData(1);
    }, [])

    const nextPage = async () => {
        await fetchData(page + 1)
        setPage(prev => prev + 1);
    }
    const prevPage = async () => {
        if (page == 1) return;
        await fetchData(page - 1)
        setPage(prev => prev - 1);
    }

    return (
        <div className='w-full pt-8' >


            <div className="relative overflow-x-auto  sm:rounded-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 ">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                language
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Stdin
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                code
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                submit at
                            </th>
                        </tr>
                    </thead>

                    {!loading && <tbody>
                        {
                            data?.map((item) => (
                                <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {item.id}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.username}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.language}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.stdin}
                                    </td>
                                    <td className="px-6 py-4 max-w-48">
                                        {item.code.substring(0, 100)}{item.code.length > 100 && <>... <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" to={`/code/${item.id}`}>more</Link></>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                        {format(item.created_at)}
                                    </td>
                                </tr>

                            ))
                        }

                    </tbody>}

                </table>
                {loading && <div className="text-amber-500 w-full h-80 flex items-center justify-center text-xl" >Loading...</div>
                }

            </div>
            <div className='flex gap-2 items-center justify-center py-4' >
                <button disabled={page == 1} className={`px-8 py-2 rounded-md  ${(page == 1) ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} `} onClick={prevPage} >Prev</button>
                <button disabled={(page * limit >= dataCount)} className={`px-8 py-2 rounded-md  ${(page * limit >= dataCount) ? 'cursor-not-allowed bg-gray-400' : 'bg-amber-500 hover:bg-amber-600'} `} onClick={nextPage} >Next</button>
            </div>

        </div>
    )
}

export default Retrieve