import { useState } from "react"
import Upload from "./Upload";
import Retrieve from "./Retrieve";


enum STATE {
  RETRIEVE,
  UPLOAD
}

const Data = () => {
  const [state, setState] = useState(STATE.RETRIEVE);


  return (
    <div className="w-full flex py-12 items-center justify-center overflow-hidden " >

      <div className="w-4/5" >

        <h1 className="text-3xl text-amber-500" >TUF Assignment</h1>

        <div className="w-full flex gap-4 items-center justify-center" >
          <div className={`w-1/2 hover:text-amber-500 text-xl px-4 flex flex-col gap-2 group py-2 transition-all duration-200 cursor-pointer rounded-md hover:border-b-4] ${state === STATE.RETRIEVE && 'text-amber-500'}`} onClick={() => { setState(STATE.RETRIEVE) }} >
            Retrieve
            <div className={`bg-amber-500 h-[3px]  ${state == 0 ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-500`}></div>
          </div>
          <div className={`w-1/2 hover:text-amber-500 text-xl flex flex-col gap-2 px-4 group py-2 transition-all duration-200 cursor-pointer rounded-md ${state === STATE.UPLOAD && 'text-amber-500'} `} onClick={() => { setState(STATE.UPLOAD) }} >
            Upload
            <div className={`bg-amber-500 h-[3px]  ${state == 1 ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-500`}  ></div>
          </div>
        </div>

        {state === STATE.UPLOAD ? <Upload /> : <Retrieve />}

      </div>


    </div>
  )
}

export default Data