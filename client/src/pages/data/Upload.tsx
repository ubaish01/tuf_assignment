import CodeEditor from "../../sharedComponents/Editor";
import { LANGUAGES } from "../../config/languages";
import Options from "../../sharedComponents/Options";
import toast from "react-hot-toast";
import { postRequest } from "../../services/requests";
import { REQUEST } from "../../config/URL";
import { DEFAULT_CODE_EDITOR_VALUE_PYTHON } from "../../config/constants";
import { useState } from "react";

const Upload = () => {

    const [code, setCode] = useState('');
    const [language, setLanguage] = useState(LANGUAGES[0])
    const [stdin, setStdin] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const UploadData = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const filterCode = code.split(language.value == 'python' ? DEFAULT_CODE_EDITOR_VALUE_PYTHON : DEFAULT_CODE_EDITOR_VALUE_PYTHON)[1];
            const postData = {
                username,
                stdin,
                language: language.value,
                code: filterCode
            };
            const res = await postRequest(REQUEST.DATA, postData);
            const data = res.data;
            console.log(data);

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

    return (
        <div className='w-full' >
            {
                loading
                    ?
                    <div className="text-amber-500 h-80 flex items-center justify-center text-2xl" >Loading...</div>
                    :
                    <form
                        className="flex flex-col pt-4 gap-3"
                        onSubmit={UploadData}
                    >
                        <div className="flex w-full items-center gap-4" >
                            <input className="p-2 w-1/2 bg-transparent border-b-2 border-amber-500 outline-none placeholder-amber-500 " type="text" placeholder="enter your username" onChange={(e) => { setUsername(e.target.value) }} />
                            <div className="w-1/2" >
                                <Options
                                    value={language}
                                    updateValue={(value: any) => { setLanguage(value) }}
                                    options={LANGUAGES}
                                />
                            </div>
                        </div>
                        <input className="p-2 w-full bg-transparent border-b-2 border-amber-500 outline-none placeholder-amber-500 " type="text" placeholder="Standard input" onChange={(e) => { setStdin(e.target.value) }} />

                        <div className="w-full h-80 " >
                            <CodeEditor
                                onChange={(value: string) => { setCode(value) }}
                                language={language.value}
                            />
                        </div>

                        <button type="submit" className="bg-amber-500 hover:bg-amber-600 transition-all rounded-md px-4 py-2" >submit</button>
                    </form>
            }
        </div>
    )
}

export default Upload