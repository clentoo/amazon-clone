const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    // eslint-disable-next-line max-len
    "sk_test_51IGgoQBF1dI3cn0WjtB9CXftIbTYySlfraiyESSIBiPgzzsk7aF9IeEwl7W16xUflh4K8bhsb8pNCX22EF2Uwi2g00HKW3M8PP"
);


// API

// App Config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());
app.use(express.static("public"));

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request received ! ! !", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    })

    //OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
});

// Listen Command
exports.api = functions.https.onRequest(app);
// exports.widgets = functions.https.onRequest(app);

//http://localhost:5001/clone-49c41/us-central1/api
//End point
