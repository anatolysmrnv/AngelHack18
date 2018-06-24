import { geolocation } from "geolocation";

function locationSuccess(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(`Latitude: ${lat}\nLongitude: ${lon}`);
}

function locationError(error) {
  console.log(`Error: ${error.code}\nMessage: ${error.message}`);
}

let watcherID = geolocation.watchPosition(locationSuccess, locationError);
