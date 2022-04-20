import React, { useEffect, useState, useCallback } from "react";

//lets put the current location in state

const Main = () => {

    // hard coded position of admin
    const adminPosition = {
        lat: 43.69291,
        long: -79.785635
    };

    const [status, setStatus] = useState("");
    const [location, setLocation] = useState({
        lat: adminPosition.lat,
        long: adminPosition.long
    });

    const getDistanceFromLatLonInKm = useCallback((startLat, startLong, locationLat, locationLong) => {
        let radiusOfEarth = 6371;
        // degree lat/lon?
        let dLat = deg2rad(locationLat - startLat);  // deg2rad below
        let dLon = deg2rad(locationLong - startLong);
        // square of half of the chord (line within a circle) length between two points. not taking into account the curvature of a sphere
        let vector =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(startLat)) * Math.cos(deg2rad(locationLat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        // angular distance between two points in radians
        // adding in the coefficient of the curvature of a sphere
        let angularDistance = 2 * Math.atan2(Math.sqrt(vector), Math.sqrt(1 - vector));
        let distanceInKm = radiusOfEarth * angularDistance;
        return distanceInKm;
    }, []);

    //this useeffect will calcluate the distance everytime the llocation changes
    useEffect(() => {
        console.log("location changed!!!");
        console.log("here is location", location.lat, location.long);
        //do the maths

        const distance = getDistanceFromLatLonInKm(adminPosition.lat, adminPosition.long, location.lat, location.long);

        console.log(distance, "km");
        if (distance * 1000 < 500) {
            console.log("within perimter");
            setStatus("Within perimter");
        } else {
            console.log("we have a runner");
            setStatus("We have a runner");
        }
        //including other dependencies to satisfy exhaustive deps warnings
    }, [location.lat, location.long, adminPosition.lat, adminPosition.long, getDistanceFromLatLonInKm]);

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
        /**
         * if navigator geolocator watch postion callback function was succesfull it passes a positon object
         * @param {{
         *   coords: {
         *     latitude: number;
         *     longitude: number;
         *   }
         * }} position
         * @returns {void}
         */
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