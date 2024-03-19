
import  { Toaster } from 'react-hot-toast'
import './App.css'
import { TOAST_OPTIONS } from './config/toastOptions'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Data from './pages/data/Data'
import Code from './pages/code/Code'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Data />} />
        <Route path='/code/:id' element={<Code />} />


      </Routes>
        <Toaster toastOptions={TOAST_OPTIONS} />
    </BrowserRouter>
  )
}

export default App
