const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const config = require('./conf');

server.use(express.static(__dirname));
server.use(bodyParser.json());

server.get('*', (_, res) => {
    res.status(404).send("This page doesn't exist");
});

server.get('/', (_, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

server.post('/email', function(req, res) {
    let data = req.body;
    console.log(config);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.user, // generated ethereal user
            pass: config.pass // generated ethereal password
        }
    });

    let mailOptions = {
        from: '"Yoann Picquenot 👻"', // sender address
        to: `${data['email']}, ${config.user}`, // list of receivers
        subject: 'Contact from yoannpicquenot@herokuapp.com', // Subject line
        html: `
            <html style="font-family:sans-serif;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;" ><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
            <style>
            html, body { font-family: sans-serif; padding: 0; margin: 0; }
            ul { list-style: none; margin: 0; padding: 0; width: 100%; height: 100%; }
            </style>
            </head>
            <body style="font-family:sans-serif;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;" >
                <h4>A notification has been send to my mailbox with these information:</h4>
                <ul style="list-style-type:none;list-style-position:outside;list-style-image:none;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;width:100%;height:100%;" >
                    <li>First name:
                        <p style="margin-top: 0; padding-top: 0;">${ data['first_name'] }</p>
                    </li>
                    <li>Last name:
                        <p style="margin-top: 0; padding-top: 0;">${ data['last_name'] }</p>
                    </li>
                    <li>Email:
                        <p style="margin-top: 0; padding-top: 0;">${ data['email'] }</p>
                    </li>
                    <li>Message:
                        <p style="margin-top: 0; padding-top: 0;">${ data['message'] }</p>
                    </li>
                </ul>
                <h4>I will answer as soon as possible!</h4>
                <p>Yoann Picquenot</p>
            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error);
            return console.log(error);
        }
        data['status'] = 200;
        res.status(200).send(data);
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

server.listen(config.port, (err) => {
    console.log(err || `Listening on port ${config.port}`);
});
