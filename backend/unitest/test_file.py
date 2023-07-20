import unittest
import json 
from server import app
import flask as Flask

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_shorturl (self):
        res = self.app.post('/', data={'longurl': 'https://www.msn.com/en-us/sports/fifa-world-cup/ballon-d-or-odds-2023-as-lionel-messi-erling-haaland-top-list-of-candidates-for-football-award/ar-AA1apUUh?cvid=439d28d720df48c79bb9a06a3caed3f4&ocid=winp2fptaskbarhover&ei=5'}) 
        data = json.loads(res.data.decode())

        self.assertEqual(data['message'], 'success')
        self.assertEqual(res.status_code, 200)
        self.assertTrue('short_url' in data)


    def test_redirect_url(self):
        res = self.app.get('/xf5dKs')

        self.assertEqual(res.status_code, 302)
        self.assertEqual(res.location, 'https://www.msn.com/en-us/sports/fifa-world-cup/ballon-d-or-odds-2023-as-lionel-messi-erling-haaland-top-list-of-candidates-for-football-award/ar-AA1apUUh?cvid=439d28d720df48c79bb9a06a3caed3f4&ocid=winp2fptaskbarhover&ei=5')

          # Test the redirection for an invalid short URL
        response = self.app.get('/invalid')
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.data.decode(), 'url not found')

if __name__ == '__main__':
    unittest.main()