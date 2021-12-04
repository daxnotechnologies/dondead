import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authentication/actionCreator";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useRouter();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }, history));
  };

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Customer Login"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-2.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Customer Login</li>
        </ul>
      </BreadcrumbOne>
      <div className="login-area space-mt--r130 space-mb--r130">
        <Container>
          <Row style={{ justifyContent: "center" }}>
            <Col lg={6} className="space-mb-mobile-only--50">
              <div className="lezada-form login-form">
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50 justify">
                        <h2 className="space-mb--20">Login</h2>
                        <p>Great to have you back!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        name="email"
                        type="email"
                        id="regEmail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col lg={12} className="space-mb--60">
                      <input
                        name="password"
                        type="password"
                        id="regPassword"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <button
                        className="lezada-button lezada-button--medium"
                        type="submit"
                      >
                        Login
                      </button>
                    </Col>
                    <Col>
                      <input type="checkbox" />{" "}
                      <span className="remember-text">Remember me</span>
                      <a href="#" className="reset-pass-link">
                        Lost your password?
                      </a>
                      <Link href="/account/register">
                        <a className="reset-pass-link">
                          Dont have an account? Register Now!
                        </a>
                      </Link>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default Login;
