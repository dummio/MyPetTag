//import emailjs
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";

import { getCurrentUserEmail, getEmailAlertStatus } from "./firebaseCommands";

init(process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY);

export async function sendFoundPetEmail(userID, lat, lon) {
  console.log("send email");
  let currUserEmail = await getCurrentUserEmail(userID);
  let template = {
    email: currUserEmail,
    message: `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}`,
  };
  emailjs
    .send(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      process.env.REACT_APP_EMAIL_JS_LOST_PET_TEMPLATE,
      template,
      process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
}
