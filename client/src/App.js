import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import axios from "axios";
import Searchbar from "./Components/Searchbar";
import Tiles from "./Components/Tiles";
import Carousel from "./Components/Carousel";
import {Switch, Route} from "react-router-dom";



function App() {
  const [searchString, setSearchString] = useState("");
  const [tweetData, setTweetData] = useState(null);
  const [wallTweets, setWallTweets] = useState([]);
  const [searchName, setSearchName] = useState("");

  const twitter = {
    getWallTweets: async function (searchString, searchType) {
      await axios
        .get(`http://localhost:5000/api/wall/${searchType}?search=${searchString}`)
        .then((res) => setWallTweets(res.data.statuses))
        .catch((error) => console.log(error));
    },
    getSingleTweet: async function (searchString, searchType) {
      if (searchString) {
        await axios
          .get(`http://localhost:5000/api/randomtweet/${searchType}?search=${searchString}`)
          .then((res) => setTweetData(res.data))
          .catch((error) => console.log(error));
      }
    },
  };
  useEffect(() => {
    twitter.getSingleTweet(searchName, "user");
  }, [searchName]);

  function handleChange(event) {
    const { value } = event.target;
    setSearchString(value);
  }

  function handleClickButton(event) {
    const searchType = event.currentTarget.dataset.type;
    twitter.getWallTweets(searchString, searchType);
  }

  function handleClickImage(event) {
    setSearchName(event.target.id);
  }

  return (
    <div>
      <Navbar />
      <Route path="/" component={App}>
        <Switch>
          <Route path="/wall">
            <Searchbar
              handleChange={handleChange}
              handleClick={handleClickButton}
            />
            <Tiles tweetData={wallTweets} />
          </Route>
          <Route path="/tweet">
            <Carousel handleClickImage={handleClickImage} tweet={tweetData} />
          </Route>
        </Switch>
      </Route>
    </div>
  );
}

export default App;
