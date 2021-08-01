const IndianIndices = require('../pageobjects/IndianIndices.js')
const StockDetails = require('../pageobjects/stockDetails')
describe('fetch graphs of nifty 200 stocks with moving average',()=>{
    let stockNum=0;
    let stocksList;
    beforeAll(function (){
        browser.setWindowSize(1920,1080);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 36000000;
         stocksList = IndianIndices.fetchStockListOfIndex();
    });

    it('should', function () {
        if(this.wdioRetries>0){
            console.log("Retry count: "+this.wdioRetries);
        }

        while(stocksList.size>0) {
            let stockURL = stocksList.values().next().value;
            stocksList.delete(stockURL);
            console.log("Fetching stock " + (stockNum++) + " >" + stockURL);
            StockDetails.navigateToTechnicalChart(stockURL);
            StockDetails.setTechnicalIndicatorsOnChart();
            StockDetails.saveGraph('./graphs/');     //change to save all graphs in a different folder
        }

    },5);
})