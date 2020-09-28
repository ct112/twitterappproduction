import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

function Searchbar({ handleChange, handleClick }) {
  return (
    <InputGroup className="mb-3 mt-4">
      <FormControl
        onChange={(event) => handleChange(event)}
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      {["content", "user"].map((searchType, index) => {
        return (
          <InputGroup.Append key={index}>
            <Button
              variant="outline-secondary"
              data-type={searchType}
              onClick={(event) => handleClick(event)}
            >
              {searchType}
            </Button>
          </InputGroup.Append>
        );
      })}
    </InputGroup>
  );
}
export default Searchbar;

