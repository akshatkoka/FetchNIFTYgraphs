const IndianIndices = require('../pageobjects/IndianIndices.js')
const StockDetails = require('../pageobjects/stockDetails')
describe('fetch graphs of nifty 200 stocks with moving average',()=>{
    
    beforeAll(function (){
        browser.setWindowSize(1920,1080);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 36000000;
    });

    it('should', function () {
        let stocksList = IndianIndices.fetchStockListOfIndex();
        stocksList.forEach(function fetchGraph(stockURL){
           StockDetails.navigateToTechnicalChart(stockURL);
           StockDetails.setTechnicalIndicatorsOnChart();
           StockDetails.saveGraph('./graphs/');     //change to save all graphs in a different folder
        });
    });
})