import React from 'react'
import { useLocation } from 'react-router'

const Weather = () => {

    const value = useLocation()
    const place  = value.state.location




    //console.log(place);
    


  return (
    <div>
      this is weather page
    </div>
  )
}

export default Weather
