import nodemailer from 'nodemailer'

const verfiyEmail = async (email, link) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port:465,
            secure:true,
            debug:true,
            secureConnection:false,
            auth: {
                user: 'vohidabdunazarov88@gmail.com',
                pass: 'Stronger8888'
            },
            tls:{
                rejectUnAuthorized:true
            }
        });

        let info = await transporter.sendMail({
            from: 'vohidabdunazarov88@gmail.com',
            to: email,
            subject: 'Account Verification',
            text: "Welcome",
            html: `
            <div>
            <a href=${link} target='_blank'>Click here to activate your account</a>
            </div>
            `
        })
        console.log(info, "mail send success");
    } catch (error) {
        console.log(error);
    }
}

export default verfiyEmail