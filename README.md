# OpenWeather App

A simple React Native (Expo) app that fetches and displays current weather for a city using the OpenWeather API. Users can enter a city name and view temperature, description, humidity and wind speed.

## Features
- City search input with keyboard dismissal
- Current temperature (°C), weather description, humidity and wind speed
- Loading and error states
- Background image with overlay

## Prerequisites
- Node.js (v14+)
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- OpenWeather API key

## Environment
Create a `.env` file at the project root (do NOT commit this file):

EXAMPLE `.env` contents:
```text
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

Add a safe example file to the repo:
```text
// .env.example
EXPO_PUBLIC_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_KEY_HERE
```

Ensure `.gitignore` includes:
```text
.env
.env.*
node_modules/
.expo/
```

## Installation
```bash
git clone <repository-url>
cd OpenWeather_App
npm install
```

If you use Git Bash on Windows:
```bash
cd "/c/Users/Motiar Rahaman/OneDrive/Desktop/JavaScript/React-Native/OpenWeather_App"
```

## Running (Development)
```bash
# start Metro / Expo
npx expo start

# clear cache if you hit issues
npx expo start -c
```

Open the app with Expo Go on your device or run on an emulator.

## Usage
- Enter a city name in the search input and press Search (or Enter).
- The app validates input and falls back to a default city if the input is empty.
- Errors (missing API key, network issues or invalid city) are shown as messages on screen.

## Debugging
- Check Metro/Expo logs for console.log outputs:
  - Request URL
  - API responses
  - Warnings about missing API key
- Common causes of a white/blank screen:
  - Missing or improperly loaded API key (verify `.env` and expo env plugin or `@env` import)
  - Runtime exception in component — check device logs in Expo Go or Metro terminal
- To verify .env is ignored:
```bash
git check-ignore -v .env
```

If `.env` was accidentally committed:
1. Rotate the exposed keys immediately.
2. Remove from history (use `git filter-repo` or BFG) and force-push; coordinate with collaborators.

## Project Structure (important files)
- `App.js` — main app component (search input, fetch logic, UI)
- `assets/weather-bg.jpg` — background image
- `.env.example` — example environment file (no secrets)
- `.gitignore` — ensure `.env` is ignored

## Contributing
- Fork and create a feature branch
- Keep `.env` out of commits; update `.env.example` instead
- Add tests for new logic where possible
- Open a PR with a clear description

## License
Specify your license (e.g., MIT) here.

## Last updated
September 10,