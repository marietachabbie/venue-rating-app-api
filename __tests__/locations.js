const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../src/app");

const mockLocations = require("../src/data/initial-locations.json");

const newLocation = {
  name: "New awesome venue",
  description: "Most amazing lunchs and dinners!",
  category: "restaurant",
  rating: 3.9,
  review_count: 2,
  longitude: "44.515825",
  latitude: "40.188997",
};

describe("*** Responses of the API endpoints ***", () => {
  describe("GET /", () => {
    it("Returns 200 status", (done) => {
      chai.request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("GET /api/locations", () => {
    it("gets all locations stored in database", (done) => {
      let id = 0;
      const responseLocations = mockLocations.map(
        location => Object.assign({ location_id: ++id }, location));

      chai.request(app)
        .get("/api/locations")
        .end((err, res) => {
          expect(res._body).to.be.eql(responseLocations);
          done();
        });
    });
  });

  describe("POST /api/locations", () => {
    it("adds new location", (done) => {
      chai.request(app)
        .post("/api/locations")
        .send(newLocation)
        .end((err, res) => {
          expect(res._body).to.be.eql({ location_id: 4, message: "Successfully added!" });
          done();
        });
    });
  });

  describe("GET /api/locations/:location_id", () => {
    it("gets newly added location", (done) => {
      chai.request(app)
        .get("/api/locations/4")
        .end((err, res) => {
          const response = res._body[0];
          expect(response.location_id).to.be.eql(4);
          expect(response.name).to.be.eql("New awesome venue");
          expect(response.category).to.be.eql("restaurant");
          done();
        });
    });
  });

  describe("PATCH /api/locations/:location_id", () => {
    it("updates location by ID", (done) => {
      const requestBody = {
        rating: 4.3,
        review_count: 32,
      };

      chai.request(app)
        .patch("/api/locations/2")
        .send(requestBody)
        .end((err, res) => {
          const response = res._body;
          expect(response.message).to.be.eql("Sucessfully updated!");
          done();
        });
    });
  });

  describe("PATCH /api/locations/", () => {
    it("updates location by category", (done) => {
      const requestBody = {
        category: "restaurant",
        description: "We are temporarily closed :(",
        updated_at: "2024-02-27",
      };

      chai.request(app)
        .patch("/api/locations")
        .send(requestBody)
        .end((err, res) => {
          const response = res._body;
          expect(response.message).to.be.eql("Sucessfully updated!");
          done();
        });
    });
  });

  describe("DELETE /api/locations/:location_id", () => {
    it("deletes location by ID", (done) => {
      chai.request(app)
        .delete("/api/locations/1")
        .end((err, res) => {
          const response = res._body;
          expect(response.message).to.be.eql("Sucessfully deleted!");
          done();
        });
    });
  });
});
