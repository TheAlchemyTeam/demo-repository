// const API_KEY = '你的天气API密钥'; // 替换为你的API密钥
// const CITY = '北京'; // 你想查询的城市

// function toggleDropdown() {
//     document.getElementById("dropdown-content").classList.toggle("show");
// }

// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//         const dropdowns = document.getElementsByClassName("dropdown-content");
//         for (let i = 0; i < dropdowns.length; i++) {
//             const openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }

// function openUserSettings() {
//     alert('打开用户设置界面...');
// }

// function logout() {
//     alert('已登出！');
// }

// document.addEventListener("DOMContentLoaded", function() {
//     fetchWeatherData();
// });

// async function fetchWeatherData() {
//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=zh`);
//         const weatherData = await response.json();
//         displayWeatherData(weatherData);
//     } catch (error) {
//         console.error('获取天气数据失败:', error);
//         document.getElementById("weather-details").innerText = '天气数据加载失败。';
//     }
// }

// function displayWeatherData(data) {
//     const temperature = data.main.temp;
//     const weatherCondition = data.weather[0].description;
//     const city = data.name;

//     document.getElementById("weather-details").innerText = `当前位置：${city}，温度：${temperature}°C，天气：${weatherCondition}`;
    
//     const specialWeather = getSpecialWeather(data);
//     document.getElementById("special-weather").innerHTML = specialWeather;
// }

// function getSpecialWeather(data) {
//     let specialWeather = '';
    
//     if (data.weather[0].id === 200) {
//         specialWeather = '当前有雷暴天气，请注意安全！';
//     } else if (data.weather[0].id === 721) {
//         specialWeather = '当前有沙尘暴，建议佩戴口罩！';
//     } else if (data.weather[0].id === 902) {
//         specialWeather = '警报：当前有台风，建议尽量待在室内！';
//     } else if (data.weather[0].id === 901) {
//         specialWeather = '警报：当前有冰雹天气，请小心！';
//     }

//     if (specialWeather) {
//         specialWeather += ' 预计天气将在3小时内恢复正常。';
//     }

//     return specialWeather;
// }

const API_KEY = '你的天气API密钥'; // 替换为你的API密钥
const CITY = '北京'; // 你想查询的城市

function toggleDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function openUserSettings() {
    alert('打开用户设置界面...');
}

function logout() {
    alert('已登出！');
}

document.addEventListener("DOMContentLoaded", function() {
    fetchWeatherData();
});

async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=zh`);
        const weatherData = await response.json();
        displayWeatherData(weatherData);
        generateForecastCards(weatherData);
    } catch (error) {
        console.error('获取天气数据失败:', error);
        document.getElementById("weather-details").innerText = '天气数据加载失败。';
    }
}

function displayWeatherData(data) {
    const temperature = data.main.temp;
    const weatherCondition = data.weather[0].description;
    const city = data.name;

    document.getElementById("weather-details").innerText = `当前位置：${city}，温度：${temperature}°C，天气：${weatherCondition}`;
    
    const specialWeather = getSpecialWeather(data);
    document.getElementById("special-weather").innerHTML = specialWeather;

    const iconId = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("weather-icon").innerHTML = `<img src="${iconId}" alt="Weather Icon">`;
}

function getSpecialWeather(data) {
    let specialWeather = '';
    
    if (data.weather[0].id === 200) {
        specialWeather = '当前有雷暴天气，请注意安全！';
    } else if (data.weather[0].id === 721) {
        specialWeather = '当前有沙尘暴，建议佩戴口罩！';
    } else if (data.weather[0].id === 902) {
        specialWeather = '警报：当前有台风，建议尽量待在室内！';
    } else if (data.weather[0].id === 901) {
        specialWeather = '警报：当前有冰雹天气，请小心！';
    }

    if (specialWeather) {
        specialWeather += ' 预计天气将在3小时内恢复正常。';
    }

    return specialWeather;
}

async function searchWeather() {
    const city = document.getElementById("city-search").value;
    if (city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=zh`);
            const weatherData = await response.json();
            displayWeatherData(weatherData);
            generateForecastCards(weatherData);
            CITY = city;
        } catch (error) {
            console.error('搜索天气数据失败:', error);
            document.getElementById("weather-details").innerText = '天气数据加载失败。';
        }
    }
}

async function generateForecastCards(data) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${API_KEY}&units=metric&lang=zh`;
    try {
        const response = await fetch(forecastUrl);
        const forecastData = await response.json();
        const forecastCards = document.getElementById("forecast-cards");
        forecastCards.innerHTML = ''; // Clear existing cards

        for (let i = 0; i < forecastData.list.length; i += 8) { // Every 8th item is the same day
            const dayData = forecastData.list[i];
            const card = document.createElement("div");
            card.className = "forecast-card";
            card.innerHTML = `
                <h4>${new Date(dayData.dt * 1000).toLocaleDateString('zh-CN', { weekday: 'long' })}</h4>
                <p>温度：${dayData.main.temp}°C</p>
                <p>天气：${dayData.weather[0].description}</p>
                <img src="http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" alt="Weather Icon">
            `;
            forecastCards.appendChild(card);
        }
    } catch (error) {
        console.error('生成天气预报卡片失败:', error);
    }
}

document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('show');
});