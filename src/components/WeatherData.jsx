import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WeatherData = () => {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("Denpasar");
  const [weatherFacts, setWeatherFacts] = useState([]);
  const [activeTab, setActiveTab] = useState("daily"); // daily, hourly, details
  const [selectedRegion, setSelectedRegion] = useState(null);

  const locations = [
    // Jawa
    { lat: -6.2, lon: 106.8, name: "Jakarta", region: "Jawa" },
    { lat: -7.28, lon: 112.73, name: "Surabaya", region: "Jawa" },
    { lat: -6.91, lon: 107.61, name: "Bandung", region: "Jawa" },
    { lat: -7.80, lon: 110.36, name: "Yogyakarta", region: "Jawa" },
    { lat: -6.99, lon: 110.42, name: "Semarang", region: "Jawa" },
    { lat: -7.98, lon: 112.63, name: "Malang", region: "Jawa" },
    
    // Sumatera
    { lat: 3.59, lon: 98.67, name: "Medan", region: "Sumatera" },
    { lat: -2.99, lon: 104.76, name: "Palembang", region: "Sumatera" },
    { lat: -0.95, lon: 100.35, name: "Padang", region: "Sumatera" },
    { lat: 5.55, lon: 95.32, name: "Banda Aceh", region: "Sumatera" },
    { lat: 0.51, lon: 101.45, name: "Pekanbaru", region: "Sumatera" },
    { lat: -3.80, lon: 102.26, name: "Bengkulu", region: "Sumatera" },
    { lat: -5.45, lon: 105.26, name: "Bandar Lampung", region: "Sumatera" },
    
    // Kalimantan
    { lat: 0.03, lon: 109.33, name: "Pontianak", region: "Kalimantan" },
    { lat: -1.27, lon: 116.83, name: "Balikpapan", region: "Kalimantan" },
    { lat: -3.32, lon: 114.59, name: "Banjarmasin", region: "Kalimantan" },
    { lat: -0.50, lon: 117.14, name: "Samarinda", region: "Kalimantan" },
    { lat: 0.13, lon: 111.49, name: "Sintang", region: "Kalimantan" },
    
    // Sulawesi
    { lat: -5.14, lon: 119.43, name: "Makassar", region: "Sulawesi" },
    { lat: 1.49, lon: 124.84, name: "Manado", region: "Sulawesi" },
    { lat: -0.91, lon: 119.87, name: "Palu", region: "Sulawesi" },
    { lat: 0.54, lon: 123.06, name: "Gorontalo", region: "Sulawesi" },
    { lat: -3.97, lon: 122.51, name: "Kendari", region: "Sulawesi" },
    
    // Bali dan Nusa Tenggara
    { lat: -8.65, lon: 115.22, name: "Denpasar", region: "Bali & Nusa Tenggara" },
    { lat: -8.58, lon: 116.12, name: "Mataram", region: "Bali & Nusa Tenggara" },
    { lat: -10.17, lon: 123.58, name: "Kupang", region: "Bali & Nusa Tenggara" },
    { lat: -8.84, lon: 121.66, name: "Maumere", region: "Bali & Nusa Tenggara" },
    
    // Maluku dan Papua
    { lat: -3.7, lon: 128.17, name: "Ambon", region: "Maluku & Papua" },
    { lat: -2.54, lon: 140.70, name: "Jayapura", region: "Maluku & Papua" },
    { lat: -0.86, lon: 131.25, name: "Sorong", region: "Maluku & Papua" },
    { lat: 0.78, lon: 127.37, name: "Ternate", region: "Maluku & Papua" },
    { lat: -4.55, lon: 136.89, name: "Timika", region: "Maluku & Papua" },
    { lat: -3.36, lon: 135.50, name: "Nabire", region: "Maluku & Papua" },
  ];

  // Mendapatkan semua region unik
  const regions = [...new Set(locations.map(loc => loc.region))];

  // Fetch current weather for all locations
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const data = {};
        for (const loc of locations) {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,pressure_msl,cloudcover,visibility,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset`
          );
          const result = await response.json();
          data[loc.name] = {
            current: result.current_weather,
            hourly: result.hourly,
            daily: result.daily,
          };
        }
        setAllData(data);
        
        // Set forecast data for the first location
        if (data[selectedLocation]) {
          setForecastData(data[selectedLocation]);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Update forecast data when selected location changes
  useEffect(() => {
    if (allData[selectedLocation]) {
      setForecastData(allData[selectedLocation]);
      // Update selected region
      const location = locations.find(loc => loc.name === selectedLocation);
      if (location) {
        setSelectedRegion(location.region);
      }
    }
  }, [selectedLocation, allData]);

  // Weather facts
  useEffect(() => {
    setWeatherFacts([
      {
        title: "Dampak Perubahan Iklim",
        content: "Indonesia sangat rentan terhadap efek perubahan iklim, dengan naiknya permukaan air laut yang mengancam daerah pesisir dan perubahan pola hujan yang mempengaruhi pertanian."
      },
      {
        title: "Musim Monsun",
        content: "Indonesia memiliki dua musim utama: musim kemarau (April hingga Oktober) dan musim hujan (November hingga Maret), yang dipengaruhi oleh angin monsun."
      },
      {
        title: "Pengaruh Vulkanik",
        content: "Banyaknya gunung berapi di Indonesia dapat mempengaruhi kondisi cuaca lokal, dengan awan debu yang mampu menurunkan suhu dan mengubah pola hujan."
      },
      {
        title: "Efek El Niño",
        content: "Fenomena El Niño dapat menyebabkan kondisi kekeringan parah di seluruh Indonesia, terutama mempengaruhi Jawa, Bali, dan pulau-pulau bagian timur."
      },
      {
        title: "Variasi Suhu",
        content: "Meskipun dekat dengan khatulistiwa, suhu di Indonesia bervariasi secara signifikan berdasarkan ketinggian. Daerah dataran tinggi bisa 15-20°C lebih dingin dari daerah pesisir."
      },
      {
        title: "Iklim Tropis",
        content: "Indonesia memiliki iklim tropis dengan kelembaban tinggi sepanjang tahun. Suhu rata-rata sekitar 28°C di dataran rendah dan lebih sejuk di daerah pegunungan."
      }
    ]);
  }, []);

  const getWeatherEmoji = (weathercode) => {
    if (weathercode === 0) return "☀️"; // Clear sky
    if (weathercode <= 3) return "🌤️"; // Partly cloudy
    if (weathercode <= 48) return "☁️"; // Cloudy
    if (weathercode <= 77) return "🌧️"; // Rain
    if (weathercode <= 99) return "⛈️"; // Thunderstorm
    return "❓"; // Unknown
  };

  const getWeatherLabel = (weathercode) => {
    if (weathercode === 0) return "Cerah";
    if (weathercode <= 3) return "Berawan Sebagian";
    if (weathercode <= 48) return "Berawan";
    if (weathercode <= 77) return "Hujan";
    if (weathercode <= 99) return "Badai Petir";
    return "Tidak Diketahui";
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('id-ID', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                Data Cuaca
              </span>
              <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded-full">
                Detail
              </span>
            </h1>
            <p className="text-gray-400 mt-1">
              Informasi cuaca komprehensif dan prakiraan
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <Link to="/" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Kembali ke Peta
            </Link>
          </div>
        </header>

        {/* Region Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Pilih Wilayah</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {regions.map((region) => (
              <button
                key={region}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedRegion === region
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                }`}
                onClick={() => {
                  setSelectedRegion(region);
                  // Pilih kota pertama dari wilayah ini
                  const firstCity = locations.find((loc) => loc.region === region);
                  if (firstCity) setSelectedLocation(firstCity.name);
                }}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Location Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Pilih Kota</h3>
          <div className="flex flex-wrap gap-2">
            {locations
              .filter((loc) => !selectedRegion || loc.region === selectedRegion)
              .map((loc) => (
                <button
                  key={loc.name}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedLocation === loc.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedLocation(loc.name)}
                >
                  {loc.name}
                </button>
              ))}
          </div>
        </div>
        
        {loading ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse">
            <div className="h-8 bg-gray-700 rounded-md w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-40 bg-gray-700 rounded-lg"></div>
              <div className="h-40 bg-gray-700 rounded-lg"></div>
              <div className="h-40 bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Current Weather Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="col-span-1 md:col-span-1">
                <div className="bg-gray-800 rounded-xl p-5 shadow-lg h-full">
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Kondisi Saat Ini</h3>
                  {forecastData?.current && (
                    <div className="flex flex-col items-center">
                      <div className="text-6xl mb-2">
                        {getWeatherEmoji(forecastData.current.weathercode)}
                      </div>
                      <div className="text-3xl font-bold mb-1">{forecastData.current.temperature}°C</div>
                      <div className="text-gray-400">{getWeatherLabel(forecastData.current.weathercode)}</div>
                      <div className="w-full border-t border-gray-700 my-4"></div>
                      <div className="grid grid-cols-2 gap-2 w-full text-sm">
                        <div>
                          <p className="text-gray-400">Kecepatan Angin</p>
                          <p className="font-medium">{forecastData.current.windspeed} km/jam</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Arah Angin</p>
                          <p className="font-medium">{forecastData.current.winddirection}°</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-3">
                <div className="bg-gray-800 rounded-xl p-5 shadow-lg h-full">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-300">Prakiraan {selectedLocation}</h3>
                    
                    <div className="flex rounded-lg bg-gray-700 overflow-hidden">
                      <button 
                        onClick={() => setActiveTab("daily")} 
                        className={`px-3 py-1 text-sm ${activeTab === "daily" ? "bg-blue-600 text-white" : "text-gray-300"}`}
                      >
                        Harian
                      </button>
                      <button 
                        onClick={() => setActiveTab("hourly")} 
                        className={`px-3 py-1 text-sm ${activeTab === "hourly" ? "bg-blue-600 text-white" : "text-gray-300"}`}
                      >
                        Per Jam
                      </button>
                      <button 
                        onClick={() => setActiveTab("details")} 
                        className={`px-3 py-1 text-sm ${activeTab === "details" ? "bg-blue-600 text-white" : "text-gray-300"}`}
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                  
                  {activeTab === "daily" && forecastData?.daily && (
                    <div className="overflow-x-auto">
                      <div className="flex space-x-4 pb-2">
                        {forecastData.daily.time.slice(0, 7).map((date, index) => (
                          <div key={date} className="flex-shrink-0 w-28 bg-gray-700 rounded-lg p-3 text-center">
                            <p className="text-sm font-medium mb-1">{formatDate(date)}</p>
                            <div className="text-2xl my-2">{getWeatherEmoji(forecastData.daily.weathercode[index])}</div>
                            <div className="flex justify-between text-sm px-1">
                              <span className="font-medium text-blue-300">{forecastData.daily.temperature_2m_min[index]}°</span>
                              <span className="font-medium">{forecastData.daily.temperature_2m_max[index]}°</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {forecastData.daily.precipitation_sum[index] > 0 
                                ? `${forecastData.daily.precipitation_sum[index]} mm` 
                                : "Tidak ada hujan"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "hourly" && forecastData?.hourly && (
                    <div className="overflow-x-auto">
                      <div className="flex space-x-3 pb-2">
                        {forecastData.hourly.time.slice(0, 24).map((time, index) => {
                          const hour = new Date(time).getHours();
                          // Only show every 3 hours
                          if (index % 3 !== 0) return null;
                          
                          return (
                            <div key={time} className="flex-shrink-0 w-16 bg-gray-700 rounded-lg p-2 text-center">
                              <p className="text-xs font-medium mb-1">{hour}:00</p>
                              <div className="text-xl my-1">{getWeatherEmoji(forecastData.hourly.weathercode[index])}</div>
                              <p className="font-medium text-sm">{forecastData.hourly.temperature_2m[index]}°</p>
                              <p className="text-xs text-gray-400 mt-1">{forecastData.hourly.precipitation[index]} mm</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "details" && forecastData?.hourly && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-sm text-gray-400 mb-1">Kelembaban</h4>
                        <p className="text-xl font-medium">{forecastData.hourly.relativehumidity_2m[0]}%</p>
                        <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${forecastData.hourly.relativehumidity_2m[0]}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-sm text-gray-400 mb-1">Tekanan</h4>
                        <p className="text-xl font-medium">{forecastData.hourly.pressure_msl[0]} hPa</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {forecastData.hourly.pressure_msl[0] > 1013 ? "Tekanan Tinggi" : "Tekanan Rendah"}
                        </p>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-sm text-gray-400 mb-1">Tutupan Awan</h4>
                        <p className="text-xl font-medium">{forecastData.hourly.cloudcover[0]}%</p>
                        <div className="w-full bg-gray-600 rounded-full h-1.5 mt-2">
                          <div className="bg-gray-400 h-1.5 rounded-full" style={{ width: `${forecastData.hourly.cloudcover[0]}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-sm text-gray-400 mb-1">Jarak Pandang</h4>
                        <p className="text-xl font-medium">{forecastData.hourly.visibility[0] / 1000} km</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {forecastData.hourly.visibility[0] > 10000 ? "Sangat Baik" : 
                           forecastData.hourly.visibility[0] > 5000 ? "Baik" : "Buruk"}
                        </p>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-sm text-gray-400 mb-1">Angin</h4>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" 
                               style={{ transform: `rotate(${forecastData.hourly.winddirection_10m[0]}deg)` }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          <p className="text-xl font-medium">{forecastData.hourly.windspeed_10m[0]} km/jam</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {forecastData.hourly.windspeed_10m[0] < 15 ? "Ringan" : 
                           forecastData.hourly.windspeed_10m[0] < 30 ? "Sedang" : "Kuat"}
                        </p>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-3">
                        <h4 className="text-sm text-gray-400 mb-1">Matahari Terbit / Terbenam</h4>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-yellow-400">↑ {formatTime(forecastData.daily.sunrise[0].split("T")[1])}</p>
                            <p className="text-xs text-blue-400">↓ {formatTime(forecastData.daily.sunset[0].split("T")[1])}</p>
                          </div>
                          <div className="text-2xl">🌓</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Weather Facts */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fakta Cuaca Indonesia
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weatherFacts.map((fact, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-4 shadow-lg hover:bg-gray-750 transition-colors duration-200">
                    <h4 className="text-lg font-medium mb-2 text-blue-300">{fact.title}</h4>
                    <p className="text-sm text-gray-300">{fact.content}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Data source information */}
            <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Tentang Data</h3>
              <p className="text-sm text-gray-300">
                Data cuaca ini disediakan oleh API Open-Meteo, yang menawarkan prakiraan akurat berdasarkan kombinasi
                model cuaca global dan regional. Data mencakup kondisi saat ini, prakiraan per jam untuk 7 hari,
                dan ringkasan harian untuk 34 kota di seluruh Indonesia. Parameter cuaca meliputi suhu, curah hujan, 
                angin, tutupan awan, tekanan, dan lainnya.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">Pembaruan data: Setiap 6 jam</span>
                <span className="text-gray-600 hidden md:inline">•</span>
                <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                  Sumber: Open-Meteo
                </a>
                <span className="text-gray-600 hidden md:inline">•</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                  {locations.length} kota di seluruh Indonesia
                </span>
              </div>
            </div>
          </>
        )}
        
        <footer className="mt-8 text-center text-sm text-gray-500 py-4 border-t border-gray-800">
          <p>
            Aplikasi GIS Cuaca © 2025 Angga Puspa  | Data cuaca disediakan oleh{" "}
            <a href="https://open-meteo.com/" className="text-blue-400 hover:underline">
              API Open-Meteo
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Menampilkan data dari {locations.length} kota di seluruh Indonesia dari Sabang sampai Merauke
          </p>
        </footer>
      </div>
    </div>
  );
};

export default WeatherData;