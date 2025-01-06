import { expect } from "chai";
import { isUENValid } from "../src/controllers/service1Controller.js";
import "mocha"

describe('Service 1', function () {
    describe('#isUENValid()', function () {
        describe('Type A UENs', function () {
            it("should properly accept basic Type A UENs", () => {
                expect(isUENValid("12345678D")).to.be.true
                expect(isUENValid("43136130A")).to.be.true
                expect(isUENValid("88888888Z")).to.be.true
            });
        });
    });
  });