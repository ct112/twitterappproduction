import React from "react";
import obama from "../img/obamabarack3.jpg";
import curry from "../img/curry.png";
import jordan from "../img/jordan.jpg";
import kaku from "../img/Michio_Kaku.jpg";
import musk from "../img/elon.jpg";
import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";
import Quote from "./Quote";

function Carousel({ handleClickImage, tweet }) {
  const twitterCelebs = [
    { name: "Barack Obama", src: obama, twitterHandle: "BarackObama" },
    { name: "Micheal Jordan", src: jordan, twitterHandle: "Jumpman23" },
    { name: "Michio Kaku", src: kaku, twitterHandle: "michiokaku" },
    { name: "Elon Musk", src: musk, twitterHandle: "elonmusk" },
    { name: "Stephen Curry", src: curry, twitterHandle: "StephenCurry30" },
  ];
  const images = twitterCelebs.map((celeb, index) => {
    return (
      <div key={index} onClick={(event) => handleClickImage(event)}>
        <img
          id={celeb.twitterHandle}
          width="350px"
          src={celeb.src}
          alt={celeb.name}
        />
      </div>
    );
  });

  return (
    <div>
      <StyleRoot>
        <Coverflow
          displayQuantityOfSide={2}
          navigation={true}
          enableHeading={true}
          enableScroll={true}
          clickable={true}
          media={{
            "@media (max-width: 900px)": {
              width: "600px",
              height: "300px",
            },
            "@media (min-width: 900px)": {
              width: "1500px",
              height: "400px",
            },
          }}
        >
          {images}
        </Coverflow>
        <Quote tweet={tweet} />
      </StyleRoot>
    </div>
  );
}
export default Carousel;
