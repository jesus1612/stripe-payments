const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/concepts", (req, res) => {
  res.send([
    {
      currency: "mxn",
      amount: 19990,
      payment_method_types: ['card', 'oxxo'],
      customer: 'cus_ODWRpjqcZdqXfo',
      metadata: {
        concepto: "RINC",
        matricula: "2321323"
      }
    },
    {
      currency: "mxn",
      amount: 102290,
      payment_method_types: ['card', 'oxxo'],
      customer: 'cus_ODWRpjqcZdqXfo',
      metadata: {
        concepto: "CRED",
        matricula: "2321323"
      }
    }
  ])
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "mxn",
      amount: 19990,
      payment_method_types: ['card', 'oxxo'],
      customer: 'cus_ODWRpjqcZdqXfo',
      metadata: {
        concepto: "RINC",
        matricula: "2321323"
      }
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
