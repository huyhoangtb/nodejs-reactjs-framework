'user strict';

import * as ejs from 'ejs';
import * as Email from 'email-templates';
import * as nodemailer from 'nodemailer';
import * as path from 'path';


class MailService {

    private SMTPConfig: object = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'obolexexchange@gmail.com',
            pass: 'hoangnh@123'
        }
    };

    private templateDir = path.join(__dirname, 'templates');
    private email: Email;

    public template: string = 'default';

    constructor(template: string = '') {
        const transporter = nodemailer.createTransport(this.SMTPConfig);

        if (template) {
            this.template = template;
        }

        this.email = new Email({
            message: {
                from: 'obolexexchange@gmail.com',
            },
            send: true,
            transport: transporter,
            views: {
                root: this.templateDir,
                options: {
                    extension: 'ejs',
                },
            },
        });
    }

    /**
     * Set template email
     * @param template Template view (name of folder in templates root)
     */
    setTemplate(template: string): void {
        this.template = template;
    }

    /**
     * Send email with template
     * @param mail Mail options (subject, text, html)
     * @param data Data need to replace in template
     * @param template Template view (name of folder in templates root)
     *
     * @returns Promise
     */
    send(mail: any, data: object = {}, template: string = this.template): any {

        let msg = {};
        if (typeof mail === 'object') {
            msg = {...mail};
        } else {
            msg = {to: mail}
        }

        return this.email.send({
            template: template,
            message: msg,
            locals: data,
        });
    }

    async testEmail() {
        const emailResult = await this.send('vntopmas@gmail.com', {
            title: 'Title',
            name: 'name',
        });
        console.log('res', emailResult);
        // or
        // this.send('vntopmas@gmail.com', {
        //     title: 'Title',
        //     name: 'name',
        // }).then(res => {
        //     console.log('res', emailResult);
        // });

    }
}

export default MailService;
