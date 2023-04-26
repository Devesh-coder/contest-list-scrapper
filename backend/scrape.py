from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
import json
import threading
import sys
import ast # for converting string to dict

op = webdriver.ChromeOptions()
op.add_argument('headless')
op.add_argument('window-size=1200x600') # setting window size is optional


# PATH = "C:\Program Files (x86)\chromedriver.exe"

def contest_schema(contest_name, contest_link, contest_start_time, contest_duration):
    return {
        "name": contest_name,
        "link": contest_link,
        "startTime": contest_start_time,
        "duration": contest_duration
    }



def gfg():

    driver = webdriver.Chrome(options=op)

    # driver = webdriver.Chrome(ChromeDriverManager().install())

    geek = 'https://practice.geeksforgeeks.org/events'
    driver.get(geek)
    print(driver.title)


    try:
        element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "eventsLanding_allEventsContainer__e8bYf")))
        contests = element.find_elements(By.ID, "eventsLanding_eachEventContainer__O5VyK")
        # print(len(contests))

        gfg_contest = []

        for contest in contests:
            contest_link = contest.find_element(By.TAG_NAME, "a").get_attribute("href")
            date = contest.find_elements(By.CLASS_NAME, "sofia-pro")
            contest_date = date[0].text
            contest_start_time = date[1].text
            contest_name = date[2].text
            contest_link = ""
            contest_duration = "2hr"

            gfg_contest.append(contest_schema(contest_name, contest_link, contest_date + " " + contest_start_time, contest_duration))       
        return gfg_contest
    
    
    except TimeoutException:
        print("Element not found or not visible")
        # print('Inside GFG \n')


def codingNinja():
    ninja = 'https://www.codingninjas.com/codestudio/contests'

    driver = webdriver.Chrome(options=op)


    driver.get(ninja)
    print(driver.title)
    ninja_data = []

    try:
        page = WebDriverWait(driver, 7).until(EC.visibility_of_element_located((By.CLASS_NAME, "live-and-upcoming-contests")))
        upcoming_contests = page.find_elements(By.CLASS_NAME, "card-body")
        for contest in upcoming_contests:
            contest_name = contest.find_element(By.CLASS_NAME, "heading").text
            contest_start_time = contest.find_element(By.CLASS_NAME, "notify").text
            ninja_data.append(contest_schema(contest_name, "", contest_start_time, "2hr"))
            
        return ninja_data

    except TimeoutException:
        print("Element not found or not visible")
        print('Inside CodingNinja \n')


def codechef():
    # driver = webdriver.Chrome(ChromeDriverManager().install())

    codechef = 'https://www.codechef.com/contests'

    driver = webdriver.Chrome(options=op)

    driver.get(codechef)
    print(driver.title)

    try:

        WebDriverWait(driver, 7).until(EC.visibility_of_element_located((By.CLASS_NAME, "_table__container_1c9os_331")))
        upcoming_contests = driver.find_elements(By.CLASS_NAME, "_table__container_1c9os_331")[1].find_element(By.TAG_NAME, "tbody")
        contests = upcoming_contests.find_elements(By.TAG_NAME, "tr")
        
        codechef_data = []

        for contest in contests:
            curr_contest = contest.find_elements(By.TAG_NAME, "td")
            contest_name = curr_contest[1].text
            contest_link = curr_contest[1].find_element(By.TAG_NAME, "a").get_attribute("href")
            contest_start_time = curr_contest[2].text
            contest_duration = curr_contest[3].text

            codechef_data.append(contest_schema(contest_name, contest_link, contest_start_time, contest_duration))
        return codechef_data
    
    except TimeoutException:
        print("Element not found or not visible")
        print('Inside Codechef \n')



def scrape_data():

    threads = []
    contest_data = []


    # Define a function to call each of your scraping functions
    def scrape_site(site_name, scrape_function):
        # print(f"Scraping {site_name}...")
        contest_data.append({site_name: scrape_function()})
        # contest_data[site_name] = scrape_function()

    # Start a new thread for each site you want to scrape
    threads.append(threading.Thread(target=scrape_site, args=("GeeksForGeeks", gfg)))
    threads.append(threading.Thread(target=scrape_site, args=("CodingNinja", codingNinja)))
    threads.append(threading.Thread(target=scrape_site, args=("Codechef", codechef)))

    # Start all of the threads
    for thread in threads:
        # print("Starting thread for {thread.name}")
        thread.start()

    # Wait for all of the threads to complete
    for thread in threads:
        # print("Waiting for {thread} to complete...")
        thread.join()

    try:
        f = open("data.json", "w")
        f.write(json.dumps(contest_data))
        f.close()
    except:
        print("Error in writing to file")


    return contest_data


scrape_data()