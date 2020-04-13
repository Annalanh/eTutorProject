const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env['SENDGRID_API_KEY']);

class emailController{
    sendTest(req, res){
        console.log('ye')
        const msg = {
            to: 'ptuananh196@gmail.com',
            from: 'no-reply@em2200.etutoring.cloudns.asia',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js3</strong>',
          };
        //   sgMail.send(msg).then((result) => {
        //       res.send(result);
        //   });
          sgMail
            .send(msg)
            .then((result) => {res.send(result)}, error => {
                console.error(error);

                if (error.response) {
                console.error(error.response.body)
                }
            });
    }
}
module.exports = new emailController()