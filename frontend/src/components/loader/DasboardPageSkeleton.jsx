import { SubHeading } from "../../components/subHeader";

const DashboardSkeleton = () => {
  return (
    <>
      <SubHeading
        title="Manage Contest"
        subTitle="Administration"
        isbuttonVissible={false}
      />
      <div className="container">
        <div className="row mt-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="placeholder-glow mb-5 col-12 col-md-4">
              <div
                className="placeholder col-12 mb-3"
                style={{ height: "200px" }}
              ></div>
              <div className="placeholder col-6"></div>
            </div>
          ))}
        </div>

        <section className="mb-5">
          <div className="d-flex justify-content-between mb-3">
            <div className="placeholder col-4"></div>
            <div className="placeholder col-3"></div>
          </div>
          <div className="row">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                  <div className="placeholder-glow">
                    <div
                      className="placeholder col-12 mb-3"
                      style={{ height: "150px" }}
                    ></div>
                    <div className="placeholder col-6 mb-2"></div>
                    <div className="placeholder col-8"></div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="mb-5">
          <div className="d-flex justify-content-between mb-3">
            <div className="placeholder col-4"></div>
            <div className="placeholder col-3"></div>
          </div>
          <div className="row">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div className="col-lg-6 col-md-6 col-12 mb-4" key={index}>
                  <div className="placeholder-glow">
                    <div
                      className="placeholder col-12 mb-3"
                      style={{ height: "150px" }}
                    ></div>
                    <div className="placeholder col-6 mb-2"></div>
                    <div className="placeholder col-8"></div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardSkeleton;
