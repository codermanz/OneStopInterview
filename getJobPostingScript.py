import OneStopInterview.api.indeedScraper as scraper
import csv
import time

csv_columns = ['location_category', 'job_title_category', 'title', 'job_url',
               'company', 'location', 'posted_date', 'salary']

job_titles = [['Software Engineer',
               'Software Developer',
               'Front End Software Engineer',
               'Data Analyst',
               'Data Scientist',
               'Information Security Analyst',
               'Computer Systems Analyst',
               'Web Developer',
               'Sales Engineer',
               'Information Technology Manager',
               'Product Manager',
               'Project Manager',
               'Machine Learning Engineer',
               'ML/AI Engineer',
               'Computer Research Scientist'],
              [
                  'Network and Systems Administrator',
                  'Computer Support Specialist',
                  'Business Intelligence Developer',
                  'Android Developer',
                  'IoS Developer',
                  'UI Designer',
                  'UX Designer',
                  'Systems Administrator',
                  'Python Developer',
                  'Full-Stack Developer',
                  'Database Administrator',
                  'Business Systems Analyst',
                  'Data Engineer']
              ]
# job_titles = [['Computer Research Scientist']]

locations = ['New York NY',
             'Los Angeles CA',
             'San Francisco CA',
             'Austin TX',
             'Dallas TX',
             'Washington DC',
             'Glendale AZ',
             'Seattle WA',
             'Atlanta GA',
             'Denver CO',
             'Chicago IL',
             'Raleigh NC']

if __name__ == '__main__':
    # Run script seperate for each location.
    # May have to re run for some jobs if they produce an exception (should print to console)
    location = locations[0]
    file = open(f'jobPostings-{location.replace(" ", "")}.csv', 'a+')
    writer = csv.DictWriter(file, csv_columns)
    writer.writeheader()
    # Scrappy solution to bypass cloudflare protection - just have to manually re run with a different
    # index each time
    for job_title in job_titles[0]:
        try:
            jobs = scraper.transform(scraper.extract_data(job_title, location))
            for job in jobs:
                job['job_title_category'] = job_title
                job['location_category'] = location
                writer.writerow(job)
        except Exception:
            # Back off then try again
            time.sleep(0.04)
            try:
                jobs = scraper.transform(scraper.extract_data(job_title, location))
                for job in jobs:
                    job['job_title_category'] = job_title
                    job['location_category'] = location
                    writer.writerow(job)
            except Exception:
                print(f"Unable to get for: {job_title} at {location} due to an exception")
                continue
