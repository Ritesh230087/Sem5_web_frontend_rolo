import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const useShipping = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get("http://localhost:5050/api/shipping/locations");
        setAllLocations(data);
      } catch (error) {
        console.error("Failed to fetch shipping locations", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const uniqueDistricts = useMemo(() => {
    const districtSet = new Set(allLocations.map(loc => loc.district));
    return Array.from(districtSet).sort();
  }, [allLocations]);

  // Function to get location suggestions based on district and city query
  const getCitySuggestions = (district, cityQuery) => {
    if (!district || !cityQuery) return [];
    
    return allLocations.filter(loc =>
      loc.district.toLowerCase() === district.toLowerCase() &&
      loc.name.toLowerCase().includes(cityQuery.toLowerCase())
    );
  };
  
  const getLocationByName = (name) => {
    return allLocations.find(loc => loc.name.toLowerCase() === name.toLowerCase());
  };

  return {
    isLoading,
    uniqueDistricts,
    getCitySuggestions,
    getLocationByName,
  };
};