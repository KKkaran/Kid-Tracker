import React, { useEffect, useState, useCallback } from "react";

//lets put the current location in state

const Main = () => {

    const start = {
        lat: 43.69291,
        long: -79.785635
    };

    const [status, setStatus] = useState("");
    const [location, setLocation] = useState({
        lat: start.lat,
        long: start.long
    });

    const getDistanceFromLatLonInKm = useCallback((lat1, lon1, lat2, lon2) => {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }, []);

    //this useeffect will calcluate the distance everytime the llocation changes
    useEffect(() => {
        console.log("location changed!!!");
        console.log(location);
        //do the maths

        const distance = getDistanceFromLatLonInKm(start.lat, start.long, location.lat, location.long);

        console.log(distance, "km");
        if (distance * 1000 < 500) {
            console.log("within perimter");
            setStatus("Within perimter");
        } else {
            console.log("we have a runner");
            setStatus("We have a runner");
        }



        //including other dependencies to satisfy exhaustive deps warnings
    }, [location, getDistanceFromLatLonInKm, start.lat, start.long]);

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    const getLocation = () => {
        // unused?
        let options = {
            maximumAge: 10000,
            timeout: 10000,
            enableHighAccuracy: true,
        };
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setLocation(
                { ...location, lat: latitude, long: longitude }
            );
        }

        function error(err) {
            console.log(err);
        }

        if (!navigator.geolocation) {
            console.log("not working");
        } else {
            navigator.geolocation.watchPosition(success, error);
        }
    };
    return (
        <>

            {getLocation()}

            <h2>{status}</h2>


        </>


    );
};

export default Main;