'use strict'

const nodemailer = require('nodemailer');


module.exports = (email) => {
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: 'mrjorxe@gmail.com', // Cambialo por tu email
 pass: '207000064Jorge' // Cambialo por tu password
 }
 });
 console.log(email.email);
const mailOptions = {
 from: '"TubeKids"',
 to: email, // Cambia esta parte por el destinatario
 subject: "Registro a TubeKids",
 html: `"Su registro a TubeKids ha sido satisfactoriamente, ya puedes ingresar a http://localhost:4200"`

 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}