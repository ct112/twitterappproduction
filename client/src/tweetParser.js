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

  function replaceTagsWithLinks(tweet) {
    tweet.full_text = tweet.full_text.replace(
      /#+([a-zA-Z0-9_]+)/gi,
      (hashtag) =>
        `<a href='https://twitter.com/hashtag/${hashtag.substring(
          1
        )}?src=hashtag_click' target='_blank'>${hashtag}</a>`
    );
    tweet.full_text = tweet.full_text.replace(
      /\$+([a-zA-Z0-9_]+)/gi,
      (cashtag) =>
        `https://twitter.com/search?q=%24%${cashtag}&src=cashtag_click target='_blank'>${cashtag}</a>`
    );
  }

  function replaceScreeNamesWithLink(tweet) {
    tweet.full_text = tweet.full_text.replace(
      /@+([a-zA-Z0-9_]+)/gi,
      (screenName) =>
        `<a> href='https://twitter.com/${screenName.substring(
          1
        )}' target='_blank'>${screenName}</a>`
    );
  }

  function replaceLink(tweet){
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    tweet.full_text = tweet.full_text.replace(
      urlRegex,
      (url) =>
      `<a href='${url}' target='_blank'>${url}</a>`
    );
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
    replaceTagsWithLinks(tweets[i]);
    replaceScreeNamesWithLink(tweets[i]);
    replaceLink(tweets[i]);
    console.log(tweets[i].full_text);
  }
  return tweets;
}
export default tweetParser;
