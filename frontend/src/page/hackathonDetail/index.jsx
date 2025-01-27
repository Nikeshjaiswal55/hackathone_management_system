import { useParams } from "react-router-dom";
import {
  useGetAllHackathonQuery,
  useGetHackathonByIdQuery,
} from "../../service/api";
import { ContestCard, RegistrationCard } from "../../components/card";
import { SubHeading } from "../../components/subHeader";
import ConfirmationModal from "../../components/modals";
import { useEffect, useState } from "react";
import { HomePageLoader } from "../../components/loader/homePageSckeleton";
import toast from "react-hot-toast";

function HackathonDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetHackathonByIdQuery(id);
  const {
    data: allHackathon,
    isLoading: hackathonLoading,
    isError: hackathonerror,
  } = useGetAllHackathonQuery();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isError || hackathonerror) {
      toast.error("something went wrong");
    }
  }, [isError, hackathonerror]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (isLoading || hackathonLoading) {
    return <HomePageLoader />;
  } else {
    return (
      <div>
        <SubHeading
          title={data?.contestName}
          subTitle="More Detail About Contest"
          isbuttonVissible={false}
          isbuttonVissible2={false}
        />

        <RegistrationCard hackathonItem={data} handleShow={handleShow} />
        <div className="container border-bottom pb-3 ">
          <h3 className="text-light fs-20  mx-0 p-0 mt-5">
            Eligibility Criteria
          </h3>
          <ul className="text-light">
            <li>
              <span>
                Must have at least 2 years of experience in software
                development.
              </span>
            </li>
            <li>
              <span>
                Must hold a Bachelor's degree in Computer Science or a related
                field.
              </span>
            </li>
            <li>
              <span>
                Must have a strong understanding of coding and debugging.
              </span>
            </li>
            <li>
              <span>
                Must be a self-starter with a passion for learning and growing.
              </span>
            </li>
          </ul>

          <h3 className="text-light fs-20  mx-0 p-0 mt-4">Rules</h3>
          <ul className="text-light">
            <li>
              Participation in the event is subject to the sole discretion of
              the organizer.
            </li>
            <li>
              The organizer reserves the right to determine the final ranks in
              the leaderboard.
            </li>
            <li>
              Any case of cheating will result in disqualification from the
              event.
            </li>
          </ul>
        </div>
        <section className="container mt-5">
          <h3 className="text-light fs-20 mb-3 mx-0 p-0">
            More Similiear Upcoming Contests
          </h3>
          <div className="row">
            {allHackathon
              ?.filter(
                (value) => value?.status === "Upcoming" && value?._id !== id
              )
              ?.slice(0, 4)
              ?.map((hackathonItem, index) => (
                <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                  <ContestCard hackathonItem={hackathonItem} />
                </div>
              ))}
          </div>{" "}
        </section>
        <ConfirmationModal id={id} show={show} handleClose={handleClose} />
      </div>
    );
  }
}

export default HackathonDetail;
