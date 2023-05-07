var hbs = require("nodemailer-express-handlebars")
var nodemailer = require("nodemailer");
const path = require("path");

const sendMailToClient = async (recepient, link, subject) => {
  console.log(link);
 
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kimcartoonbaby@gmail.com",
      pass: "aupwabovgeaiatdo",
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('./backend//views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./backend/views'),
    extName: ".handlebars",
  }
  
  transporter.use('compile', hbs(handlebarOptions));

  var mailOptions = {
    from: "sameleno6@gmail.com",
    to: recepient.email,
    subject: subject,
    template: "email",
    context: {
        link:link
    }
  };

  transporter.sendMail(mailOptions, function (error, info) {
    let message = "";
    if (error) {
        console.log(error);
      message = "something went wrong";
      return message
    } else {
      console.log("Email sent: " + info.response);
      message ="email sent"
    //   return message
      // res.json({ sent: "email sent" });  
    }
    console.log(message)
    return message
  });
//  return message

};

module.exports = {
  sendMailToClient,
};
