import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";

const WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const DEFAULT_CITY = "Kolkata";

export default function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (queryCity = DEFAULT_CITY) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching weather for:", queryCity);
      if (!WEATHER_API_KEY) {
        console.warn("Weather API key is missing!");
        setError("API key is missing");
        setWeather(null);
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        queryCity
      )}&appid=${WEATHER_API_KEY}&units=metric`;
      console.log("Request URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("Weather API response:", data);
      // openweather returns cod as number or string
      if(data.cod && Number(data.cod) !== 200){
        setError(data.message || "City not found");
        setWeather(null);
      }else{
        setWeather(data);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Network error");
      setWeather(null)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, []);

  const onSearch = () => {
    Keyboard.dismiss();
    fetchWeather(city.trim () || DEFAULT_CITY)
    // trying to become defensive in case the city is not a string
    const query = String(city ?? "").trim() || DEFAULT_CITY
    fetchWeather(query);
  }
  return (
    <ImageBackground
      source={require("./assets/weather-bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style = {styles.searchRow}>
          <TextInput value={city}
          onChange={setCity}
          onChangeText={setCity}
          placeholder="Enter city"
          placeholderTextColor="#ccc"
          style = {styles.input}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          />
           <TouchableOpacity style={styles.button} onPress={onSearch}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : weather && weather.main ? (
                    <>
                        <Text style={styles.city}>{weather.name}</Text>
                        <Text style={styles.temp}>
                            {Math.round(weather.main.temp)}°C
                        </Text>
                        <Text style={styles.desc}>
                            {weather.weather[0].description}
                        </Text>
                        <Text style={styles.details}>
                            Humidity: {weather.main.humidity}% | Wind:{" "}
                            {weather.wind?.speed ?? "-"} m/s
                        </Text>
                    </>
                ) : (
                    <Text style={styles.error}>Unable to load weather data</Text>
                )}
            </View>
            <StatusBar style="light" />
        </ImageBackground>
    
  );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    searchRow: {
        width: "100%",
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 44,
        backgroundColor: "rgba(255,255,255,0.08)",
        color: "#fff",
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    button: {
        backgroundColor: "#1e90ff",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },
    city: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    temp: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 10,
    },
    desc: {
        fontSize: 20,
        fontStyle: "italic",
        color: "#f0f0f0",
        marginBottom: 10,
    },
    details: {
        fontSize: 16,
        color: "#ddd",
    },
    error: {
        fontSize: 18,
        color: "#ffcccc",
        textAlign: "center",
    },
});

