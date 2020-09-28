import React from "react";
import Masonry from "react-masonry-css";
import "../Tiles.css";
import Cards from "./Cards";
import Modal from "./Modal";

function Tiles(props) {
  if (!Array.isArray(props.tweetData)) {
    return <Modal />;
  }
  const tweetCards = props.tweetData.map((item) => (
    <Cards
      id={item.id}
      screen_name={item.user.screen_name}
      date_created={item.created_at}
      img_url={item.user.profile_image_url}
      favorite_count={item.favorite_count}
      text={item.full_text}
    />
  ));
  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {tweetCards}
    </Masonry>
  );
}

export default Tiles;
