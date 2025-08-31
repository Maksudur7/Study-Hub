import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './paiges/navbar/Navbar'

function App() {

  return (
    < >
      <div className='bg-blue-50'>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
