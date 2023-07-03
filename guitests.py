import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

class TestFrontendGUI(unittest.TestCase):
    def setUp(self):
        self.url = "https://www.careconnect.works"
        self.driver = self.create_driver()

    def create_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_prefs = {}
        chrome_options.experimental_options["prefs"] = chrome_prefs
        # Disable images
        chrome_prefs["profile.default_content_settings"] = {"images": 2}
        return webdriver.Chrome(options=chrome_options)
    
    def tearDown(self):
        self.driver.quit()

    def test_homepage(self):
        self.driver.get(self.url)
        self.assertIn("CareConnect", self.driver.title)

    def test_navbar(self):
        self.driver.get(self.url)
        navbar = self.driver.find_element(By.CLASS_NAME, "container")
        self.assertIsNotNone(navbar)

    def test_navbar_buttons(self):
        self.driver.get(self.url)
        navbar = self.driver.find_element(By.CLASS_NAME, "container")
        navbar_buttons = navbar.find_elements(By.TAG_NAME, "button")
        self.assertEqual(len(navbar_buttons), 1)

    def test_about(self):
        self.driver.get(self.url + "/about")
        self.assertGreaterEqual(len(self.driver.find_elements(By.CSS_SELECTOR, "div.card-title.h5")), -1)

    def test_illnesses(self):
        self.driver.get(self.url + "/illnesses")
        self.assertGreaterEqual(len(self.driver.find_elements(By.CSS_SELECTOR, "ul.pagination")), 1)

    def test_drugs(self):
        self.driver.get(self.url + "/drugs")
        self.assertGreaterEqual(len(self.driver.find_elements(By.CSS_SELECTOR, "ul.pagination")), 1)

    def test_healthcare_providers(self):
        self.driver.get(self.url + "/healthcare-providers")
        self.assertEqual(len(self.driver.find_elements(By.CSS_SELECTOR, "ul.pagination")), 0)

    def test_about_cards(self):
        self.driver.get(self.url + "/about")
        cards = self.driver.find_elements(By.CLASS_NAME, "card")
        self.assertEqual(len(cards), 0)

    def test_drugs_cards(self):
        self.driver.get(self.url + "/drugs")
        cards = self.driver.find_elements(By.CLASS_NAME, "card")
        for card in cards:
            card.click()
            self.assertNotEqual(self.driver.current_url, self.url + "/drugs")

    def test_illnesses_cards(self):
        self.driver.get(self.url + "/illnesses")
        cards = self.driver.find_elements(By.CLASS_NAME, "card")
        for card in cards:
            card.click()
            self.assertNotEqual(self.driver.current_url, self.url + "/illnesses")


if __name__ == "__main__":
    unittest.main()