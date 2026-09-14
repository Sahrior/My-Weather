import React, { useState } from "react";
import { X } from "lucide-react";
import { getGeolocation } from "../services/get-geolocation";
import { useNavigate } from "react-router";

const LocationModal = ({onClose}) => {


    const navigate  = useNavigate()
    const [city, setCity] = useState("")
    const [error, setError] = useState("")

    const goToPage = (location) => {
        navigate("/weather", { state: {location} }) //error ache maybe ekhane
    }

    
    


    const handleSubmit = async (e) => {
        e.preventDefault()

        const value = city.trim();

        if(!value){
            setError("Please enter a city name gaandu")
            return
        }

        

        try {
            const location = await getGeolocation(value);
            //console.log(result);

            if(!location){
                setError("Geocoding req failed")
            }

            goToPage(location)


        } catch (error) {
            console.log(error);
        }




    }

    const handleeGeoLocation = () => {

        if(!navigator.geolocation){
            setError("Geo location denied")
            return
        }

        navigator.geolocation.getCurrentPosition
        ((positions)=>{
            const {latitude, longitude} = positions.coords
            goToPage ( {name: "Your Location", lat : latitude, lon : longitude})
        },(error)=>{
            setError(error.message);
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

            <div className="text-center" >
                {error && <p className="text-red-600 text-md font-medium" > {error} </p> }
            </div>


        </div>

        
      
    </div>
  )
}

export default LocationModal
