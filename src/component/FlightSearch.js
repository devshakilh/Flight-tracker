
"use client"


import { useState } from 'react';
import {Input} from "@nextui-org/react";




const FlightSearch = () => {
    // State variables
    const [flightOffer, setFlightOffer] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to handle flight search
    const searchFlights = async () => {
        // Get user input
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;

        try {
            // Set loading state to true
            setLoading(true);

            // Fetch flight data from JSON file
            const response = await fetch('/data/flightData.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Filter flights based on user input
            const filteredFlights = data.flightOffer.filter(flight => {
                const departureDate = new Date(flight.itineraries[0].segments[0].departure.at).toISOString().split('T')[0];
                const departureLocation = flight.itineraries[0].segments[0].departure.iataCode;
                return departureDate === date && departureLocation === location;
            });

            // Set filtered flights and loading state
            setFlightOffer(filteredFlights);
            setLoading(false);
        } catch (error) {
            console.error('Error loading JSON:', error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1520px] mx-auto py-8  ">
            <h2 className="text-2xl font-bold mb-4">Flight Search</h2>
          <div className=' form'>
          <div className="flex mb-4 ">
                <label htmlFor="date" className="mr-2">Date:</label>
                <input type="date" id="date" className="border-2 border-gray-500 rounded px-2 py-1" />
            </div>
 
            <div className="flex mb-4 ml-4">
                <label htmlFor="location" className="mr-2">Location:</label>
                <input type="text" id="location" className="border rounded px-2 py-1" />
            </div>
            <div className="flex mb-4">
                <label htmlFor="location" className="mr-2">Location:</label>
                <input type="text" id="location" className="border rounded px-2 py-1" />
            </div>
           
          </div>
            <button onClick={searchFlights} className="!bg-green-500 text- px-4 py-2 rounded hover:bg-green-600">Search</button>

            <table className="w-ful mt-8">
                <thead>
                    <tr>
                        <th className="bg-green-500 text-white py-2 px-4">FLIGHT</th>
                        <th className="bg-green-500 text-white py-2 px-4">AIRCRAFT</th>
                        <th className="bg-green-500 text-white py-2 px-4">CLASS</th>
                        <th className="bg-green-500 text-white py-2 px-4">FARE</th>
                        <th className="bg-green-500 text-white py-2 px-4">ROUTE</th>
                        <th className="bg-green-500 text-white py-2 px-4">DEPARTURE</th>
                        <th className="bg-green-500 text-white py-2 px-4">ARRIVAL</th>
                        <th className="bg-green-500 text-white py-2 px-4">DURATION</th>
                     
                        <th className="bg-green-500 text-white py-2 px-4">PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    ) : flightOffer.length === 0 ? (
                        <tr>
                            <td colSpan="4" className='items-center justify-center text-center'>No flights found for the selected date and location.</td>
                        </tr>
                    ) : (
                        flightOffer.map((flight, index) => (
                            <tr key={index} className='border-b-[1px] border-orange-300'>
                                 <td>{flight.itineraries[0].segments[0].aircraft} <br/> {flight.itineraries[0].segments[0].aircraft}</td>
                                 <td>{flight.itineraries[0].segments[0].flightNumber} <br/> {flight.itineraries[0].segments[0].flightNumber} </td>
                                 <td>{flight.class} <br/> {flight.class}</td>
                                 <td>{flight.fareBasis} <br/> {flight.fareBasis}</td>
                                <td >{flight.itineraries[0].segments[0].departure.iataCode} <br/> {flight.itineraries[0].segments[0].departure.iataCode}</td>
                                <td>{flight.itineraries[0].segments[1].arrival.iataCode} <br/>  {flight.itineraries[0].segments[1].arrival.iataCode}</td>
                                <td>{flight.itineraries[0].segments[1].arrival.at}  <br/> {flight.itineraries[0].segments[1].arrival.at} </td>
                             
                                
                                <td>{flight.itineraries[0].duration}  <br/>  {flight.itineraries[0].duration}</td>
                                <td>{flight.price} <br/> <button className='bg-green-500 rounded p-2'>SELECT</button></td>
                              
                            
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FlightSearch;
