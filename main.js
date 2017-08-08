/*jshint esversion: 6 */
//var api = "https://fcc-weather-api.glitch.me/api/current?";

var data = {
  api: "https://fcc-weather-api.glitch.me/api/current?",
  lat: "",
  lon: "",
  weather: "",
  temp: "",
  location: "",
  navGeo: false,
  icon: "wi wi-day-rain",
  isCelsius: true
};

//Initialize Vue framework
new Vue({
  el: "#root",
  data: data,

  mounted() {
    if (navigator.geolocation) {
      //get users location through a browser prompt
      navigator.geolocation.getCurrentPosition(function(position) {
        this.data.navGeo = true;
        this.data.lat = "lat=" + position.coords.latitude;
        this.data.lon = "lon=" + position.coords.longitude;
        var apiParam = this.data.lat + "&" + this.data.lon;

        // GET request from Weather api
        axios.get(this.data.api + apiParam).then(response => {
          this.data.location =
            response.data.name + ", " + response.data.sys.country;
          this.data.weather = response.data.weather[0].main.toLowerCase();
          this.data.temp = response.data.main.temp;
          setWeatherIcon();
        });
        //Changing the icon
        function setWeatherIcon() {
          switch (this.data.weather) {
            case "drizzle":
              this.data.icon = "wi wi-day-sprinkle";
              break;
            case "clouds":
              this.data.icon = "wi wi-cloudy";
              break;
            case "rain":
              this.data.icon = "wi wi-day-rain";
              break;
            case "snow":
              this.data.icon = "wi wi-day-snow";
              break;
            case "clear":
              this.data.icon = "wi wi-day-sunny-overcast";
              break;
            case "thunderstorm":
              this.data.icon = "wi wi-day-thunderstorm";
              break;
            default:
              this.data.icon = "wi wi-day-rain";
          }
        }
      });
    } else {
      alert("Your location can't be obtained from this browser.");
    }
  },
  methods: {
    /**
    * this helps change temperature from celsius to fahrenheit
    */
    changeToFahrenheit: function() {
      if (this.isCelsius) {
        this.temp = this.temp * 9 / 5 + 32;
        this.temp = Math.round(this.temp * 10) / 10; //Math.round( number * 10 ) / 10;
        this.isCelsius = false;
      } else {
        this.temp = 5 / 9 * (this.temp - 32);
        this.temp = Math.round(this.temp * 10) / 10;
        this.isCelsius = true;
      }
    }
  }
});
