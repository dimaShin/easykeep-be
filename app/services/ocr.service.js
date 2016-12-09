let rp = require('request-promise');

module.exports = class OcrService {


  static loadImg(uri) {
    return rp.get({ uri });
  }

  constructor() {
    this.uri = 'http://127.0.0.1:9292/ocr';
  }

  async getTextFromUrl(payload) {
    let fileBoundary = await OcrService.loadImg(payload.imgUrl);
    return rp({
      method: 'POST',
      url: this.uri,
      headers: {
        'Content-Type': 'multipart/related; boundary=---BOUNDARY'
      },
      body: `-----BOUNDARY
      Content-Type: application/json

    {"engine":"tesseract"}
      -----BOUNDARY

      -----BOUNDARY
      Content-Disposition: attachment;
      Content-Type: image/jpg
      filename="attachment.jpg".
      ${fileBoundary}
      -----BOUNDARY",`
    })
  }
};
