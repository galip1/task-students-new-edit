import {
  Form,
  Button,
  InputGroup,
  Container,
  Spinner,
  FormLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.scss";
import { useState } from "react";
import PasswordInput from "./passeord-input";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const dispatch = useAppDispatch();

  function handleClick() {
    navigate("/register");
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      // const respAuth = await login(values);
      // localStorage.removeItem("cartUUID");
      // sessionStorage.removeItem("cartUUID");
      // const storage = rememberMe ? encryptedLocalStorage : encryptedSessionStorage;
      // storage.setItem('token', respAuth.data.token);
      // rememberMe ? localStorage.setItem("cartUUID", respAuth.data.cartUUID) : sessionStorage.setItem("cartUUID", respAuth.data.cartUUID);
      // const respUser = await getUser();
      // dispatch(loginSuccess(respUser.data));
      // dispatch(setItems(respUser.data.favoriteList));
      // await loadCart();
      // navigate("/");
    } catch (err) {
      //   dispatch(loginFailed());
      const message = err.response ? err.response.data.message : err;
      //   toast(message, "error");
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
    <Container fluid className="loginDiv">
      <Form noValidate onSubmit={formik.handleSubmit} className="p-4">
        <div className="headers">
          <h2>
            <span>|</span> MANAGE COURSES
          </h2>
          <h4>SIGN IN</h4>
          <p>Enter your credentials to acces your acount</p>
        </div>

        <FormLabel>Email</FormLabel>
        <InputGroup className="mb-3">
          <Form.Control
            className="email-input"
            type="email"
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && formik.errors.email}
            isValid={formik.touched.email && !formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </InputGroup>

        <PasswordInput
          placeholder="Enter your password"
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && formik.errors.password}
          isValid={formik.touched.password && !formik.errors.password}
          error={formik.errors.password}
        />

        <Link to="/admin">
          <Button
            variant="primary"
            type="submit"
            disabled={!(formik.dirty && formik.isValid) || loading}
          >
            {loading && <Spinner animation="border" size="sm" />} SIGN IN
          </Button>
        </Link>

        <div className="forgot-reset">
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <Form.Text className="forgotText">Forgot your password?</Form.Text>
          </Link>
          <Link to="/admin">
            <Form.Text className="resetText">Reset password</Form.Text>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
