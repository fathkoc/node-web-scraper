
# **Web Scraper Kütüphanesi (PHP & Node.js)**

Bu web kazıyıcı kütüphanesi, web sitelerinden veri kazıma, belirli HTML elementlerini seçme ve sayfa güncellemelerini izleme için tasarlanmıştır. Hem **PHP** hem de **Node.js** için destek sunar ve pagination, meta veri çıkarma, dinamik sayfa kazıma ve form gönderimi gibi özellikleri içerir.

## **Özellikler**

- **HTML Element Kazıma:** CSS seçicileri kullanarak belirli elementleri seçme ve veri çıkarma.
- **Pagination Desteği:** Birden fazla sayfa üzerinden veri kazıma.
- **Meta Veri Çıkarma:** HTML sayfalarından başlık, açıklama ve anahtar kelime meta etiketlerini çıkarma.
- **Dinamik İçerik Kazıma:** JavaScript ile içerik yükleyen sayfaları Puppeteer (Node.js) kullanarak kazıma.
- **Proxy ve Kullanıcı Ajanı Desteği:** Proxy'leri ve User-Agent başlıklarını özelleştirme.
- **Sayfa Güncellemelerini İzleme:** Belirli aralıklarla bir web sayfasındaki değişiklikleri izleme.
- **Form Gönderme:** Veri kazımadan önce giriş yapma ve form gönderme işlemleri gerçekleştirme.
- **JSON'a Veri Dışa Aktarma:** Kazınan verileri JSON formatında kaydetme.

## **Kurulum**

### PHP Versiyonu:
1. Bağımlılıkları Composer ile yükleyin:
```bash
composer install
```

2. Aşağıdaki `composer.json` yapılandırmasını ekleyin:

```json
{
    "name": "fathkoc/php-web-scraper",
    "require": {
        "php": ">=7.4",
        "guzzlehttp/guzzle": "^7.0",
        "symfony/dom-crawler": "^5.0",
        "symfony/css-selector": "^5.0"
    }
}
```

### Node.js Versiyonu:
1. Bağımlılıkları npm ile yükleyin:
```bash
npm install axios cheerio puppeteer
```

2. Aşağıdaki `package.json` yapılandırmasını ekleyin:

```json
{
  "name": "node-web-scraper",
  "version": "1.0.0",
  "main": "src/scraper.js",
  "dependencies": {
    "axios": "^0.21.1",
    "cheerio": "^1.0.0-rc.10",
    "puppeteer": "^10.0.0"
  }
}
```

## **Kullanım**

### PHP:

```php
use WebScraper\Scraper;

$scraper = new Scraper();
$html = $scraper->fetchPageContent('https://example.com');
$data = $scraper->scrapeElement($html, 'h1');
print_r($data); // Tüm <h1> elementlerini çıktı verir
```

### Node.js:

```javascript
const Scraper = require('./src/scraper');

const scraper = new Scraper();
(async () => {
    const html = await scraper.fetchPageContent('https://example.com');
    const data = scraper.scrapeElement(html, 'h2');
    console.log(data); // Tüm <h2> elementlerini çıktı verir
})();
```

---

# **Web Scraper Library (PHP & Node.js)**

This web scraper library is designed to scrape data from websites, extract specific HTML elements, and track page updates. It supports both **PHP** and **Node.js** implementations, with features like pagination, meta data extraction, dynamic page scraping, and form submissions.

## **Features**

- **HTML Element Scraping:** Select and extract specific elements (e.g., headings, paragraphs) using CSS selectors.
- **Pagination Support:** Scrape data across multiple pages with pagination.
- **Meta Data Extraction:** Extract meta tags such as title, description, and keywords from HTML pages.
- **Dynamic Content Scraping:** Use Puppeteer (Node.js) to scrape pages that load content dynamically using JavaScript.
- **Proxy and User-Agent Support:** Customize User-Agent headers and use proxies to avoid detection.
- **Track Page Updates:** Continuously monitor a webpage for changes at set intervals.
- **Form Submission:** Perform login actions and form submissions before scraping.
- **Export to JSON:** Save scraped data in JSON format for easy use.

## **Installation**

### PHP Version:
1. Install dependencies via Composer:
```bash
composer install
```

2. Add the following `composer.json` configuration:

```json
{
    "name": "fathkoc/php-web-scraper",
    "require": {
        "php": ">=7.4",
        "guzzlehttp/guzzle": "^7.0",
        "symfony/dom-crawler": "^5.0",
        "symfony/css-selector": "^5.0"
    }
}
```

### Node.js Version:
1. Install dependencies via npm:
```bash
npm install axios cheerio puppeteer
```

2. Add the following `package.json` configuration:

```json
{
  "name": "node-web-scraper",
  "version": "1.0.0",
  "main": "src/scraper.js",
  "dependencies": {
    "axios": "^0.21.1",
    "cheerio": "^1.0.0-rc.10",
    "puppeteer": "^10.0.0"
  }
}
```

## **Usage**

### PHP:

```php
use WebScraper\Scraper;

$scraper = new Scraper();
$html = $scraper->fetchPageContent('https://example.com');
$data = $scraper->scrapeElement($html, 'h1');
print_r($data); // Output all <h1> elements
```

### Node.js:

```javascript
const Scraper = require('./src/scraper');

const scraper = new Scraper();
(async () => {
    const html = await scraper.fetchPageContent('https://example.com');
    const data = scraper.scrapeElement(html, 'h2');
    console.log(data); // Output all <h2> elements
})();
```

## **License**
MIT License
