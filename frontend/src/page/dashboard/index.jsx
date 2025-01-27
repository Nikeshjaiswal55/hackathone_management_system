import { ContestCard, DashboardHeroCard } from "../../components/card";
import { SubHeading } from "../../components/subHeader";
import CreatedContest from "../../assets/created_contest.png";
import RegistedContest from "../../assets/participate_contest copy.png";
import ActiveContest from "../../assets/active_contest.png";
import { useGetHackathonByUserIdQuery } from "../../service/api";
import DashboardSkeleton from "../../components/loader/DasboardPageSkeleton";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Dashboard = () => {
  const {
    data: createdHackathons,
    isLoading,
    isError,
  } = useGetHackathonByUserIdQuery();

  useEffect(() => {
    if (isError) {
      toast.error("something went wrong");
    }
  }, [isError]);

  if (isLoading) {
    return <DashboardSkeleton />;
  } else {
    return (
      <>
        <SubHeading
          title="Manage Contest"
          subTitle="Administration"
          isbuttonVissible={false}
        />
        <div className="container">
          {/* Hero Cards Section */}
          <div className="row mt-5">
            <div className="col-12 col-md-4 mb-4">
              <DashboardHeroCard
                image={CreatedContest}
                title="Created Contest"
                navigation={"create"}
              />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <DashboardHeroCard
                image={RegistedContest}
                title="Register Contest"
                navigation={"register"}
              />
            </div>
            <div className="col-12 col-md-4 mb-4">
              <DashboardHeroCard
                image={ActiveContest}
                title="Active Contest"
                navigation={"active"}
              />
            </div>
          </div>

          {/* Past and Upcoming Contests Section */}
          <div className="row mt-5">
            <div
              className="col-12 col-lg-6 card_padding mb-4"
              style={{ height: "calc(100vh - 30rem)", overflow: "auto" }}
            >
              <h3 className="text-light fs-20 mb-3">Past Contests</h3>
              {createdHackathons
                ?.filter((value) => value?.status === "Completed")
                ?.map((hackathonItem, index) => (
                  <div className="my-3 border rounded-4" key={index}>
                    <ContestCard hackathonItem={hackathonItem} />
                  </div>
                ))}
            </div>
            <div
              className="col-12 col-lg-6 card_padding"
              style={{ height: "calc(100vh - 30rem)", overflow: "auto" }}
            >
              <h3 className="text-light fs-20 mb-3">Upcoming Contests</h3>
              {createdHackathons
                ?.filter((value) => value?.status === "Upcoming")
                ?.map((hackathonItem, index) => (
                  <div className="my-3 border rounded-4" key={index}>
                    <ContestCard hackathonItem={hackathonItem} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
