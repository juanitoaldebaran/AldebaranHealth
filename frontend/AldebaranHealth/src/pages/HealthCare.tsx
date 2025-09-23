import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import useNotification from "@/hooks/useNotification";
import { motion } from "framer-motion";
import type React from "react";
import { useState, useEffect } from "react";
import Notification from "@/components/Notification";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Hospital {
  display_name: string;
  lat: string;
  lon: string;
  distance?: number;
}

const HealthCare: React.FC = () => {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);
  const {notification, showNotification, hideNotification} = useNotification();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        () => {
          console.log("Location access denied or unavailable");
        }
      );
    }
  }, []);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  const openInMaps = (lat: string, lon: string) => {
    const googleMapsApp = `https://maps.google.com/?q=${lat},${lon}`;
    const googleMapsWeb = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(googleMapsApp, '_blank');
    } else {
      window.open(googleMapsWeb, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim()) {
        showNotification("Please enter a location", "error");
        return;
    }

    setIsLoading(true);
    try {   
        const query = `hospital in ${location}`;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `format=json` +
          `&q=${encodeURIComponent(query)}` +
          `&limit=10` +
          `&addressdetails=1` +
          `&accept-language=en`
        );

        if (!response.ok) {
            showNotification("Failed to fetch hospital data", "error");
            return;
        }

        const data = await response.json();
        
        if (data.length === 0) {
          showNotification("No hospitals found in this location", "error");
          return;
        }

        const hospitalsWithDistance: Hospital[] = data.map((hospital: any) => {
          let distance = undefined;
          if (userLocation) {
            distance = calculateDistance(
              userLocation.lat,
              userLocation.lon,
              parseFloat(hospital.lat),
              parseFloat(hospital.lon)
            );
          }
          return {
            display_name: hospital.display_name,
            lat: hospital.lat,
            lon: hospital.lon,
            distance
          };
        });
e
        if (userLocation) {
          hospitalsWithDistance.sort((a: Hospital, b: Hospital) => 
            (a.distance || 0) - (b.distance || 0)
          );
        }

        setResults(hospitalsWithDistance);
        showNotification(`Found ${hospitalsWithDistance.length} hospitals`, "success");
        console.log("Successfully fetched hospital data");
    } catch (error: any) {
        console.error("Failed to fetch hospital data", error);
        showNotification("Failed to search hospitals. Please try again.", "error");
    } finally { 
        setIsLoading(false);
    }
  };

  const extractHospitalName = (displayName: string): string => {
    const parts = displayName.split(',');
    return parts[0].trim();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex items-center bg-white py-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-center"
          >
            <h1 className="text-6xl font-extrabold text-blue-600">
              Locate <span className="text-black">Nearest </span> Healthcare
            </h1>
            <h1 className="text-4xl font-extrabold text-blue-600">
              Facilities <span className="text-black">Worldwide</span>
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center text-[100px] animate-bounce"
            >
              📍
            </motion.div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Find Healthcare Services Near You with Distance & Maps
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              <span className="font-semibold text-blue-600">
                AldebaranHealth 
              </span>
              <br></br>
              provides advanced healthcare location services with{" "}
              <span className="text-blue-600">real-time distance calculations and integrated maps</span>
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-center mt-10 w-full max-w-2xl"
          >
            <h3 className="text-3xl font-extrabold text-blue-600">
              Find <span className="text-black">Hospitals </span> Near You
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 w-full"
            >
              <Input
                placeholder="📍 Enter location (e.g., Belfast, London, New York)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 p-3 text-base"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 px-6 py-3 text-white cursor-pointer hover:bg-blue-700 disabled:bg-blue-300 duration-200 rounded-lg font-medium"
              >
                {isLoading ? "Searching..." : "Find Hospitals"}
              </button>
            </form>

            {isLoading && (
                <div className="mt-8">
                    <LoadingSpinner />
                    <p className="mt-2 text-gray-600">Searching for hospitals...</p>
                </div>
            )}

            {!isLoading && results.length > 0 && (
                <div className="mt-8 w-full">
                    <h4 className="text-xl text-gray-800 mb-6 font-semibold">
                        Found {results.length} Hospitals in {location}:
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    {results.map((hospital, index) => (
                        <div
                        key={index}
                        className="bg-white shadow-lg rounded-xl p-5 text-left border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300"
                        >
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-semibold text-lg text-gray-800 line-clamp-2">
                                {extractHospitalName(hospital.display_name)}
                              </h5>
                              {hospital.distance && (
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                  {hospital.distance.toFixed(1)} km
                                </span>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                📍 {hospital.display_name}
                            </p>      
                            
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-gray-500">
                                📌 {parseFloat(hospital.lat).toFixed(4)}, {parseFloat(hospital.lon).toFixed(4)}
                              </p>
                              <button
                                onClick={() => openInMaps(hospital.lat, hospital.lon)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                              >
                                🗾 Open in Maps
                              </button>
                            </div>
                        </div>
                    ))}
                    </div>

                    {userLocation && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-700">
                          📍 Distances calculated from your current location
                        </p>
                      </div>
                    )}
                </div>  
            )}

            {!isLoading && results.length === 0 && location && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">
                  No hospitals found. Try searching for a different location like "Belfast", "London", or "New York".
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={hideNotification}
          duration={3000}
          position="top-center"
      />
    </div>
  );
};

export default HealthCare;