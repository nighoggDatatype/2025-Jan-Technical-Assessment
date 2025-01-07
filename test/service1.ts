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
            it("should reject short UENs or letters subsitutions", () => {
                expect(isUENValid("12345678")).to.be.false
                expect(isUENValid("123456789")).to.be.false
                expect(isUENValid("43136l30A")).to.be.false
                expect(isUENValid("888888Z")).to.be.false
            });
        });
        describe('Type B UENs', function () {
            it("should accept basic Type B UENs", () => {
                expect(isUENValid("201845678D")).to.be.true
                expect(isUENValid("199436130A")).to.be.true
                expect(isUENValid("202488888Z")).to.be.true
                expect(isUENValid("205500000Y")).to.be.true
                expect(isUENValid("190000000X")).to.be.true
            });
            it("should reject Type B UENs with excessively impossible dates", () => {
                expect(isUENValid("181845678D")).to.be.false
                expect(isUENValid("219436130A")).to.be.false
            });
            it("should reject Type B UENs that are too long", () => {
                expect(isUENValid("2024888881234Z")).to.be.false
                expect(isUENValid("2055000001Y")).to.be.false
            });
            it("should reject Type B UENs missing the check alphabet", () => {
                expect(isUENValid("2018456789")).to.be.false
                expect(isUENValid("2018456789")).to.be.false
            });
            it("should reject letters beyond the check alphabet", () => {
                expect(isUENValid("2X1845678D")).to.be.false
                expect(isUENValid("199X36130A")).to.be.false
                expect(isUENValid("l05500000Y")).to.be.false
                expect(isUENValid("19000O000X")).to.be.false
            })
        });
        describe('Type C UENs', function () {
            it("should accept basic Type C UENs", () => {
                expect(isUENValid("T09LL0001B")).to.be.true
                expect(isUENValid("S99PB0011X")).to.be.true
            });
            it("should reject missing check alphabet", () => {
                expect(isUENValid("T09LL0001")).to.be.false
                expect(isUENValid("S99PB00110")).to.be.false
            })
            it("should reject Type C UENs that are too long", () => {
                expect(isUENValid("T09LL00001B")).to.be.false
                expect(isUENValid("S99PB01011X")).to.be.false
            });
            it("should reject Type C UENs that are too short", () => {
                expect(isUENValid("T09LL000B")).to.be.false
                expect(isUENValid("S99PB011X")).to.be.false
            });
            it("should reject invalid year data", () => {
                expect(isUENValid("R09LL0001B")).to.be.false
                expect(isUENValid("1999PB0011X")).to.be.false
                expect(isUENValid("1999PB011X")).to.be.false
            });
            it("should reject invalid Entity Types", () => {
                expect(isUENValid("T09ZZ0001B")).to.be.false
                expect(isUENValid("S99L00011X")).to.be.false
            });
            it("should reject incorrect letter subsitutions", () => {
                expect(isUENValid("TO9LL0001B")).to.be.false
                expect(isUENValid("S99PB0O11X")).to.be.false
            });
        })
    });
  });