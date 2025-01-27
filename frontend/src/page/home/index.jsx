import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { ContestCard, HeroCard } from "../../components/card";
import { SubHeading } from "../../components/subHeader";
import { useGetAllHackathonQuery } from "../../service/api";
import { HomePageLoader } from "../../components/loader/homePageSckeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";
const Home = () => {
  const { data, isLoading, isError } = useGetAllHackathonQuery();

  useEffect(() => {
    if (isError) {
      toast.error("something went wrong");
    }
  }, [isError]);

  const navigate = useNavigate();
  if (isLoading) {
    return <HomePageLoader />;
  } else {
    return (
      <>
        <SubHeading title="Contest" subTitle="All Contest" />
        {data
          ?.filter((value) => value?.status === "Upcoming")
          ?.slice(0, 1)
          ?.map((hackathonItem, index) => (
            <div className="container" key={index}>
              <HeroCard hackathonItem={hackathonItem} />
            </div>
          ))}

        {/* active event section */}
        <section className="container mt-5">
          <div className="d-flex justify-content-between mb-3">
            <h3 className="text-light fs-20 mx-0 p-0">Active Contests</h3>
            <Button
              variant="outline-light-green"
              className="m-0"
              text="View All ->"
              onClick={() => navigate(`/more-hackthon/${"Ongoing"}`)}
            />
          </div>
          <div className="row">
            {data
              ?.filter((value) => value?.status === "Ongoing")
              ?.slice(0, 4)
              ?.map((hackathonItem, index) => (
                <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                  <ContestCard hackathonItem={hackathonItem} />
                </div>
              ))}
          </div>
        </section>
        {/* upcoming event section */}
        <section className="container mt-5">
          <div className="d-flex justify-content-between mb-3">
            <h3 className="text-light fs-20 mx-0 p-0">Upcoming Contests</h3>
            <Button
              variant="outline-light-green"
              className="m-0"
              text="View All ->"
              onClick={() => navigate(`/more-hackthon/${"Upcoming"}`)}
            />
          </div>
          <div className="row">
            {data
              ?.filter((value) => value?.status === "Upcoming")
              ?.slice(0, 4)
              ?.map((hackathonItem, index) => (
                <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                  <ContestCard hackathonItem={hackathonItem} />
                </div>
              ))}
          </div>{" "}
        </section>

        {/* Archived  event section */}
        <section className="container mt-5">
          <div className="d-flex justify-content-between mb-3">
            <h3 className="text-light fs-20 mx-0 p-0">Archived Contests</h3>
            <Button
              variant="outline-light-green"
              className="m-0"
              text="View All ->"
              onClick={() => navigate(`/more-hackthon/${"Completed"}`)}
            />
          </div>
          <div className="row">
            {data
              ?.filter((value) => value?.status === "Completed")
              ?.slice(0, 4)
              ?.map((hackathonItem, index) => (
                <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                  <ContestCard hackathonItem={hackathonItem} />
                </div>
              ))}
          </div>
        </section>
      </>
    );
  }
};

export default Home;
