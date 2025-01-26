import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/button";
import { useLoginUserMutation } from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginUserMutation();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    login(values)
      .then((res) => {
        if (res?.data?.token) {
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("user_id", res?.data?.userId);
          toast.success("login successfully!");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="container mt-4 ">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh", width: "100%" }}
      >
        <div className="card_padding login-form text-light">
          <h2 className="fs-24 text-center">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
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
                <p className="m-0 p-0 my-2 text-end light_green">
                  <Link to="/register">create a account?</Link>
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
                      text="Login"
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

export default LoginForm;
