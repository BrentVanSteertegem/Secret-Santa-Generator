import emailjs from 'emailjs-com'

export function sendEmail(from: any, to: any) {
    emailjs.send(process.env.VUE_APP_EMAIL_SERVICE_ID, process.env.VUE_APP_EMAIL_TEMPLATE_ID, {
    from_name: from.name,
    from_email: from.email,
    to_name: to.name,
    }, process.env.VUE_APP_EMAIL_USER_ID)
    .then((response) => {
        console.log('Email successfully sent!', response.status, response.text)
    }, (error) => {
        console.error('Failed to send email:', error)
    })
}