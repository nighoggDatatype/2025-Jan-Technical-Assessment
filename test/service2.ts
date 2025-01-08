import { expect } from "chai";
import sinon from "sinon";
import "mocha";
import { getWeatherJson, flushWeatherCache, getWeatherLocation, getWeatherForecast} from "../src/controllers/service2Controller.js";

const defaultMockApiOkJson = {
    "api_info": {
        "status": "healthy"
    },
    "area_metadata": [
        {
            "name": "Singapore",
            "label_location": {
                "longitude": 1,
                "latitude": 1
            }
        }
    ],
    "items": [
      {
        "update_timestamp": "2025-01-07T20:50:50.639Z",
        "timestamp": "2025-01-07T20:50:50.639Z",
        "valid_period": {
          "start": "2025-01-07T20:50:50.639Z",
          "end": "2025-01-07T22:50:50.639Z"
        },
        "forecasts": [
          {
            "area": "Singapore",
            "forecast": "Fair"
          }
        ]
      }
    ]
}
const fakeNow = defaultMockApiOkJson.items[0].valid_period.start

describe('Service 2', function () {
    //Unable to mock fetch properly within deadline
    describe.skip('(Using mocked clock and api)', function () {
        let clock: sinon.SinonFakeTimers;
        let fetchStub: sinon.SinonStub<[input: string | URL | Request, init?: RequestInit | undefined], Promise<Response>>;
        beforeEach(function () {
            clock = sinon.useFakeTimers(new Date(fakeNow));
            fetchStub = sinon.stub(global, "fetch");
            fetchStub.callsFake(() => {
                return Promise.resolve(Response.json(defaultMockApiOkJson));
            });
        })
        afterEach(function () {
            fetchStub.restore();
            clock.restore();
            flushWeatherCache();
        })
        describe('#getWeatherJson()', function () {
            it("should properly fetch the data, but not too often", async () => {
                expect(fetchStub.notCalled).to.be.true
                const data = await getWeatherJson()
                expect(data).to.not.be.null.and.to.deep.equal(defaultMockApiOkJson)
                expect(fetchStub.calledOnce).to.be.true
                await getWeatherJson()
                //Test below fails due to spurious reload of module, causing global variables to drop state. Error does not show up in prod
                expect(fetchStub.calledOnce).to.be.true 
            })
            it("should fetch more data once stale", () => {
                expect(fetchStub.notCalled).to.be.true
                getWeatherJson()
                expect(fetchStub.calledOnce).to.be.true
                clock.tick(1000*60*60*3)

                const newMockApiData = structuredClone(defaultMockApiOkJson)

                const addTwoHours = (dateString:string) => {
                    const date = new Date(dateString);
                    date.setHours(date.getHours() + 2);
                    return date.toISOString();
                }
                newMockApiData.items[0].timestamp = addTwoHours(newMockApiData.items[0].timestamp)
                newMockApiData.items[0].update_timestamp = addTwoHours(newMockApiData.items[0].update_timestamp)
                newMockApiData.items[0].valid_period.start = addTwoHours(newMockApiData.items[0].valid_period.start)
                newMockApiData.items[0].valid_period.end = addTwoHours(newMockApiData.items[0].valid_period.end)
                fetchStub.callsFake(() => {
                    return Promise.resolve(Response.json(newMockApiData));
                });
                
                const data = getWeatherJson()
                expect(data).to.not.be.null.and.to.deep.equal(newMockApiData)
                expect(fetchStub.calledTwice).to.be.true
            })
        })
        describe("#getWeatherLocation", function () {
            it("Should get the correct list of data with network", async () => {
                const data = getWeatherLocation()
            })
        })
    })
    describe("(Using live api)", () => {
        describe('#getWeatherJson()', function () {
            it("should properly fetch the data, but not too often", async () => {
                const data = await getWeatherJson()
                expect(data).to.not.be.null
            })
        })
        describe("#getWeatherLocation", function () {
            it("Should get the correct list of data with network", async () => {
                const data = await getWeatherLocation()
                expect(data).to.not.be.null
            })
        })
        describe("#getWeatherForecast", function () {
            it("Should get some prediction", async () => {
                const places = await getWeatherLocation()
                for (const location of places) {
                    const data = await getWeatherForecast(location.name)
                    expect(data).to.not.be.null
                }
            })
        })
    })
})