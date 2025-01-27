import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { NavigationBar } from "./components/navbar";
import ProtectedRoute from "./routes/protected.route";

function App() {

  return (
    <BrowserRouter>
      <div className="layout">
        <NavigationBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, element, isProtected }, index) =>
              isProtected ? (
                <Route
                  key={index}
                  path={path}
                  element={
                    <ProtectedRoute
                      element={element}
                    />
                  }
                />
              ) : (
                <Route key={index} path={path} element={element} />
              )
            )}
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
