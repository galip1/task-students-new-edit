import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../helpers/swal";
import { newStudent } from "../../api/student-service";

const AdminStudentNew = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Please enter your first name")
      .min(2, "Please enter at least 2 characters")
      .max(30, "Please enter the most 30 characters"),
    lastName: Yup.string()
      .required("Please enter your last name")
      .min(2, "Please enter at least 2 characters")
      .max(30, "Please enter the most 30 characters"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await newStudent(values);
      toast("student was added", "success");
      formik.resetForm();
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <section className="new-student-form">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row className="row-cols-1">
          <Form.Group className="mb-3" as={Col}>
            <Form.Control
              placeholder="First Name"
              type="text"
              {...formik.getFieldProps("firstName")}
              isValid={formik.touched.firstName && !formik.errors.firstName}
              isInvalid={formik.touched.firstName && !!formik.errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col}>
            <Form.Control
              placeholder="Last Name"
              type="text"
              {...formik.getFieldProps("lastName")}
              isValid={formik.touched.lastName && !formik.errors.lastName}
              isInvalid={formik.touched.lastName && !!formik.errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            disabled={!(formik.dirty && formik.isValid) || loading}
          >
            {loading && <Spinner animation="border" size="sm" />} Add
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AdminStudentNew;
