import document from "document";
import { inbox } from "file-transfer";
import { decode } from "cbor";
import fs from "fs";
import * as messaging from "messaging";


let meetupName = document.getElementById("meetup_name")
let meetupAddress = document.getElementById("meetup_address")
let meetupTime = document.getElementById("meetup_time")
let meetupLocationX = document.getElementById("meetup_location_x")
let meetupLocationY = document.getElementById("meetup_location_y")

inbox.onnewfile = () => {
  console.log("New file!");
  let fileName;
  do {
    // If there is a file, move it from staging into the application folder
    fileName = inbox.nextFile();
    if (fileName) {
      console.log(`Received File: <${fileName}>`);
      let data = decode(fs.readFileSync(fileName));
      meetupName.text = data.meetup_name;
      meetupAddress.text = data.meetup_address;
      meetupTime.text = data.meetup_time;
      meetupLocationX.text = data.meetup_location_x;
      meetupLocationY.text = data.meetup_location_y;
    
    }
  } while (fileName);
};

// - - - - - - - - - - Settings API - - - - - - - - - -
let background = document.getElementById("background");

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting background color: ${color}`);
    background.style.fill = color;
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};
