import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useEffect, useState } from 'react';
import { getRequest } from '../../services/requests';
import { REQUEST } from '../../config/URL';
import { useParams } from 'react-router-dom';


const Code = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const GetCode = async () => {
    try {
      setLoading(true);
      const res = await getRequest(REQUEST.DATA + '/' + params.id);
      const data = res.data.data;
      console.log(data.code);

      setCode(data.code);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    GetCode();
  }, [])



  return (
    <div className="w-full flex py-12 items-center justify-center overflow-hidden " >

      <div className="w-4/5" >
        {
          loading
            ?
            <div>Loading...</div>
            :
            <SyntaxHighlighter className='text-left'  language="javascript" style={vs2015}>
              {code}
            </SyntaxHighlighter>
        }
      </div>
    </div>
  )
}

export default Code