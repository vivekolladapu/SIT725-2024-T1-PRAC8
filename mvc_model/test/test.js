var expect  = require('chai').expect;
var assert = require('assert');
var request = require('request');
const Card = require('../models/model');

var tempRes = new Card({
    name:"Rick and Morty",
    image_url:"https://cdn.vox-cdn.com/thumbor/9HfS_-ugBoHDaLskP6ssJ8_nIkY=/0x22:1584x851/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24415978/rick_and_morty_s4_image.png",
    email:"sample@gmail.com"
})
// const Card = require('../models/card');
describe("Submit form /submit-form", function () {
    var url = "http://localhost:3000/submit-form";
    it("Inserted new card to database", function (done) {
      request.post(
        { url: url, form: tempRes.toObject() },
        function (error, response, body) {
          let parsedBody = JSON.parse(body);
          expect(response.statusCode).to.equal(200);
          expect(parsedBody.message).to.equal("Form submitted successfully");
          done();
        }
      );
    });
  });
  
  describe('Get Cards /get-cards', function() {
    it('get all the cards from the database', function(done) {
      var url = "http://localhost:3000/get-cards";
      request.get(url, function(error, response, body) {
        if (error) {
          console.error('Request error:', error);
          done(error);
        } else {
          const adopters = JSON.parse(body);
          expect(response.statusCode).to.equal(200);
          expect(adopters).to.be.an('array');
          done();
        }
      });
    });
  });