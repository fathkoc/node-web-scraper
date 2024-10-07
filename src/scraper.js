const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

class Scraper {
    constructor(proxy = null, userAgent = 'Mozilla/5.0') {
        this.proxy = proxy;
        this.userAgent = userAgent;
    }

    // Dinamik içerik için Puppeteer ile sayfa kazıma
    async fetchDynamicContent(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent(this.userAgent);
        await page.goto(url);
        const content = await page.content();
        await browser.close();
        return content;
    }

    // HTML sayfasını kazır
    async fetchPageContent(url) {
        try {
            const response = await axios.get(url, {
                headers: { 'User-Agent': this.userAgent },
                proxy: this.proxy
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching the page: ${error}`);
            return null;
        }
    }

    // HTML içindeki belirli elementleri seçer
    scrapeElement(htmlContent, selector) {
        const $ = cheerio.load(htmlContent);
        const elements = $(selector);
        const data = [];

        elements.each((index, element) => {
            data.push($(element).text());
        });

        return data;
    }

    // Meta verileri kazır (title, description, keywords)
    scrapeMetaData(htmlContent) {
        const $ = cheerio.load(htmlContent);
        const title = $('head title').text();
        const description = $('meta[name="description"]').attr('content');
        const keywords = $('meta[name="keywords"]').attr('content');

        return { title, description, keywords };
    }

    // Sayfa güncellemelerini izler
    async trackUpdates(url, selector, interval = 60000) {
        let previousData = [];
        while (true) {
            const htmlContent = await this.fetchPageContent(url);
            const newData = this.scrapeElement(htmlContent, selector);

            if (JSON.stringify(previousData) !== JSON.stringify(newData)) {
                console.log('Page has been updated!');
                previousData = newData;
            } else {
                console.log('No changes detected.');
            }

            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }


    async fetchMultiplePages(url, selectorForNextPage, selector, pages = 5) {
        let allData = [];
        let currentPage = url;

        for (let i = 0; i < pages; i++) {
            const htmlContent = await this.fetchPageContent(currentPage);

           
            allData.push(this.scrapeElement(htmlContent, selector));

            const $ = cheerio.load(htmlContent);
            const nextPageUrl = $(selectorForNextPage).attr('href');

            if (!nextPageUrl) {
                break; // Eğer başka sayfa yoksa döngüyü sonlandır
            }

            currentPage = nextPageUrl;
        }

        return allData;
    }

    // Veriyi JSON formatında kaydeder
    exportToJson(data, filename = 'output.json') {
        const fs = require('fs');
        fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
    }

    // Form gönderme işlemi
    async login(url, credentials) {
        try {
            const response = await axios.post(url, credentials, {
                headers: { 'User-Agent': this.userAgent },
                proxy: this.proxy
            });
            return response.status === 200;
        } catch (error) {
            console.error(`Login failed: ${error}`);
            return false;
        }
    }
}

module.exports = Scraper;
