const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scraper(searchTerm) {
    const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchTerm)}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const jobs = [];

        $('.result-card').each((index, element) => {
            const jobTitle = $(element).find('.result-card__title').text().trim();
            const companyName = $(element).find('.result-card__subtitle').text().trim();
            const jobLocation = $(element).find('.job-result-card__location').text().trim();
            const jobDescription = $(element).find('.result-card__snippet').text().trim();
            const jobPostDate = $(element).find('time').attr('datetime');
            const applicationLink = $(element).find('.result-card__full-card-link').attr('href');
            const skillsNeeded = [];  

            jobs.push({
                jobTitle,
                companyName,
                jobLocation,
                jobDescription,
                jobPostDate,
                skillsNeeded,
                applicationLink
            });
        });

        fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
}

catch (error) {
    console.error('Error fetching data:', error);
}
}

//searchTerm -> MLops

scraper('MLOps');


// code not working; this is the best i could do while sick; sorry about that

