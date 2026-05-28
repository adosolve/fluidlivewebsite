import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapPinned } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai",
  "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur",
  "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik",
  "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar",
  "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
  "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore",
  "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad",
  "Bareilly", "Mysore", "Moradabad", "Gurgaon", "Noida", "Jamshedpur",
  "Bhilai", "Cuttack", "Kochi", "Udaipur", "Bhavnagar", "Dehradun",
  "Asansol", "Nanded", "Ajmer", "Jamnagar", "Ujjain", "Sangli", "Jhansi"
].sort();

export default function LocationAutocomplete({ value, onChange, placeholder = "City you are based in" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const filteredCities = useMemo(() => {
    if (!inputValue) return INDIAN_CITIES.slice(0, 50);
    const lower = inputValue.toLowerCase();
    return INDIAN_CITIES.filter(city => city.toLowerCase().includes(lower));
  }, [inputValue]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all duration-200">
        <span className="text-gray-400 flex-shrink-0">
          <MapPinned className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 min-w-0"
        />
      </div>

      <AnimatePresence>
        {isOpen && filteredCities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-100 overflow-hidden max-h-48 overflow-y-auto"
          >
            <div className="py-1">
              {filteredCities.map((city, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                  onClick={() => {
                    setInputValue(city);
                    onChange(city);
                    setIsOpen(false);
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
