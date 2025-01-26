// import { useNavigate } from "react-router-dom";
// import { Button } from "../button";

// export const SubHeading = ({
//   subTitle,
//   title,
//   isbuttonVissible = true,
//   isbuttonVissible2 = true,
// }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="bg_box">
//       <div className="container d-flex justify-content-between align-items-center p-4">
//         <div className="text-light">
//           <h6 className="m-0 p-0 fs-12 mb-1">{subTitle}</h6>
//           <h4 className="m-0 p-0 fs-24">{title}</h4>
//         </div>
//         <div>
//           {isbuttonVissible && (
//             <Button
//               variant="outline-light"
//               className="mx-3"
//               text="Manage a Contest"
//               onClick={() => navigate(`/manage-contest`)}
//             />
//           )}
//           {isbuttonVissible2 && (
//             <Button
//               variant="lightGreen"
//               text="Create a Contest"
//               onClick={() => navigate(`/create-hackathon`)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import { useNavigate } from "react-router-dom";
import { Button } from "../button";

export const SubHeading = ({
  subTitle,
  title,
  isbuttonVissible = true,
  isbuttonVissible2 = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg_box">
      <div className="container py-4">
        <div className="row align-items-center">
          {/* Left Section (Title and Subtitle) */}
          <div className="col-12 col-md-6 text-light mb-3 mb-md-0">
            <h6 className="m-0 fs-12">{subTitle}</h6>
            <h4 className="m-0 fs-24">{title}</h4>
          </div>

          {/* Right Section (Buttons) */}
          <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
            {isbuttonVissible && (
              <Button
                variant="outline-light"
                className="mx-2 "
                text="Manage a Contest"
                onClick={() => navigate(`/manage-contest`)}
              />
            )}
            {isbuttonVissible2 && (
              <Button
                variant="lightGreen"
                className="mx-2"
                text="Create a Contest"
                onClick={() => navigate(`/create-hackathon`)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
