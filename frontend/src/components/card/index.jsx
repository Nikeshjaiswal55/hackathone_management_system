import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formateDate";
import formatRegistrationDate from "../../utils/formateRegistrationDate";
import { Button } from "../button";

export const HeroCard = ({ hackathonItem }) => {
  const navigate = useNavigate();
  return (
    <div className="card_padding text-light mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h6>{hackathonItem?.organizationName}</h6>
        <h6>{formatDate(hackathonItem?.startDate)}</h6>
      </div>
      <h3 className="fs-24 mb-3">{hackathonItem?.contestName}</h3>

      <p className="fs-16">{hackathonItem?.description} </p>

      <div className="d-flex align-items-center mt-4">
        <Button
          onClick={() => navigate(`/detail/${hackathonItem?._id}`)}
          variant="lightGreen"
          className="me-3"
          text="View Detail"
        />
        <p className="p-0 m-0">
          {formatRegistrationDate(hackathonItem?.registrationDeadline)}
        </p>
      </div>
    </div>
  );
};

export const ContestCard = ({ hackathonItem }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between flex-wrap align-items-center py-3 text-light card_padding">
      <div className="mb-3">
        <h5 className="fs-16">{hackathonItem?.contestName}</h5>
        <p className="mb-0 fs-12">
          {formatRegistrationDate(hackathonItem?.registrationDeadline)}
        </p>
      </div>
      <div className="text-md-end text-start mt-3 mt-md-0">
        <Button
          variant="outline-light"
          text="View Details"
          onClick={() => navigate(`/detail/${hackathonItem?._id}`)}
        />
      </div>
    </div>
  );
};

export const DashboardHeroCard = ({ image, title, navigation }) => {
  const navigate = useNavigate();
  return (
    <div className="py-3 text-light d-flex flex-column align-items-center card_padding">
      <img src={image} className="img-fluid image_color" alt="icon" />
      <p className="mb-0 fs-20 mb-3">{title}</p>
      <div className=" mt-3 mt-md-0">
        <Button
          variant="outline-light"
          className="px-5"
          text="View"
          onClick={() => navigate(`/more-hackthon/${navigation}`)}
        />
      </div>
    </div>
  );
};

export const RegistrationCard = ({ hackathonItem, handleShow }) => {
  return (
    <div className="card_padding text-light container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h6>{hackathonItem?.organizationName}</h6>
        <h6>{formatDate(hackathonItem?.startDate)}</h6>
      </div>
      <h3 className="fs-24 mb-3">{hackathonItem?.contestName}</h3>
      <h5 className="fs-16 text-success">{hackathonItem?.tagLine} </h5>
      <p className="fs-16">{hackathonItem?.description} </p>
      <p className="fs-16 me-0 me-md-4 mt-3">
        From{" "}
        <span className="text-success">
          {formatDate(hackathonItem?.startDate)}
        </span>{" "}
        To
        <span className="text-success">
          {formatDate(hackathonItem?.endDate)}
        </span>
      </p>
      <div className="d-flex align-items-center mt-4">
        {hackathonItem?.status === "Ongoing" ||
        hackathonItem?.status === "Completed" ? (
          <Button
            disabled={true}
            variant="lightGreen"
            className="me-3"
            text={
              hackathonItem?.status === "Ongoing"
                ? "Contest Ongoing"
                : "Contest Completed"
            }
          />
        ) : (
          <Button
            variant="lightGreen"
            className="me-3"
            disabled={
              hackathonItem?.registrationStatus === "true" ? true : false
            }
            onClick={handleShow}
            text={
              hackathonItem?.registrationStatus === "true"
                ? "Applied"
                : "Register Now"
            }
          />
        )}
        <p className="p-0 m-0">
          {hackathonItem?.status === "Ongoing" ||
          hackathonItem?.status === "Completed"
            ? ""
            : formatRegistrationDate(hackathonItem?.registrationDeadline)}
        </p>
      </div>
    </div>
  );
};
