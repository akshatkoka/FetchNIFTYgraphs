const Page = require( '../pageobjects/page.js' );
class IndianIndices {
    get numberOfStocksInSelection() { return $$('section.js-table-wrapper.common-table-comp.grid-mobile > div.common-table-wrapper > div > table > tbody > tr').length}
    get rankingDropdown () { return $('div.design-select.type-2 > button') }
    get rankingMostActive () { return $('li.common-list-item.js-dropdown-option-s.selected > button > span') }
    get ranking52WeekHigh () { return $('div.popup-content > div > section > ul > li:nth-child(2) > button > span') }
    get ranking52WeekLow () { return $('div.popup-content > div > section > ul > li:nth-child(3) > button > span') }
    get rankingTopGainers () { return $('div.popup-content > div > section > ul > li:nth-child(4) > button > span') }
    get rankingTopLosers () { return $('div.popup-content > div > section > ul > li:nth-child(5) > button > span') }

    stockName(index){
        return $('#js-main-container > section.main-container.container > div > section.instrument.js-section-content >' +
            ' section.js-table-wrapper.common-table-comp.grid-mobile > div.common-table-wrapper > div > table >' +
            ' tbody > tr:nth-child('+index+') > td.col-name > a' )
    }

    fetchStockURLs(stockList){
        for (let i = 1; i <= this.numberOfStocksInSelection; i++) {
            stockList.add(this.stockName(i).getAttribute('href') + "-chart");
        }
        return stockList
    }

    selectRanking(filter){
        this.rankingDropdown.waitForClickable();
        this.rankingDropdown.click();
        switch (filter) {
            case '52WeekHigh':
                console.log("Selecting 52week high stocks");
                this.ranking52WeekHigh.waitForClickable();
                this.ranking52WeekHigh.click();
                browser.pause(2000);
                console.log("Number of stocks in 52WeekHigh selection: " + this.numberOfStocksInSelection);
                break;
            case '52WeekLow':
                console.log("Selecting 52week low stocks");
                this.ranking52WeekLow.waitForClickable();
                this.ranking52WeekLow.click();
                browser.pause(2000);
                console.log("Number of stocks in 52WeekLow selection: " + this.numberOfStocksInSelection);
                break;
            case 'MostActive':
                console.log("Selecting most active stocks");
                this.rankingMostActive.waitForClickable();
                this.rankingMostActive.click();
                browser.pause(2000);
                console.log("Number of stocks in MostActive selection: " + this.numberOfStocksInSelection);
                break;
            case 'TopLosers':
                console.log("Selecting Top looser stocks");
                this.rankingTopLosers.waitForClickable();
                this.rankingTopLosers.click();
                browser.pause(2000);
                console.log("Number of stocks in TopLosers selection: " + this.numberOfStocksInSelection);
                break;
            case 'TopGainers':
                console.log("Selecting Top Gainer stocks");
                this.rankingTopGainers.waitForClickable();
                this.rankingTopGainers.click();
                browser.pause(2000);
                console.log("Number of stocks in TopGainer selection: " + this.numberOfStocksInSelection);
                break;
        }
    }

    fetchStockListOfIndex(){
        let stockList = new Set();
        if(process.env.INDEX==="nifty50" || process.env.INDEX==="nifty200") {
            console.log("Fetching stock URLs for nifty50 index---");
            Page.open('indices/s-p-cnx-nifty-components');
            stockList = this.fetchStockURLs(stockList);
        }
        if(process.env.INDEX==="nifty200"){
            console.log("Fetching stock URLs for nifty200 index---");
            Page.open('indices/cnx-200-components');

            this.selectRanking('MostActive')
            stockList = this.fetchStockURLs(stockList);

            this.selectRanking('52WeekHigh');
            stockList = this.fetchStockURLs(stockList);

            this.selectRanking('52WeekLow');
            stockList = this.fetchStockURLs(stockList);

            this.selectRanking('TopGainers');
            stockList = this.fetchStockURLs(stockList);

            this.selectRanking('TopLosers');
            stockList = this.fetchStockURLs(stockList);
        }
        console.log("Fetched "+ stockList.size +" unique stock urls for "+ process.env.INDEX);
        return stockList;
    }
}
module.exports = new IndianIndices();
