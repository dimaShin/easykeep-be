import * as nodemailer from 'nodemailer';
import {Transporter} from "nodemailer";

let wellknown = require('nodemailer-wellknown');

declare interface ObjectConstructor {
  assign(...objects: Object[]): Object;
}

export interface MailTransportConfig {
  host: string,
  port: number,
  secure: boolean
  auth: {
    user: string,
    pass: string
  }
}

module.exports = class Mailer {

  public transporter: Transporter;

  constructor(transport: string) {
    let config = Mailer.getTransportConfig(transport || 'Yahoo');
    this._initTransport(config);
  }

  static getTransportConfig(transport: string): MailTransportConfig {
    return (<any>Object).assign(wellknown(transport), {
      user: 'easy_keep@yahoo.com',
      password: '123456Qq'
    });
  }

  private _initTransport(config: MailTransportConfig) {
    console.log('init mail transport: ', config);
    this.transporter = nodemailer.createTransport({
      service: 'Yahoo',
      auth: {
        user: 'easy_keep@yahoo.com',
        pass: '123456Qq'
      }
    });
  }

  verifyConnection() {
    console.log('verifying connection');
    this.transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages: ', success);
      }
    });
  }

  send(data) {

    if (!data.from) {
      data.from = '"Iashin Dmytro" <easy_keep@yahoo.com>'
    }

    this.transporter.sendMail(data, function(error, info){
      if(error){
        return console.log('email sending error: ', error);
      }
      console.log('Message sent: ' + info.response);
    });
  }

};
