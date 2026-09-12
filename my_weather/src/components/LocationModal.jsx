import React, { useState } from "react";
import { X } from "lucide-react";

const LocationModal = ({onClose}) => {


    const [city, setCity] = useState("")
    


    const handleSubmit = (e) => {
        e.preventDefault()

        const value = city.trim
    }

    const handleeGeoLocation = () => {

        navigator.geolocation.getCurrentPosition
        ((positions)=>{
            const {latitude, longitude} = positions.coords
        },(error)=>{
            console.log(error);
        },{
            timeout: 10000
        })



    }


  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-950/60' >

        <div className='h-[300px] p-5 rounded-2xl w-[400px] w-md bg-gray-100 shadow-2xl'>
            
            <div className="flex justify-between items-center" >
                <h2 className='text-xl' >Where are you nigga</h2>

                <button 
                onClick={onClose}   
                className="cursor-pointer"
                >
                    <X />
                </button>
            </div>

            <div className="pt-8" >
                <form action="" onSubmit={handleSubmit} className="space-y-5">
                    <input 
                    placeholder="Enter city name"
                    type="text"
                    value = {city}
                    onChange={ (e)=>setCity(e.target.value) }
                    className="w-full border p-1 rounded-2xl"
                    />

                    <div className='' >
                        <button 
                        type='submit' 
                        className='text-l w-full text-gray-100 font-mediu hover:scale-105 transition-all delay-500 bg-blue-500 px-5 py-2 rounded-2xl' >
                            Get Weather
                        </button>
                    </div>



                </form>
            </div>

            <div className="py-2 text-center">Or</div>

            <div className='' >
                        <button 
                        type='button' 
                        onClick={handleeGeoLocation}
                        className='text-l w-full text-gray-100 font-mediu hover:scale-105 transition-all delay-500 bg-blue-500 px-5 py-2 rounded-2xl' >
                            Use My Location
                        </button>
            </div>
        </div>

        
      
    </div>
  )
}

export default LocationModal
