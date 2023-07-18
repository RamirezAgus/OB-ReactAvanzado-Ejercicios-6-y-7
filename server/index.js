const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

// Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Constantes
const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/cJicQAbrDfI:APA91bEFhgd2D6GtZCYlPaMr1Zrc6THY2stmNDj1HGlSRCIu1dRJZ8Y1fJYCyy0Si8t2hns8MmSNZ8DqRcKq_kTKimLw0pxjYrXFVPFk6eSxCu4iZWXauAWPbB0xEk0sAwHI-wI9Y2Vn',
    expirationTime: null,
    keys: {
        p256dh: 'BNT_dN5EnmLibcCcAQMj7m9tvtjiGyrP7lSysoNEk-8RjQ4N1g733ybXqiryq7AZcp1CufoThKf6ss-ZJVO2mSI',
        auth: 'QAtCkNZTYUogyzHblelA4g'
        }
    }


    const vapidKeys = {
        publicKey: "BEpnkWlmmPWoV5ukkoqOZWGtXGI_R6euH-1obRm1PxenBfTvIQgLMwdBm9vgsXBD19gTjdEbU0Elq8I0chUDKgo",
        privateKey: "1uWKIhZofnXngMcxZ6cS4L5ryjiltDp-n4uuZr6ImtY"
      
      }

webpush.setVapidDetails(
  'mailto:rlagustin0@gmail.com.',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Routes
app.get('/', async (req, res) => {
  //console.log(req.body);
  const payload = JSON.stringify({ title: "Título de Notificación", message: "Mensaje de la notificación" });
  try {
      await webpush.sendNotification(pushSubscription, payload);
      await res.send(payload);
  } catch (e) { console.error(e) }
});

app.post('/message', async (req, res) => {
  const { title, message} = req.body;
  const payload = JSON.stringify({ title: title, message: message });
  try {
      await webpush.sendNotification(pushSubscription, payload)    
  } catch (error) {
      console.error(error)        
  }
})

app.post('/subscription', (req, res) => {
  console.log(req.body);
  res.sendStatus(200).json();
})

app.listen(3001, () => console.log("Server listening on port 3001"))
