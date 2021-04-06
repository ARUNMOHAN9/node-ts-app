import mailgun, { messages } from 'mailgun-js';

const mgConfig = mailgun({ apiKey: 'b6f53c06392710b665cc295ad8a941b6-e687bab4-738d74de', domain: 'sandboxfea9122deac647699684b0a3fbcaaf0c.mailgun.org' });

const defaultData = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'arwebdev233@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
};

export const sendMail = (mailData: messages.SendData) => {
    mailData = { ...defaultData, ...mailData };
    mgConfig.messages().send(mailData, function (error, body) {
        console.log(error);
        console.log(body);
    });
}
