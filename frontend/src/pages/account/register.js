import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { useState } from "react";
import { signup } from "../../api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Register = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vatID, setVatID] = useState("");

  const [vat, setVat] = useState();

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    signup({ firstName, lastName, email, password, vatID })
      .then((response) => {
        console.log("response=", response.data);

        console.log("token: ", response.data.token);
        try {
          Cookies.set("token", response.data.token);
          Cookies.set("mail", email);

          router.push("/account");
        } catch (e) {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log();
        if (error.response.data.message === "User already exists.") {
          alert("User with this email already exists");
        } else {
          alert("Cant sign up due to some server error");
        }
      });
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
              <div className="lezada-form login-form--register">
                <form onSubmit={handleSignup}>
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Register</h2>
                        <p>If you don’t have an account, register now!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="firstName">
                        First Name <span className="required">*</span>{" "}
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="lastName">
                        Last Name <span className="required">*</span>{" "}
                      </label>
                      <input
                        name="lastName"
                        type="text"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                      />
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="regEmail">
                        Email Address <span className="required">*</span>{" "}
                      </label>
                      <input
                        name="email"
                        type="email"
                        id="regEmail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col lg={12} className="space-mb--50">
                      <label htmlFor="regPassword">
                        Password <span className="required">*</span>{" "}
                      </label>
                      <input
                        name="password"
                        type="password"
                        id="regPassword"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>

                    <Col lg={12} className="space-mb--50 single-method">
                      <input
                        type="checkbox"
                        id="vat_check"
                        onChange={(e) => setVat(e.target.checked)}
                      />
                      <label htmlFor="vat_check">Are you a VAT user?</label>
                    </Col>
                    {vat ? (
                      <Col lg={12} className="space-mb--50">
                        <label htmlFor="vat">
                          VAT ID <span className="required">*</span>{" "}
                        </label>
                        <input
                          name="vat_id"
                          type="text"
                          id="regPassword"
                          required
                          value={vatID}
                          onChange={(e) => setVatID(e.target.value)}
                        />
                      </Col>
                    ) : (
                      ""
                    )}

                    <Col lg={12} className="text-center">
                      <button
                        className="lezada-button lezada-button--medium"
                        type="submit"
                      >
                        register
                      </button>
                    </Col>
                    <Col className="space-mt--30">
                      <Link href="/account/login">
                        <a className="reset-pass-link">
                          Already have an account? Login Now!
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

export default Register;
