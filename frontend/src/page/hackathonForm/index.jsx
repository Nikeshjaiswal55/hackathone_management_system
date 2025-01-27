import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Row, Col } from "react-bootstrap";
import { Button } from "../../components/button";
import { useCreateHackathonMutation } from "../../service/api";
import Loader from "../../components/loader/loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const HackathonForm = () => {
  const navigate = useNavigate();
  const [create, { isLoading, isError, error }] = useCreateHackathonMutation();
  const initialValues = {
    contestName: "",
    startDate: "",
    endDate: "",
    organizationType: "",
    organizationName: "",
    tagLine: "",
    description: "",
    registrationDeadline: "",
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data.message);
    }
  }, [isError]);

  const validationSchema = Yup.object({
    contestName: Yup.string().required("Contest name is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be later than start date"),
    organizationType: Yup.string().required("Organization type is required"),
    organizationName: Yup.string().required("Organization name is required"),
    tagLine: Yup.string(),
    description: Yup.string(),
    registrationDeadline: Yup.date().required(
      "Registration deadline is required"
    ),
  });

  const onSubmit = async (values) => {
    await create(values)
      .then((res) => {
        if (res?.data) {
          toast.success("Contest created successfully");
          navigate("/more-hackthon/create");
        }
      })
      .catch((error) => {
        toast.error(error?.data.message);
      });
  };

  return (
    <div className="container mt-3">
      <h3 className="text-light fs-20 mx-0 p-0 text-center mb-4">
        Create Contests
      </h3>
      <div className="card_padding text-light">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Row className="mb-3">
                <Col sm={12} md={6}>
                  <BootstrapForm.Label htmlFor="contestName">
                    Contest Name
                  </BootstrapForm.Label>
                  <Field
                    type="text"
                    placeholder="Enter contest name"
                    name="contestName"
                    className="form-control"
                    id="contestName"
                  />
                  <ErrorMessage
                    name="contestName"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col sm={12} md={6}>
                  <BootstrapForm.Label htmlFor="startDate">
                    Start Date
                  </BootstrapForm.Label>
                  <Field
                    type="date"
                    placeholder="Enter start date of contest"
                    name="startDate"
                    className="form-control"
                    id="startDate"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={12} md={6}>
                  <BootstrapForm.Label htmlFor="endDate">
                    End Date
                  </BootstrapForm.Label>
                  <Field
                    placeholder="Enter end date of contest"
                    type="date"
                    name="endDate"
                    className="form-control"
                    id="endDate"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col sm={12} md={6}>
                  <BootstrapForm.Label htmlFor="organizationType">
                    Organization Type
                  </BootstrapForm.Label>
                  <Field
                    type="text"
                    placeholder="Enter organization type (like : school,college,company,other)"
                    name="organizationType"
                    className="form-control"
                    id="organizationType"
                  />
                  <ErrorMessage
                    name="organizationType"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={12} md={6}>
                  <BootstrapForm.Label htmlFor="organizationName">
                    Organization Name
                  </BootstrapForm.Label>
                  <Field
                    type="text"
                    placeholder="Enter organization name"
                    name="organizationName"
                    className="form-control"
                    id="organizationName"
                  />
                  <ErrorMessage
                    name="organizationName"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col sm={12} md={6}>
                  <BootstrapForm.Label htmlFor="tagLine">
                    Tagline
                  </BootstrapForm.Label>
                  <Field
                    type="text"
                    placeholder="Enter tagline for contest"
                    name="tagLine"
                    className="form-control"
                    id="tagLine"
                  />
                  <ErrorMessage
                    name="tagLine"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={12}>
                  <BootstrapForm.Label htmlFor="description">
                    Description
                  </BootstrapForm.Label>
                  <Field
                    as="textarea"
                    placeholder="Enter description for contest"
                    name="description"
                    className="form-control"
                    id="description"
                    rows="4"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={12}>
                  <BootstrapForm.Label htmlFor="registrationDeadline">
                    Registration Deadline
                  </BootstrapForm.Label>
                  <Field
                    type="date"
                    placeholder="Enter registration deadline"
                    name="registrationDeadline"
                    className="form-control"
                    id="registrationDeadline"
                  />
                  <ErrorMessage
                    name="registrationDeadline"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>
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
                    className="mt-3"
                    variant="lightGreen"
                    disabled={isSubmitting}
                    text="Create Contest"
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HackathonForm;
