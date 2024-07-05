const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

function scraper(searchTerm) {
    const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchTerm)}`;
}