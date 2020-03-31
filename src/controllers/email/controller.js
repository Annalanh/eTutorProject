const { smtpTransport } = require('../../config/email')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')

class emailController {
    sendNoti(req, res) {
        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../../../', 'views/email/notification/notification-assigned.hbs'), 'utf8');
        const template = handlebars.compile(emailTemplateSource);
        const htmlToSend = template({
            student: 'student',
            tutor: 'tutor'
        })
        var mailOptions = {
            from: "asdfgh6296@gmail.com",
            to: "ptuananh196@gmail.com",
            subject: 'notification',
            html: htmlToSend
        }
        
        smtpTransport.sendMail(mailOptions, (err, response) => {
            if (err){
                console.log(err);
                res.send({status: false, message: 'bad email'});
            } else{
                console.log(response)
                res.send({status: true, message:"good email"})
            }
        })
    }
}

module.exports = new emailController()