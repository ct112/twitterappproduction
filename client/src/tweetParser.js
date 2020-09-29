import React from "react";
import curry from "./img/curry.png";

function tweetParser(tweets) {

  function add_images(tweet) {
    return [
      <img
        style={{ width: "100%", height: "100%" }}
        src={tweet.extended_entities.media[0].media_url}
        alt="curry"
      />,
    ];
  }

  function add_video(tweet) {
    return [
      <video width="100%" height="100%" controls>
        <source
          src={tweet.extended_entities.media[0].video_info.variants[1].url}
          type="video/mp4"
        />
      </video>,
    ];
  }

  for (let i = 0; i < tweets.length; i++) {
    if (tweets[i].extended_entities) {
      tweets[i].display_media =
        tweets[i].extended_entities.media[0].type === "photo"
          ? add_images(tweets[i])
          : add_video(tweets[i]);
    } else {
      tweets[i].display_media = [];
    }
  }
  // console.table(tweets);
  return tweets;
}
export default tweetParser;

