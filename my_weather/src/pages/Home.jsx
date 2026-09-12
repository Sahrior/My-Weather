import React, { useState } from 'react'
import LocationModal from '../components/LocationModal'

const Home = () => {

    const [click, setClick] = useState(false)
    


  return (
    <div  >
      
      <div className='text-center' >
        <h1 className='text-6xl text-blue-200 font-extrabold ' >Next level <span className='text-blue-500'>weather</span> App</h1>

        <p className='py-4 text-md' >Check you weather</p>
      </div>

      <div className='flex justify-center' >
        <button 
        type='button' 
        onClick={()=>setClick(true)}
        className='text-l text-gray-100 font-mediu hover:scale-105 transition-all delay-500 bg-blue-500 px-5 py-2 rounded-2xl' >
            Check Weather
        </button>
      </div>


      {
        click && <LocationModal onClose = {()=>setClick(false)} />
      }

    </div>
  )
}

export default Home
