// let weather = {
//   apiKey: "13e786b2255800d48474a6fdbcd071dc",
//   autoLocation: true, // 标志变量，控制是否启用自动定位

//   fetchWeather: function (city) {
//     fetch(
//       "https://api.openweathermap.org/data/2.5/weather?q=" +
//         city +
//         "&units=metric&appid=" +
//         this.apiKey
//     )
//       .then((response) => response.json())
//       .then((data) => this.displayWeather(data))
//       .catch((error) => {
//         console.error("获取天气数据失败:", error);
//         alert("无法获取该城市的天气，请检查输入的城市名称！");
//       });
//   },

//   displayWeather: function (data) {
//     if (data.cod === "404") {
//       alert("找不到城市，请输入有效的城市名称！");
//       return;
//     }

//     const { name } = data;
//     const { icon, description } = data.weather[0];
//     const { temp, humidity } = data.main;
//     const { speed } = data.wind;

//     document.querySelector(".city").innerText = "Weather in " + name;
//     document.querySelector(".icon").src =
//       "https://openweathermap.org/img/wn/" + icon + ".png";
//     document.querySelector(".description").innerText = description;
//     document.querySelector(".temp").innerText = temp + "°C";
//     document.querySelector(".humidity").innerText =
//       "湿度: " + humidity + "%";
//     document.querySelector(".wind").innerText =
//       "风速: " + speed + " km/h";
//     document.querySelector(".weather").classList.remove("loading");

//     // 使用本地图片作为背景
//     const cityImages = {
//       "Shanghai": "shanghai.png",
//       "Wuhan": "wuhan.png",
//       "Beijing": "beijing.png",
//       "Changsha": "changsha.png",
//       "Shenzhen": "shenzhen.png",
//       "Hangzhou": "hangzhou.png",	  
//       "Guangzhou": "guangzhou.png",
//       "Qingdao": "qingdao.png",
//       "Hong Kong": "HongKong.png",
//       "San Francisco": "San Francisco.png",
//       "London": "London.png",
//       "Miami": "Miami.png",
//       "New York": "New York.png"
//     };

//     const defaultImages = [
//       "default.png",
//       "default1.png",
//       "default2.png",
//       "default3.png",
//       "default4.png",
//       "default5.png",
//       "default6.png"
//     ];

//     const imageName = cityImages[name] || defaultImages[Math.floor(Math.random() * defaultImages.length)];

//     // 创建一个临时的图片对象来检测图片是否加载完成
//     const img = new Image();
//     img.src = `img/${imageName}`;
//     img.onload = function () {
//       document.body.style.backgroundImage = `url('img/${imageName}')`;
//       document.body.classList.add('loaded'); // 渐入效果
//     };

//     // 启用搜索栏和按钮
//     document.querySelector(".search-bar").disabled = false;
//     document.querySelector(".search button").disabled = false;
//   },

//   search: function () {
//     const searchBar = document.querySelector(".search-bar");
//     const city = searchBar.value.trim();
//     if (city) {
//       this.fetchWeather(city);
//     } else {
//       alert("请输入有效的城市名称！");
//     }
//   },
// };

// // 页面加载时检查是否启用自动定位
// window.addEventListener('load', function() {
//   if (weather.autoLocation) {
//     fetchLocationWeather(); // 调用自动定位函数
//     weather.autoLocation = false; // 完成自动定位后，关闭自动定位模式
//   }
// });

// // 初始禁用搜索栏和按钮，自动定位完成后再启用
// document.querySelector(".search-bar").disabled = true;
// document.querySelector(".search button").disabled = true;

// document.querySelector(".search button").addEventListener("click", function () {
//   weather.search();
// });

// document.querySelector(".search-bar").addEventListener("keyup", function (event) {
//   if (event.key === "Enter") {
//     weather.search();
//   }
// });

// // 实时更新时间函数
// function updateClock() {
//   const now = new Date();
//   const timeString = now.toLocaleTimeString();
//   document.getElementById('clock').innerText = timeString;
// }

