import Modal from "react-bootstrap/Modal";
import { Button } from "../button";
import { useRegisterHackathonMutation } from "../../service/api";
import Loader from "../loader/loader";
import toast from "react-hot-toast";

function ConfirmationModal({ id, show, handleClose }) {
  const [register, { isLoading }] = useRegisterHackathonMutation();
  const handleRegistration = async () => {
    await register({ id })
      .then((res) => {
        if (res) {
          toast.success("contest registration successfull");
          handleClose();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="bg-dark text-white border-0">
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white ">
        {" "}
        <p className="fs-16 p-0 m-0">
          you want to registered in this hackathon
        </p>
        <p className="fs-14 p-0 m-0">please read out all the rules carefully</p>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button
          variant="outine-light"
          className="px-4 text-light border"
          onClick={handleClose}
          text="No"
        />
        {isLoading ? (
          <Button
            type="submit"
            className="px-5 my-4"
            variant="lightGreen"
            text={<Loader />}
          />
        ) : (
          <Button
            variant="lightGreen"
            className="px-4"
            onClick={handleRegistration}
            text="Yes"
          />
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
