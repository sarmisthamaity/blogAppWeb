const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'sarmistha20@navgurukul.org',
        pass: process.env.PASSWORD
    }
});


module.exports.mailSender = (mailData) => {
    transporter.sendMail(mailData, (err, info) => {
        if(err){
            return err
        } else {
            return info.messageId
        };
    });
};