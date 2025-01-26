import { useParams } from "react-router-dom";
import { SubHeading } from "../../components/subHeader";
import { ContestCard } from "../../components/card";
import {
  useGetAllHackathonQuery,
  useGetHackathonByUserIdQuery,
  useGetRegisterHackathonByUserIdQuery,
} from "../../service/api";
import { HomePageLoader } from "../../components/loader/homePageSckeleton";

function ViewMoreHackathon() {
  const { id } = useParams();
  const { data, isLoading: HackLoading } = useGetAllHackathonQuery();
  const { data: createdHackathons, isLoading: createdHacksLoad } =
    useGetHackathonByUserIdQuery();
  const { data: registerHackathons, isLoading: registerHackload } =
    useGetRegisterHackathonByUserIdQuery();
  console.log("id", id != "create");
  const dashBoardHackathones =
    id !== "create" ? registerHackathons : createdHackathons;
  const activeHackathons = id == "active" ? createdHackathons : data;
  const status = id == "active" ? "Ongoing" : id;

  if (HackLoading || createdHacksLoad || registerHackload) {
    return <HomePageLoader />;
  } else {
    return (
      <>
        <SubHeading
          title="Contest"
          subTitle={`All ${id?.toLocaleUpperCase()}`}
        />
        ;
        <section className="container mt-2">
          <h3 className="text-light fs-20 mb-3 mx-0 p-0">
            {id?.toLocaleUpperCase()} Contests
          </h3>
          <div className="row">
            {id !== "create" && id !== "register"
              ? activeHackathons
                  ?.filter((value) => value?.status === status)
                  ?.map((hackathonItem, index) => (
                    <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                      <ContestCard hackathonItem={hackathonItem} />
                    </div>
                  ))
              : dashBoardHackathones?.map((hackathonItem, index) => (
                  <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                    <ContestCard hackathonItem={hackathonItem} />
                  </div>
                ))}
          </div>
        </section>
      </>
    );
  }
}
export default ViewMoreHackathon;
