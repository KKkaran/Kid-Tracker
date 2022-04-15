import React, { useEffect, useState } from 'react'

//lets put the current location in state

const Main = ()=>{

    const start = {
        lat: 43.69291,
        long: -79.785635
    }

    const [location,setLocation] = useState({
        lat:0,
        long:0
    })

    //this useeffect will calcluate the distance everytime the llocation changes
    useEffect(()=>{
        console.log("location changed!!!")
        console.log(location)
        //do the maths

        const distance = getDistanceFromLatLonInKm(start.lat,start.long,location.lat,location.long) 

        console.log(distance ,"km")
        if(distance * 1000 < 500){
            console.log("within perimter")
        }else{
            console.log("we have a runner")
        }



    },[location])

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
    }

    function deg2rad(deg) {
    return deg * (Math.PI/180)
    }
    const getLocation = ()=>{
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            setLocation(
                {...location,lat:latitude,long:longitude}
            )
          }
        
          function error(err) {
              console.log(err)
          }
        
          if(!navigator.geolocation) {
            console.log("not working")
          } else {
            navigator.geolocation.watchPosition(success, error);
          }
    }
    return(
        <>
            <h2>This is the location</h2>
            {getLocation()}

        </>
                

    )
}

export default Main