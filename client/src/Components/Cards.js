import React from "react";
import Moment from "react-moment";

function Cards({
  id,
  screen_name,
  date_created,
  img_url,
  favorite_count,
  text,
}) {
  return (
    <div className="card" style={{ width: 450 }} key={id}>
      <div className="card-header">
        <img src={img_url} alt={`${screen_name} profile pic`} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{screen_name}</h5>
        <h6>
          <Moment format="MM/DD/YYYY">{date_created}</Moment>
        </h6>

        <p className="card-text">{text}</p>
      </div>
      <div className="card-footer text-muted">{favorite_count}</div>
    </div>
  );
}

export default Cards;
