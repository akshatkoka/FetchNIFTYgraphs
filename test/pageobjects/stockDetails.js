
class StockDetails{
    get indicators () { return $('body > div.js-rootresizer__contents > div.layout__area--top.header-chart-panel > div > div > div.left > div.group.space-single.header-group-indicators > a') }
    get setCandle() { return $('div.group.space-single.header-group-bars-style > div > div > span:nth-child(1)') }
    get indicatorsInput () { return $('body > div.tv-dialog.js-dialog.tv-insert-indicator-dialog.i-minimized.tv-dialog--popup.i-focused.ui-draggable > div.tv-insert-indicator-dialog__body.js-dialog__scroll-wrap > div.tv-insert-indicator-dialog__right-panel.js-right-panel > div.tv-search-row.tv-insert-indicator-dialog__search-control > input') }
    get simpleMovingAverage () { return $('div.tv-insert-indicator-dialog__page.tv-insert-indicator-dialog__page--search > div > div > div:nth-child(1)') }
    get closeIndecator () { return $('div.tv-dialog__close.js-dialog__close > svg') }
    get movingAvgSettings () { return $('table > tbody > tr:nth-child(1) > td.chart-markup-table.pane > div > div.pane-legend > div.pane-legend-line.pane-legend-wrap.study > span.pane-legend-icon-container > a.pane-legend-icon.apply-common-tooltip.format') }
    get movingAvgSettings2 () { return $('body > div.js-rootresizer__contents > div.layout__area--center > div > div.chart-widget > table > tbody > tr:nth-child(1) > td.chart-markup-table.pane > div > div.pane-legend > div:nth-child(3) > span.pane-legend-icon-container > a.pane-legend-icon.apply-common-tooltip.format') }
    get movingAvgStyleTab () { return $('body > div._tv-dialog._tv-dialog-nonmodal.ui-draggable > div._tv-dialog-content > div.properties-tabs.tv-tabs > a:nth-child(2)') }
    get movingAvgLineStyle () { return $('body > div._tv-dialog._tv-dialog-nonmodal.ui-draggable > div._tv-dialog-content > div:nth-child(3) > table:nth-child(1) > tbody > tr > td:nth-child(5)>div>a:nth-child(1)') }
    get movingAvgCrossLineStyle () { return $('//a[text()="Cross"]') } //used xpath for text matching
    get setMovingAverageDay () { return $(' table.property-page > tbody > tr:nth-child(1) > td>input.ticker.tv-text-input.inset.dialog') }
    get saveMovingAverage () { return $('a._tv-button.ok') }
    get iframe1() { return $('#js-main-container > section.main-container.container > div > section.instrument.js-section-content > div.common-iframe.is-tv-chart.js-tv-chart-wrapper > iframe')}
    get iframe2() { return 'body > iframe' }
    get iframe3() { return '#tv_chart_container>iframe' }
    get stockName(){ return $('body > div.js-rootresizer__contents > div.layout__area--top.header-chart-panel > div > div > div.left > div.group.header-group-symbol-search > div > div > div > input')}
    get timeDropDown() { return $('body > div.js-rootresizer__contents > div.layout__area--top.header-chart-panel > div > div > div.left > div.group.space-single.header-group-intervals > div > span') }
    get time15() { return $('body > div.charts-popup-list.intervals-list.favored-list > span:nth-child(3)') }
    get timeframe1Day () { return $('body > div.js-rootresizer__contents > div.layout__area--top.header-chart-panel > div > div > div.left > div.group.space-single.header-group-intervals > div > div > span:nth-child(3)') }
    switchToIframe(selector){
        const frameSelector =selector
        $(frameSelector).waitForExist();
        browser.switchToFrame($(frameSelector));
    }

    navigateToTechnicalChart(stockURL){
        browser.url(stockURL)
        browser.pause(2000);
        this.iframe1.waitForExist();
        let urlSRC = this.iframe1.getAttribute('src');
        browser.url(urlSRC);
        browser.pause(2000);
        this.switchToIframe(this.iframe2);
        this.switchToIframe(this.iframe3);
    }

    setSimpleMovingAverage(numOfMovingAvgs){
        this.indicators.click();
        this.indicatorsInput.waitForDisplayed();
        this.indicatorsInput.setValue('moving average');
        browser.pause(2000);
        this.simpleMovingAverage.waitForClickable();
        this.simpleMovingAverage.click();
        this.simpleMovingAverage.click();
        this.closeIndecator.click();

        if(numOfMovingAvgs>0) {  //for 44day moving average
            browser.pause(3000);
            this.movingAvgSettings.waitForClickable();
            this.movingAvgSettings.click();
            this.setMovingAverageDay.waitForDisplayed();
            browser.execute(s => {
                s.value = null;
            },this.setMovingAverageDay);
            this.setMovingAverageDay.setValue(44);
            this.saveMovingAverage.click();
        }
        if(numOfMovingAvgs==2){  //for 200 day moving average
            browser.pause(1000);
            this.movingAvgSettings2.waitForClickable();
            this.movingAvgSettings2.click();
            this.setMovingAverageDay.waitForDisplayed();
            browser.execute(s => {
                s.value = null;
            },this.setMovingAverageDay);
            this.setMovingAverageDay.setValue(200);
            browser.pause(1000);
            this.movingAvgStyleTab.waitForClickable();
            this.movingAvgStyleTab.click();
            this.movingAvgLineStyle.waitForClickable();
            this.movingAvgLineStyle.click();
            this.movingAvgCrossLineStyle.click();
            this.saveMovingAverage.click();
        }

    }
    set15MinTimeFrame(){
        this.timeDropDown.click();
        this.time15.click();
    }
    set1DayTimeFrame(){
        this.timeframe1Day.click();
    }

    setTechnicalIndicatorsOnChart(){
        this.setCandle.waitForClickable();
        this.setCandle.click();
        this.setSimpleMovingAverage(2);
        //this.set1DayTimeFrame();
        this.set15MinTimeFrame()
    }

    saveGraph(dir){
        browser.pause(1000);
        console.log("saving graph for >> "+this.stockName.getValue());
        browser.saveScreenshot(dir+this.stockName.getValue()+'.png');
    }

}

module.exports = new StockDetails();
