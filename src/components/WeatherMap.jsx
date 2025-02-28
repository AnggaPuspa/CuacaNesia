import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../Map.css";

// Icon marker default
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Komponen untuk mengubah tampilan peta
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const WeatherMap = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({
    lat: -8.65,
    lon: 115.22,
    name: "Denpasar",
    region: "Bali & Nusa Tenggara"
  }); // Default Denpasar
  const [loading, setLoading] = useState(true);
  const [mapType, setMapType] = useState("street"); // jalan, satelit, medan
  const [allWeatherData, setAllWeatherData] = useState({});
  const [selectedRegion, setSelectedRegion] = useState("Bali & Nusa Tenggara");

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

  // Mengambil data cuaca untuk lokasi saat ini
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Error mengambil data cuaca:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [location]);

  // Mengambil data cuaca untuk semua lokasi
  useEffect(() => {
    const fetchAllWeatherData = async () => {
      const data = {};
      for (const loc of locations) {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true`
          );
          const result = await response.json();
          data[loc.name] = result.current_weather;
        } catch (error) {
          console.error(`Error mengambil cuaca untuk ${loc.name}:`, error);
        }
      }
      setAllWeatherData(data);
    };
    fetchAllWeatherData();
  }, []);

  const getWeatherEmoji = (temperature, weathercode) => {
    if (weathercode === 0) return "☀️"; // Cerah
    if (weathercode <= 3) return "🌤️"; // Berawan sebagian
    if (weathercode <= 48) return "☁️"; // Berawan
    if (weathercode <= 77) return "🌧️"; // Hujan
    if (weathercode <= 99) return "⛈️"; // Badai petir

    // Fallback berdasarkan suhu
    if (temperature > 30) return "🔥";
    if (temperature > 20) return "☀️";
    if (temperature > 10) return "🌤️";
    return "❄️";
  };

  const getWeatherLabel = (weathercode) => {
    if (weathercode === 0) return "Cerah";
    if (weathercode <= 3) return "Berawan Sebagian";
    if (weathercode <= 48) return "Berawan";
    if (weathercode <= 77) return "Hujan";
    if (weathercode <= 99) return "Badai Petir";
    return "Tidak Diketahui";
  };

  const getCardColor = (weathercode) => {
    if (weathercode === 0) return "from-yellow-400 to-orange-500"; // Cerah
    if (weathercode <= 3) return "from-blue-400 to-blue-500"; // Berawan sebagian
    if (weathercode <= 48) return "from-gray-400 to-gray-500"; // Berawan
    if (weathercode <= 77) return "from-blue-600 to-blue-700"; // Hujan
    if (weathercode <= 99) return "from-indigo-700 to-indigo-900"; // Badai petir
    return "from-blue-500 to-blue-600"; // Default
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                GIS Cuaca
              </span>
              <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded-full">
                Beta
              </span>
            </h1>
            <p className="text-gray-400 mt-1">
              Informasi cuaca & pemetaan waktu nyata
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="flex items-center space-x-1 px-3 py-1 bg-gray-800 rounded-full">
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-300">Data Langsung</span>
            </div>

            {/* Navigasi ke halaman data */}
            <Link to="/data" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Lihat Data
            </Link>

            {/* Pemilih Tipe Peta */}
            <div className="bg-gray-800 px-2 py-1 rounded-md flex items-center space-x-2">
              <button
                className={`px-2 py-1 rounded text-sm ${
                  mapType === "street"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setMapType("street")}
              >
                Jalan
              </button>
              <button
                className={`px-2 py-1 rounded text-sm ${
                  mapType === "satellite"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setMapType("satellite")}
              >
                Satelit
              </button>
              <button
                className={`px-2 py-1 rounded text-sm ${
                  mapType === "terrain"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setMapType("terrain")}
              >
                Medan
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kolom Kiri - Info Cuaca */}
          <div className="md:col-span-1 space-y-6">
            {/* Cuaca Lokasi Saat Ini */}
            <div
              className={`relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r ${
                weather && !loading
                  ? getCardColor(weather.weathercode)
                  : "from-blue-500 to-blue-600"
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"></div>

              <div className="relative p-6">
                {weather && !loading ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{location.name}</h2>
                        <p className="text-sm opacity-80">
                          {getWeatherLabel(weather.weathercode)}
                        </p>
                      </div>
                      <span className="text-5xl">
                        {getWeatherEmoji(
                          weather.temperature,
                          weather.weathercode
                        )}
                      </span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white border-opacity-30">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm opacity-80">Suhu</p>
                          <p className="text-4xl font-bold">
                            {weather.temperature}°C
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-80">Angin</p>
                          <div className="flex items-center space-x-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              style={{
                                transform: `rotate(${weather.winddirection}deg)`,
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                            <p className="text-xl font-semibold">
                              {weather.windspeed} km/jam
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="animate-pulse space-y-4">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <div className="h-6 w-20 bg-white bg-opacity-30 rounded"></div>
                        <div className="h-4 w-16 bg-white bg-opacity-30 rounded"></div>
                      </div>
                      <div className="h-12 w-12 bg-white bg-opacity-30 rounded-full"></div>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white border-opacity-20">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <div className="h-4 w-16 bg-white bg-opacity-30 rounded"></div>
                          <div className="h-8 w-12 bg-white bg-opacity-30 rounded"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-10 bg-white bg-opacity-30 rounded"></div>
                          <div className="h-6 w-16 bg-white bg-opacity-30 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pemilih Wilayah */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4">
              <h3 className="text-lg font-semibold mb-3">Pilih Wilayah</h3>
              <div className="grid grid-cols-2 gap-2">
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
                      if (firstCity) setLocation(firstCity);
                    }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Pemilih Lokasi */}
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Pilih Kota</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {locations
                  .filter((loc) => loc.region === selectedRegion)
                  .map((loc) => (
                    <button
                      key={loc.name}
                      className={`p-3 rounded-lg flex items-center justify-between transition-all duration-200 ${
                        location.name === loc.name
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                      }`}
                      onClick={() => setLocation(loc)}
                    >
                      <span>{loc.name}</span>
                      {allWeatherData[loc.name] && (
                        <div className="flex items-center">
                          <span>
                            {getWeatherEmoji(
                              allWeatherData[loc.name].temperature,
                              allWeatherData[loc.name].weathercode
                            )}
                          </span>
                          <span className="ml-2 font-medium">
                            {allWeatherData[loc.name].temperature}°
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Peta */}
          <div className="md:col-span-2">
            <div className="bg-gray-800 p-3 rounded-2xl shadow-lg">
              {/* Judul Peta */}
              <div className="flex justify-between items-center mb-3 px-2">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <span className="font-medium">Peta Cuaca Interaktif</span>
                </div>
                <div className="text-sm text-gray-400">
                  <span>Lat: {location.lat.toFixed(4)}</span>
                  <span className="mx-1">|</span>
                  <span>Lon: {location.lon.toFixed(4)}</span>
                </div>
              </div>

              {/* Kontainer Peta */}
              <div className="relative h-[500px] overflow-hidden rounded-xl map-container">
                {typeof window !== "undefined" && (
                  <MapContainer
                    key={`map-${location.name}`} /* Key membantu memaksa render ulang */
                    center={[location.lat, location.lon]}
                    zoom={9}
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    zoomControl={false}
                  >
                    <ChangeMapView
                      center={[location.lat, location.lon]}
                      zoom={9}
                    />

                    {/* Selalu memiliki lapisan dasar yang dimuat */}
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />

                    {/* Lapisan ubin tambahan berdasarkan tipe peta */}
                    {mapType === "satellite" && (
                      <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP"
                      />
                    )}

                    {mapType === "terrain" && (
                      <TileLayer
                        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        attribution="Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap"
                      />
                    )}

                    {/* Tempatkan penanda untuk semua lokasi */}
                    {locations.map((loc) => {
                      const locWeather = allWeatherData[loc.name];
                      return (
                        <Marker
                          key={loc.name}
                          position={[loc.lat, loc.lon]}
                          icon={defaultIcon}
                        >
                          <Popup>
                            <div className="text-center py-2 px-1 text-black">
                              <p className="font-bold text-lg">{loc.name}</p>
                              <p className="text-xs text-gray-600">{loc.region}</p>
                              {locWeather ? (
                                <>
                                  <div className="flex items-center justify-center space-x-2 my-1">
                                    <span className="text-xl">
                                      {getWeatherEmoji(
                                        locWeather.temperature,
                                        locWeather.weathercode
                                      )}
                                    </span>
                                    <span className="font-semibold text-xl">
                                      {locWeather.temperature}°C
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {getWeatherLabel(locWeather.weathercode)}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    Angin: {locWeather.windspeed} km/jam
                                  </p>
                                </>
                              ) : (
                                <p>Memuat data cuaca...</p>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}

                    <ZoomControl position="bottomright" />
                  </MapContainer>
                )}

                {/* Overlay indikator lokasi */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm px-3 py-2 rounded-full shadow-lg z-[1000]">
                  <div className="flex items-center space-x-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{location.name}, Indonesia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500 py-4 border-t border-gray-800">
          <p>
            Aplikasi GIS Cuaca © 2025 by Angga Puspa | Data cuaca disediakan oleh{" "}
            <a
              href="https://open-meteo.com/"
              className="text-blue-400 hover:underline"
            >
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

export default WeatherMap;