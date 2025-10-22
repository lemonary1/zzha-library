<template>
  <main class="container">
    <div class="header">
      <h1>WEATHER APP</h1>

      <div class="search-bar">
        <input
          type="text"
          v-model.trim="city"
          placeholder="Enter city name"
          class="search-input"
          @keyup.enter="searchByCity"
        />
        <button class="search-button" @click="searchByCity">Search</button>
        <button class="loc-button" @click="fetchCurrentLocationWeather">Use my location</button>
      </div>
    </div>

    <!-- 没有数据不展示 -->
    <div v-if="weatherData" id="weatherData" class="card">
      <h2 class="place">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>

      <img v-if="iconUrl" :src="iconUrl" alt="Weather Icon" class="icon" width="80" height="80" />

      <div class="temp">{{ temperature }} °C</div>
      <span class="desc">{{ weatherData.weather[0].description }}</span>
      <div class="meta">
        <span>Wind: {{ Math.round(weatherData.wind.speed) }} m/s</span>
        <span>Humidity: {{ weatherData.main.humidity }}%</span>
      </div>
    </div>

    <div v-if="loading" class="hint">Loading…</div>
    <div v-if="error" class="hint error">{{ error }}</div>
  </main>
</template>

<script>
import axios from 'axios'

const apikey = import.meta.env.VITE_OWM_KEY || '' // 从 .env 读取

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null,
      loading: false,
      error: '',
    }
  },
  computed: {
    // 摄氏温度（如果没加 units=metric，可用开尔文→摄氏公式；此处我们用 metric，更准确）
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null
    },
    // 天气图标
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null
    },
  },
  mounted() {
    // 页面加载默认取当前定位天气（满足作业演示图）
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async searchByCity() {
      this.error = ''
      if (!this.city) {
        this.error = 'Please enter a city.'
        return
      }
      if (!apikey) {
        this.error = 'Missing OpenWeatherMap API key.'
        return
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}&appid=${apikey}&units=metric`
      await this.fetchWeatherData(url)
    },

    async fetchCurrentLocationWeather() {
      this.error = ''
      if (!navigator.geolocation) {
        this.error = 'Geolocation not supported by this browser.'
        return
      }
      try {
        this.loading = true
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          }),
        )
        const { latitude, longitude } = pos.coords
        if (!apikey) {
          this.error = 'Missing OpenWeatherMap API key.'
          return
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
        await this.fetchWeatherData(url)
      } catch (e) {
        this.error = e?.message || 'Failed to get location.'
      } finally {
        this.loading = false
      }
    },

    async fetchWeatherData(url) {
      try {
        this.loading = true
        const res = await axios.get(url)
        this.weatherData = res.data
        this.city = this.weatherData?.name || this.city // 反显城市名
      } catch (e) {
        this.weatherData = null
        this.error = 'Failed to fetch weather. Check city name or API key.'
        // 控制台保留详细错误便于排查
        console.error('[weather]', e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 560px;
  margin: 2rem auto;
  text-align: center;
}
.header h1 {
  margin-bottom: 1rem;
  letter-spacing: 2px;
}
.search-bar {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.search-input {
  padding: 0.5rem 0.75rem;
  width: 260px;
}
.search-button,
.loc-button {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
.card {
  margin-top: 1.25rem;
  padding: 1.25rem;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
}
.place {
  margin: 0 0 0.5rem;
  font-weight: 600;
}
.icon {
  display: block;
  margin: 0.25rem auto;
}
.temp {
  font-size: 2rem;
  margin: 0.25rem 0;
}
.desc {
  text-transform: capitalize;
  color: #555;
}
.meta {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  color: #666;
  font-size: 0.95rem;
}
.hint {
  margin-top: 1rem;
  color: #666;
}
.hint.error {
  color: #c00;
}
</style>
