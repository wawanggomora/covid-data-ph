# Web Scraper for COVID-19 Data in PH
<!-- GETTING STARTED -->
## Getting Started

Official DOH Twitter account (source): https://twitter.com/DOHgovph

### Prerequisites

Be sure you have npm in your system.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/wawanggomora/covid-scrape.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Use the following in your terminal to start scrape:
   ```JS
   node scrape
   ```
4. View the  data inside ```covidReport.json``` file.
  ```JS
  {
    "covidReport": [
      {
        "reportDate": "Agosto 29, 2021",
        "newCases": "18,528",
        "recoveries": "17,922",
        "deaths": "101",
        "activeCasePercentage": "7.3",
        "activeCaseTotal": "143,221",
        "generatedAt": "2021-08-30T06:01:19.674Z"
      }
    ]
  }
  ```