// // 每秒更新时间
// setInterval(updateClock, 1000);

// // Function to scroll to the top
// function scrollToTop() {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// // Show the button when scrolling down
// window.onscroll = function () {
//   const button = document.getElementById("scrollToTop");
//   if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//     button.style.display = "block"; // 显示按钮
//   } else {
//     button.style.display = "none"; // 隐藏按钮
//   }
// };




let weather = {
  apiKey: "13e786b2255800d48474a6fdbcd071dc",
  cities: [
    "Shanghai", "Wuhan", "Beijing", "Changsha", "Shenzhen", "Hangzhou",
    "Guangzhou", "Qingdao", "Hong Kong", "San Francisco", "London", 
    "Miami", "New York", "Tokyo", "Los Angeles", "Sydney", "Berlin"
    // 可以添加更多城市
  ],
  autoLocation: true, // 标志变量，控制是否启用自动定位

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "湿度: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "风速: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // 使用本地图片作为背景
    const cityImages = {
      "Shanghai": "shanghai.png",
      "Wuhan": "wuhan.png",
      "Beijing": "beijing.png",
      "Changsha": "changsha.png",
      "Shenzhen": "shenzhen.png",
      "Hangzhou": "hangzhou.png",
      "Guangzhou": "guangzhou.png",
      "Qingdao": "qingdao.png",
      "Hong Kong": "HongKong.png",
      "San Francisco": "San Francisco.png",
      "London": "London.png",
      "Miami": "Miami.png",
      "New York": "New York.png",
      "Los Angeles": "losangeles.png",
      "Sydney": "sydney.png",
      "Berlin": "berlin.png"
      // 可以添加更多城市和对应图片
    };

    const defaultImages = [
      "default.png",
      "default1.png",
      "default2.png",
      "default3.png",
      "default4.png",
      "default5.png",
      "default6.png"
    ];

    const imageName = cityImages[name] || defaultImages[Math.floor(Math.random() * defaultImages.length)]; // 如果城市没有对应图片，使用默认图片
    document.body.style.backgroundImage =`url('img/${imageName}')`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover"; 
    document.body.style.backgroundAttachment = "fixed"; 

    // 创建一个临时的图片对象来检测图片是否加载完成
    const img = new Image();
    img.src = `img/${imageName}`;
    img.onload = function () {
      document.body.style.backgroundImage = `url('img/${imageName}')`;
      document.body.classList.add('loaded');
    }
  },

  search: function () {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
    this.hideSuggestions(); // 隐藏建议
  },

  showSuggestions: function (input) {
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = ""; // 清空之前的建议

    const filteredCities = this.cities.filter(city => city.toLowerCase().startsWith(input.toLowerCase())).slice(0, 7); // 过滤匹配的城市

    if (filteredCities.length === 0) {
      suggestionsContainer.style.display = "none"; // 隐藏建议
      return;
    }

    filteredCities.forEach(city => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.innerText = city;

      suggestionItem.onclick = () => {
        document.querySelector(".search-bar").value = city; // 点击城市后填入搜索框
        this.fetchWeather(city);
        this.hideSuggestions(); // 隐藏建议
      };

      suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.style.display = filteredCities.length ? "block" : "none"; // 显示或隐藏建议
  },

  hideSuggestions: function () {
    document.getElementById("suggestions").style.display = "none"; // 隐藏建议
  },
};

// 事件监听
document.querySelector(".search-bar").addEventListener("input", function () {
  const input = this.value.trim();
  if (input) {
    weather.showSuggestions(input);
  } else {
    weather.hideSuggestions();
  }
});

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Shanghai");

// 实时更新时间函数
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').innerText = timeString;
}

// Function to scroll to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show the button when scrolling down
window.onscroll = function () {
  const button = document.getElementById("scrollToTop");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    button.style.display = "block"; // 显示滑块
  } else {
    button.style.display = "none"; // 隐藏滑块
  }
};

// 每秒更新时间
setInterval(updateClock, 1000);
