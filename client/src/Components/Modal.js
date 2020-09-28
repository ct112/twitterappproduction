import React, { useState } from "react";
import { Modal as Modals, Button } from "react-bootstrap";

function Modal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modals show={show} onHide={handleClose}>
        <Modals.Body>Woohoo, you're reading this text in a modal!</Modals.Body>
        <Modals.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modals.Footer>
      </Modals>
    </>
  );
}

export default Modal;
