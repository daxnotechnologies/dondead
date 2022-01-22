import Link from "next/link";
import { useRouter } from "next/router";

import { LayoutTwo } from "../../../components/Layout";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { BreadcrumbOne } from "../../../components/Breadcrumb";
import { useState } from "react";
import { useEffect } from "react";
import { check, reset } from "../../../api";

const PasswordReset = () => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    const { email, token } = router.query;
    if (password == confirm) {
      reset({ email, password, token }).then((res) => router.push("/"));
    }
  };

  useEffect(() => {
    const { token } = router.query;
    check({ token })
      .then(() => {
        setValid(true);
        setLoading(false);
      })
      .catch(() => {
        setValid(false);
        setLoading(false);
      });
  }, []);
  return (
    <LayoutTwo>
      <BreadcrumbOne pageTitle="Reset Password">
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Reset Password</li>
        </ul>
      </BreadcrumbOne>
      {loading ? (
        <Spinner />
      ) : valid ? (
        <div className="login-area space-mt--r50 space-mb--r130">
          <Container>
            <Row style={{ justifyContent: "center" }}>
              <Col lg={6} className="space-mb-mobile-only--50">
                <div className="lezada-form login-form--register">
                  <form onSubmit={handleSubmit}>
                    <Row>
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

                      <Col lg={12} className="space-mb--50">
                        <label htmlFor="confirmPassword">
                          Confirm Password <span className="required">*</span>{" "}
                        </label>
                        <input
                          name="confirmPassword"
                          type="password"
                          id="confirmPassword"
                          required
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                        />
                      </Col>

                      <Col lg={12} className="text-center">
                        <button
                          className="lezada-button lezada-button--medium"
                          type="submit"
                        >
                          register
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className="login-area space-mt--r50 space-mb--r130">
          <Container>
            <Row style={{ justifyContent: "center" }}>
              <Col lg={6} className="space-mb-mobile-only--50">
                <h5> The link created has expired</h5>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </LayoutTwo>
  );
};

export default PasswordReset;
