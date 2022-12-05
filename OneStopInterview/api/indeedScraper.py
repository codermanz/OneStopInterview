import cloudscraper
from bs4 import BeautifulSoup


class UnableToFindJobDivs(Exception):
    """
        Unable to find Job division when finding on Beautiful
        Soup
    """
    pass


class DDosProtectionCloudFlare(Exception):
    """
        Ran into Cloud flare bot security
    """
    pass


class RequestFailed(Exception):
    """
        Request returned a code other than 200 (means request failed)
    """
    pass


def get_url(job_title, location, pagination_index):
    """
        Generate url from position, location and pagination index.
        Input parameters must be of appropriate formatting & data type
    """
    return f"https://www.indeed.com/jobs?q={job_title.replace(' ', '+')}&" \
           f"l={location.replace(' ', '+')}&start={pagination_index}"


def extract_data(job_title, location, pagination_index=0):
    """
        Send request out to indeed, receive response then throw out
    """
    # Set up cloud scraper
    scraper = cloudscraper.create_scraper(browser={'browser': 'chrome',
                                                   'platform': 'ios',
                                                   'desktop': True})
    response = scraper.get(get_url(job_title=job_title,
                                   location=location,
                                   pagination_index=pagination_index))
    # Throw error for known status codes
    if response.status_code == 1024:
        raise DDosProtectionCloudFlare("Cloudflare blocked indeed request")
    elif response.status_code != 200:
        raise RequestFailed("Request to Indeed wasn't successful")
    # Return BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup


def transform(soup):
    """
        Transform HTML data into list of jobs
    """
    divs = soup.find_all('div', class_='job_seen_beacon')
    if not divs:
        raise UnableToFindJobDivs("No job divs found - scraping failed")
    joblist = list()
    # Loop through all job cards
    for div in divs:
        # Collect relevant metadata
        title = div.find('h2', class_='jobTitle').text.strip()
        # Generate URL
        job_url = "https://indeed.com" + div.h2.a.get('href')
        try:
            company = div.find('span', class_='companyName').text.strip()
        except AttributeError:
            company = ''
        try:
            job_location = div.find('div', class_='companyLocation').text.strip()
        except AttributeError:
            job_location = ''
        try:
            job_posting_date = div.find('span', class_='date').text.strip()\
                .replace('Posted', '').replace('EmployerActive', '')
        except AttributeError:
            job_posting_date = ''
        try:
            job_salary = div.find('span', class_='estimated-salary').text.strip()
        except AttributeError:
            job_salary = ''

        job = {
            'title': title,
            'job_url': job_url,
            'company': company,
            'location': job_location,
            'posted_date': job_posting_date,
            'salary': job_salary
        }
        joblist.append(job)

    return joblist
