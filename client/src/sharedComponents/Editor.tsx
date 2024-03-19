import Editor from '@monaco-editor/react';
import { DEFAULT_CODE_EDITOR_VALUE, DEFAULT_CODE_EDITOR_VALUE_PYTHON } from '../config/constants';


interface props {
    onChange: any,
    language: string,
    code: string
}

const CodeEditor = ({ onChange, language, code }: props) => {


    return (
        <Editor line={1} language={language} value={(!code || code.length === 0) ? language == 'python' ? DEFAULT_CODE_EDITOR_VALUE_PYTHON : DEFAULT_CODE_EDITOR_VALUE : code} theme='vs-dark' onChange={onChange} />
    )
}

export default CodeEditor