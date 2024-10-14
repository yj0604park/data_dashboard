import axios from 'axios';
import { Formik } from 'formik';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useAuth } from 'store/authContext';
import * as Yup from 'yup';

const JWTLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  if (localStorage.getItem('token')) {
    console.log('Token exists');
    login(localStorage.getItem('token'));
    navigate('/demos/admin-templates/datta-able/react/free/dashboard');
  }

  return (
    <Formik
      initialValues={{
        username: 'info',
        password: '123456',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('Username is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const response = await axios.post('http://192.168.50.12:8000/api/auth-token/', {
            username: values.username,
            password: values.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (response.status === 200) {
            const data = await response.data;
            await login(data.token);
            localStorage.setItem('token', data.token);
            setStatus({ success: true });
            navigate('/demos/admin-templates/datta-able/react/free/dashboard');
            // Store the token or handle successful login
          } else {
            setErrors({ submit: 'Invalid username or password' });
            setStatus({ success: false });
          }
          setSubmitting(false);
        } catch (err) {
          setErrors({ submit: err.message });
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              label="Username"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.username}
            />
            {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button className="btn-block mb-4" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
