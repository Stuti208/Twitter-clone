const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.APP_PASS,
    },
});

const sendMail = async (otp,email) => {

        
    const info = await transporter.sendMail({
        from: process.env.USER, 
        to: email, 
        subject: "Email Verification", 
        html: `<h3>Dear User,</h3>
        <p>We have received a request to verify your account. Please use the OTP below to proceed:</p>
        <h2 style="text-align: center; color: #4CAF50;">Your OTP is ${otp}</h2>`, 
        
    });

    console.log("Message sent: %s", info.messageId);
    // res.json(info);
        
    
}

module.exports = sendMail;