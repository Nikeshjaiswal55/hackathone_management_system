import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/button";
import { useCreateUserMutation } from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };

  const [createUser, { isLoading }] = useCreateUserMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "mobileNumber number must be 10 digits")
      .required("mobileNumber number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Registration Data:", values);
    createUser(values).then((res) => {
      if (res.data?.token) {
        localStorage.setItem("token", res.data?.token);
        navigate("/login");
      }
    });
  };

  return (
    <div className="container mt-4">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh", width: "100%" }}
      >
        <div className="card_padding login-form text-light">
          <h2 className="fs-24 text-center">Register</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    className="form-control"
                    id="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className="form-control"
                    id="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                    mobile Number
                  </label>
                  <Field
                    type="text"
                    placeholder="Enter your mobile number"
                    name="mobileNumber"
                    className="form-control"
                    id="mobileNumber"
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    className="form-control"
                    id="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    className="form-control"
                    id="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <p className="m-0 p-0 my-2 text-end light_green">
                  <Link to="/login">have a account?</Link>
                </p>
                <div className="d-flex justify-content-center">
                  {isLoading ? (
                    <Button
                      type="submit"
                      className="px-5 my-4"
                      variant="lightGreen"
                      text={<Loader />}
                    />
                  ) : (
                    <Button
                      type="submit"
                      className="px-5 my-4"
                      variant="lightGreen"
                      text="Create Account"
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
