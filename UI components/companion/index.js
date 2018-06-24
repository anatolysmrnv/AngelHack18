import { outbox } from "file-transfer";
import { encode } from "cbor";

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

