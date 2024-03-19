import CodeEditor from "../../sharedComponents/Editor";
import { LANGUAGES } from "../../config/languages";
import Options from "../../sharedComponents/Options";
import toast from "react-hot-toast";
import { postRequest } from "../../services/requests";
import { REQUEST } from "../../config/URL";
import { DEFAULT_CODE_EDITOR_VALUE, DEFAULT_CODE_EDITOR_VALUE_PYTHON } from "../../config/constants";
import { useEffect, useState } from "react";
import { validate } from "../../helper";

const Upload = () => {

    const [code, setCode] = useState('');
    const [language, setLanguage] = useState(LANGUAGES[0])
    const [stdin, setStdin] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        stdin: '',
        language: '',
        code: ''
    });

    const UploadData = async (e: any) => {
        e.preventDefault();
        setErrors({
            username: '',
            stdin: '',
            language: '',
            code: ''
        })

        const isDataValid = validate(username, stdin, language.value, code, setErrors);
        console.log(isDataValid);

        if (!isDataValid) return;


        try {
            setLoading(true);
            const postData = {
                username,
                stdin,
                language: language.value === 'cpp' ? 'c++' : language.value,
                code: code
            };


            const res = await postRequest(REQUEST.DATA, postData);
            const data = res.data;

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            toast.error(error.message)
        }

    }


    useEffect(() => {
        setCode('');
    }, [language])


    return (
        <div className='w-full' >
            {
                loading
                    ?
                    <div className="text-amber-500 h-80 flex items-center justify-center text-2xl" >Loading...</div>
                    :
                    <form
                        className="flex flex-col pt-4 gap-6"
                        onSubmit={UploadData}
                    >
                        <div className="flex w-full items-center gap-4" >
                            <div className="w-1/2 relative">
                                <input className="p-2 w-full bg-transparent border-b-2 border-amber-500 outline-none placeholder-amber-500 " type="text" value={username} placeholder="enter your username" onChange={(e) => { setUsername(e.target.value) }} />
                                <p className="text-sm absolute text-start text-red-600" >{errors.username}</p>
                            </div>
                            <div className="w-1/2 relative" >
                                <Options
                                    value={language}
                                    updateValue={(value: any) => { setLanguage(value) }}
                                    options={LANGUAGES}
                                />
                                <p className="text-sm absolute text-start text-red-600" >{errors.language}</p>
                            </div>
                        </div>

                        <div className="w-full relative">
                            <input className="p-2 w-full bg-transparent border-b-2 border-amber-500 outline-none placeholder-amber-500 " type="text" placeholder="Standard input" value={stdin} onChange={(e) => { setStdin(e.target.value) }} />
                            <p className="text-sm absolute text-start text-red-600" >{errors.stdin}</p>
                        </div>

                        <div className="w-full h-80 relative " >
                            <CodeEditor
                                onChange={(value: string) => { setCode(value) }}
                                language={language.value}
                                code={code}
                            />
                            <p className="text-sm absolute text-start text-red-600" >{errors.code}</p>
                        </div>

                        <button type="submit" className="bg-amber-500 hover:bg-amber-600 transition-all rounded-md px-4 py-2" >submit</button>
                    </form>
            }
        </div>
    )
}

export default Upload