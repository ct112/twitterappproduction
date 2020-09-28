from flask import Flask, request, jsonify
import requests
import base64
import sys
from random import randint
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app_authentication_data = {
    "api_key": "kocbYqCzxvYXFMkfqnAekTlIu",
    "api_secret": "F2K5oMKTTXhbHWrrRabSXVvqTzsRYXESPKxdUvXvaW1ckKqMDK",
    "bearer_token_URL": "https://api.twitter.com/oauth2/token",
    "authorization_headers": {
        "Authorization": "",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    "authorization_data": {
        "grant_type": "client_credentials"
    },
    "bearer_token": ""
}
search_URLs = {
    "base": "https://api.twitter.com/1.1",
    "content": "search/tweets.json",
    "user": "statuses/user_timeline.json"
}


def generate_base64_key():
    user_authorization = "{}:{}".format(app_authentication_data['api_key'],
                                        app_authentication_data['api_secret']).encode("ascii")
    base64_key = base64.standard_b64encode(user_authorization)
    base64_key = base64_key.decode("ascii")
    app_authentication_data["authorization_headers"]["Authorization"] = f"Basic {base64_key}"


def post_request_token():
    response = requests.post(
        app_authentication_data["bearer_token_URL"],
        headers=app_authentication_data["authorization_headers"],
        data=app_authentication_data["authorization_data"])
    app_authentication_data["bearer_token"] = response.json()["access_token"]


def set_search_params_content(search_string):
    search_parameters = {"q": search_string, "result_type": "popular", "count": 15, "tweet_mode": "extended"}
    # print(search_parameters, file=sys.stderr)
    return search_parameters


def set_search_params_user(search_string):
    search_parameters = {"screen_name": f"@{search_string}", "lang": "en", "tweet_mode": "extended"}
    return search_parameters


def set_search_header():
    search_header = {"authorization": f"Bearer {app_authentication_data['bearer_token']}"}
    return search_header


def get_twitter_data(search_header, search_parameters, search_type):
    url_extension = search_URLs["user"] if search_type == "user" else search_URLs["content"]
    response = requests.get(f"https://api.twitter.com/1.1/{url_extension}", headers=search_header,
                            params=search_parameters)
    tweets = response.json()
    return tweets


def request_authorization_twitter_api():
    generate_base64_key()
    post_request_token()


request_authorization_twitter_api()


@app.route('/api/wall/content')
def content():
    search_string = request.args.get("search")
    print("i am hit", file=sys.stderr)
    search_params = set_search_params_content(search_string)
    search_header = set_search_header()
    tweets = get_twitter_data(search_header, search_params, "content")
    return jsonify(tweets)


@app.route('/api/wall/user')
def user():
    search_string = request.args.get("search")
    search_params = set_search_params_user(search_string)
    search_header = set_search_header()
    tweets = get_twitter_data(search_header, search_params, "user")
    tweets = {"statuses": tweets}
    return jsonify(tweets)


@app.route('/api/randomtweet/user')
def random():
    search_string = request.args.get("search")
    search_params = set_search_params_user(search_string)
    search_header = set_search_header()
    tweets = get_twitter_data(search_header, search_params, "user")
    tweets = {"statuses": tweets}
    random_number = randint(0, 19)
    tweet = tweets["statuses"][random_number]
    return jsonify(tweet)


if __name__ == '__main__':
    app.run()