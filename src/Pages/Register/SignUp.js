import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Lottie from "lottie-react";
import LoginAnim from "../../Assets/login.json";
import SignUpAnim from "../../Assets/signUps.json";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

import { useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";

const SignUp = () => {
  useTitle("Sign Up");
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut, providerLogin } =
    useContext(AuthContext);
  const [erros, setErrors] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const location = useLocation();
  const fromss = location.state?.from?.pathname || "/";
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photoURL, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setErrors("");
        handleUpdateUserProfile(name, photoURL);

        // after registration it will automatic logout start
        logOut()
          .then({})
          .catch((e) => {
            console.error(e);
            setErrors(e.message);
          });
        // after registration it will automatic logout end
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.message);
        setErrors(e.message);
        // setregError(console.error(e))
      });
  };

  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    console.log("clickLogin");
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        // console.log(user)
        // navigate(fromss,{replace:true});
        const currentUser = {
          email: user.email,
        };

        console.log("Current user", currentUser);

        // get jwt token
        fetch("https://a11-flytographer-server-side.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("genius-token", data.token);
          });

        // form.reset();
        setErrors("");
        navigate(fromss, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col lg="5">
          <div>
            <Lottie
              animationData={SignUpAnim}
              style={{ height: "100%" }}
            ></Lottie>
          </div>
        </Col>

        <Col lg="5" className="order">
          <h2 className="fw-bold text-center py-3">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Your full name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Photo url</Form.Label>
              <Form.Control
                name="photoURL"
                type="text"
                placeholder="Enter Your photo url"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Text className="text-danger mb-2 d-block">{erros}</Form.Text>
            <Button variant="primary" type="submit" className="d-block w-100">
              Register
            </Button>
            <p className="d-flex flex-row my-2 justify-content-center">
              Already Have an account?
              <Nav.Link className="mx-1 text-primary" as={Link} to="/login">
                Login
              </Nav.Link>
            </p>
            <p className="text-center">Or</p>
          </Form>
          <Button
            variant="light"
            type="submit"
            className="bg-light d-block w-100 mb-2 fw-bold"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="fw-bold fs-2 me-2" />
            Continue With Google
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
