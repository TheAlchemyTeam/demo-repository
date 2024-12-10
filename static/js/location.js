window.addEventListener("load", () => {
    // 检查是否可以使用Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser.");
      // 默认启用手动输入模式
    }
  
    function success(position) {
      const { latitude, longitude } = position.coords;
  
      // 使用Nominatim API根据经纬度获取城市名
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then((response) => response.json())
        .then((data) => {
          const city = data.address.city || data.address.town || data.address.village;
  
          if (city) {
            // 将获取到的城市名填入搜索框，并自动查询天气
            document.querySelector(".search-bar").value = city;
            weather.fetchWeather(city);
          } else {
            alert("无法获取您的城市信息，请手动输入城市名！");
          }
        })
        .catch(() => {
          alert("位置查询失败！");
        });
    }
  
    function error() {
      alert("位置查询失败！");
      // 默认启用手动输入模式
    }
  });
  
