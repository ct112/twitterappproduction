import React from "react";

function Quote(props) {
  if (!props.tweet || !props.tweet.user) {
    return null;
  }
  return (
    <section id="quote" className="bg-parallax py-5 mt-3">
      <div className="container">
        <blockquote className="blockquote py-5 text-center border-0">
          <p className="mb-0 display-4">{props.tweet.full_text}</p>
          <footer className="blockquote-footer">{props.tweet.user.name}</footer>
        </blockquote>
      </div>
    </section>
  );
}

export default Quote;
