import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { NavigationBar } from "./components/navbar";

function App() {
  return (
    //   {/* card */}
    //   <div className="card_padding text-light container mt-5">
    //     <div className="d-flex justify-content-between">
    //       <h6>UKG</h6>
    //       <h6>Saturday, 15 february 2025</h6>
    //     </div>
    //     <h3>UKG India Tech Innovators Challenge – Pune Edition</h3>
    //     <p>
    //       We are excited to announce our virtual hiring event, tailored for
    //       developers with 2-7 years of experience. Be part of UKG's mission to
    //       nurture and develop the next generation of innovative engineers.
    //     </p>
    //     <div className="d-flex align-items-center">
    //       <button className="btn btn-success me-3">Register Now</button>
    //       <p className="p-0 m-0">Registrations open till 14th February</p>
    //     </div>
    //   </div>

    //   {/* section1 */}
    //   {/* <section>
    //     <h3>Active Contests</h3>
    //     <div className="d-flex justify-content-between">
    //       <div>
    //         <h5>ProjectEuler+</h5>
    //         <p>Open Indefinitely</p>
    //       </div>
    //       <button className="btn btn-outline-light mx-3">view detail</button>
    //     </div>
    //   </section> */}
    //   <section className="container my-4">
    //     <h3 className="text-light">Active Contests</h3>

    //   </section>
    // </div>

    <BrowserRouter>
      <div className="layout">
        <NavigationBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
