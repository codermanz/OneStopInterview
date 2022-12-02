import OneStopInterview.api.indeedScraper as scraper
import csv
import time

csv_columns = ['title', 'job_url', 'company', 'location', 'posted_date', 'salary']

job_titles = ['Software Engineer',
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
              'Computer Research Scientist',
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
    for job_title in job_titles:
        try:
            jobs = scraper.transform(scraper.extract_data(job_title, location))
            for job in jobs:
                writer.writerow(job)
        except Exception:
            # Back off then try again
            time.sleep(0.02)
            try:
                jobs = scraper.transform(scraper.extract_data(job_title, location))
                for job in jobs:
                    writer.writerow(job)
            except Exception:
                print(f"Unable to get for: {job_title} at {location} due to an exception")
                continue
