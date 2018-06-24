import { outbox } from "file-transfer";
import { encode } from "cbor";
import * as messaging from "messaging";
import { settingsStorage } from "settings";


function sendFile() {
  console.log("Sending file...");
  let data = {
    "meetup_name" : "Meetup2",
    "meetup_address" : "Berlin",
    "meetup_time" : "2018-06-23T14:04:42Z",
    "meetup_location_x" : 15.0123,
    "meetup_location_y" : 0.0321 
  };
  outbox.enqueue("meetups.txt", encode(data));
}

setTimeout(sendFile, 2000);

fetch('http://segamegadrive.pythonanywhere.com/getevents/meetups/?format=json').then(function(response) {
      return response.text();
    }).then(function(text) {
      console.log("Got JSON response from server: " + text); });

// - - - - - - - - - - Settings API - - - - - - - - - - - 
// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
