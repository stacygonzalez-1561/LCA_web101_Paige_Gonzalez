function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayPosition)
    } else {
        document.getElementById("cord").innerHTML = "Not Available"
    }
}
  function displayPosition(position) {
      document.getElementById("cord").innerHTML = "Longitude: " + position.coords.longitude + "Latitude: " + position.coords.latitude
  }