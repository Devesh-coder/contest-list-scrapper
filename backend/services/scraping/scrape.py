import sys
print(sys.executable)
print(sys.path)
import json
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import ast  # for converting string to dict
import threading

options = Options()
options.add_argument("--headless")
options.add_argument("window-size=1400,1500")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("start-maximized")
options.add_argument("enable-automation")
options.add_argument("--disable-infobars")
options.add_argument("--disable-dev-shm-usage")


# PATH = "C:\Program Files (x86)\chromedriver.exe"

def contest_schema(contest_name, contest_link, contest_start_time, contest_duration):
    return {
        "name": contest_name,
        "link": contest_link,
        "startTime": contest_start_time,
        "duration": contest_duration
    }


def gfg():

    driver = webdriver.Chrome(options=options)

    geek = 'https://practice.geeksforgeeks.org/events'
    driver.get(geek)
    print(driver.title)

    try:
        element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
            (By.CLASS_NAME, "eventsLanding_allEventsContainer__e8bYf")))
        contests = element.find_elements(
            By.ID, "eventsLanding_eachEventContainer__O5VyK")
        print(len(contests))

        gfg_contest = []

        for contest in contests:
            contest_link = contest.find_element(
                By.TAG_NAME, "a").get_attribute("href")
            date = contest.find_elements(By.CLASS_NAME, "sofia-pro")
            contest_date = date[0].text
            contest_start_time = date[1].text
            contest_name = date[2].text
            contest_duration = "1.5hr"

            print(contest_name, contest_link, contest_date )

            gfg_contest.append(contest_schema(
                contest_name, contest_link, contest_date + " " + contest_start_time, contest_duration))
        return gfg_contest

    except TimeoutException:
        print("Element not found or not visible")
        print('Inside GFG \n')

def codingNinja():
    ninja = 'https://www.codingninjas.com/codestudio/contests'

    driver = webdriver.Chrome(options=options)

    driver.get(ninja)
    print(driver.title)
    ninja_data = []

    try:
        page = WebDriverWait(driver, 7).until(EC.visibility_of_element_located(
            (By.CLASS_NAME, "live-and-upcoming-contests")))
        upcoming_contests = page.find_elements(By.CLASS_NAME, "card-body")
        print(len(upcoming_contests))
        for contest in upcoming_contests:
            contest_name = contest.find_element(By.CLASS_NAME, "heading").text
            contest_link = "https://www.codingninjas.com/studio/contests"
            contest_start_time = contest.find_element(
                By.CLASS_NAME, "notify").text
            ninja_data.append(contest_schema(
                contest_name, contest_link, contest_start_time, "2hr"))
            print(contest_name, contest_start_time)

        return ninja_data

    except TimeoutException:
        print("Element not found or not visible")
        print('Inside CodingNinja \n')


def codechef():
    # driver = webdriver.Chrome(ChromeDriverManager().install())

    codechef = 'https://www.codechef.com/contests'

    driver = webdriver.Chrome(options=options)

    driver.get(codechef)
    print(driver.title)

    try:

        WebDriverWait(driver, 7).until(EC.visibility_of_element_located(
            (By.CLASS_NAME, "_table__container_1c9os_331")))
        upcoming_contests = driver.find_elements(By.CLASS_NAME, "_table__container_1c9os_331")[
            1].find_element(By.TAG_NAME, "tbody")
        contests = upcoming_contests.find_elements(By.TAG_NAME, "tr")

        codechef_data = []
        print(len(contests))

        for contest in contests:
            curr_contest = contest.find_elements(By.TAG_NAME, "td")
            contest_name = curr_contest[1].text
            contest_link = curr_contest[1].find_element(
                By.TAG_NAME, "a").get_attribute("href")
            contest_start_time = curr_contest[2].text
            contest_duration = curr_contest[3].text

            codechef_data.append(contest_schema(
                contest_name, contest_link, contest_start_time, contest_duration))
            print(contest_name, contest_link, contest_start_time, contest_duration)
        return codechef_data

    except TimeoutException:
        print("Element not found or not visible")
        print('Inside Codechef \n')


def leetcode():
    leetcode = 'https://leetcode.com/contest/'

    driver = webdriver.Chrome(options=options)

    driver.get(leetcode)
    print(driver.title)

    try:
        # print("Inside leetcode")

        WebDriverWait(driver, 7).until(EC.visibility_of_element_located(
            (By.CLASS_NAME, "swiper-wrapper")))
        upcoming_contests = driver.find_element(
            By.CLASS_NAME, "swiper-wrapper").find_elements(By.CLASS_NAME, "swiper-slide")

        print(len(upcoming_contests), "upcoming contests", upcoming_contests)
        leetcode_data = []

        print(len(upcoming_contests))

        for contest in upcoming_contests:
            contest_link = contest.find_element(
                By.TAG_NAME, "a").get_attribute("href")
            # print(contest_link)
            contest_name = contest.find_element(
                By.CLASS_NAME, "truncate").text
            contest_start_time = contest.find_element(
                By.CLASS_NAME, "text-label-2 ").text
            contest_duration = "2hr"
            print(contest_name, contest_start_time, contest_duration)

            leetcode_data.append(contest_schema(
                contest_name, contest_link, contest_start_time, contest_duration))
        return leetcode_data

    except TimeoutException:
        print("Element not found or not visible")
        print('Inside Codechef \n')


def codeforces():

    codeforces = 'https://codeforces.com/contests'

    driver = webdriver.Chrome(options=options)

    driver.get(codeforces)
    print(driver.title)

    try:
        WebDriverWait(driver, 7).until(
            EC.visibility_of_element_located((By.CLASS_NAME, "datatable")))
        upcoming_contests = driver.find_element(By.CLASS_NAME, "datatable")

        contest_table = upcoming_contests.find_element(
            By.TAG_NAME, "tbody").find_elements(By.TAG_NAME, "tr")

        codeforces_data = []

        i = 0
        for contest in contest_table:
            # print(contest.text)
            if i >= 1:
                cur_contest = contest.find_elements(By.TAG_NAME, "td")
                contest_name = cur_contest[0].text
                contest_start_time = cur_contest[2].text
                contest_duration = cur_contest[3].text
                try:
                    contest_link = cur_contest[5].find_element(
                        By.TAG_NAME, "a").get_attribute("href")
                except:
                    contest_link = cur_contest[5].text

                print(contest_name, contest_start_time,
                      contest_duration, contest_link)

                codeforces_data.append(contest_schema(
                    contest_name, contest_link, contest_start_time, contest_duration))
            i += 1

        return codeforces_data

    except TimeoutException:
        print("Element not found or not visible")
        print('Inside Codeforces \n')


def scrape_data():
    
    all_contests = []

    gfg_array = gfg()
    leetcode_array = leetcode()
    codingNinja_array = codingNinja()
    codechef_array = codechef()
    codeforces_array = codeforces()

    all_contests.extend(gfg_array)
    all_contests.extend(codechef_array)
    all_contests.extend(codingNinja_array)
    all_contests.extend(leetcode_array)
    all_contests.extend(codeforces_array)

    try:
        sorted_contest_list = sorted(all_contests, key=lambda x: x['contestName'])

        f = open("data.json", "w")
        f.write(json.dumps(sorted_contest_list))
        f.close()
    except:
        print("Error in writing to file")

    return all_contests


scrape_data()

