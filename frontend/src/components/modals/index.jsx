import Modal from "react-bootstrap/Modal";
import { Button } from "../button";
import { useRegisterHackathonMutation } from "../../service/api";

function ConfirmationModal({ id, show, handleClose }) {
  const [register] = useRegisterHackathonMutation();
  const handleRegistration = async () => {
    await register({ id });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <p className="fs-16 p-0 m-0">
          you want to registered in this hackathon
        </p>
        <p className="fs-14 p-0 m-0">please read out all the rules carefully</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outine-light"
          className="px-4"
          onClick={handleClose}
          text="No"
        />
        <Button
          variant="lightGreen"
          className="px-4"
          onClick={handleRegistration}
          text="Yes"
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
