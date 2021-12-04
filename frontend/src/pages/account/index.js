import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Container, Row, Col } from "react-bootstrap";
import { FaCloudDownloadAlt, FaRegEdit } from "react-icons/fa";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/profile/actionCreator";
import { logOut } from "../../redux/authentication/actionCreator";
import { cancelOffer, getOffers, paypalUpdate } from "../../api";

const MyAccount = () => {
  // const [check, setCheck] = useState(false);
  const [bankAd, setBankAd] = useState("");
  const [payEmail, setPayEmail] = useState("");
  const router = useRouter();
  const profile = useSelector((state) => state.profile.profile);
  const [offers, setOffers] = useState([]);

  const dispatch = useDispatch();

  if (!Cookies.get("token")) {
    router.push("account/login");
  } else {
    dispatch(getProfile());
    // setCheck(true);
  }

  useEffect(() => {
    getOffers(profile._id)
      .then(({ data }) => setOffers(data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    console.log("s");
    dispatch(logOut(router));
  };

  const getTimeDifferce = (time, c) => {
    const s = new Date(time);
    const a = new Date();
    const differ = (a - s) / (1000 * 60);

    if (differ < 120 && (c == undefined || c == false)) return true;
    else return false;
  };

  const Cancel = (id) => {
    cancelOffer({ _id: id, balance: profile.balance });
  };

  const submitPaypal = (e) => {
    e.preventDefault();
    paypalUpdate({ ...profile, paypal: payEmail })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const submitBank = (e) => {
    e.preventDefault();
    paypalUpdate({ ...profile, bankDetails: bankAd })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="My Account"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-2.jpg"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>My Account</li>
        </ul>
      </BreadcrumbOne>
      <div className="my-account-area space-mt--r130 space-mb--r130">
        <Container>
          <Tab.Container defaultActiveKey="dashboard">
            <Nav
              variant="pills"
              className="my-account-area__navigation space-mb--r60"
            >
              <Nav.Item>
                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Offers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="coins">DonDead Coins</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="payment">Payment</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="address">Address</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="accountDetails">Account Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="logout">Log Out</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="dashboard">
                <div className="my-account-area__content">
                  <h3>Dashboard</h3>
                  <div className="welcome">
                    <p>
                      Hello,{" "}
                      <strong>{`${profile.firstName} ${profile.lastName}`}</strong>{" "}
                      (If Not <strong>{profile.firstName} !</strong>{" "}
                      {/* <Link
                        href="/other/login-register"
                        as={process.env.PUBLIC_URL + "/other/login-register"}
                      > */}
                      <span
                        onClick={logout}
                        className="logout"
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        Logout
                      </span>
                      {/* </Link> */})
                    </p>
                  </div>
                  <p>
                    From your account dashboard. you can easily check &amp; view
                    your recent offers, manage your shipping and billing
                    addresses and edit your password and account details.
                  </p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                <div className="my-account-area__content">
                  <h3>Offers</h3>
                  <div className="myaccount-table table-responsive text-center">
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th>Offer</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {offers.map((offer, index) => (
                          <tr key={offer._id}>
                            <td>{index + 1}</td>
                            <td>{offer.timestamp}</td>
                            <td>
                              {offer.cancel ? "CANCELLEDS" : offer.status}
                            </td>
                            <td>{offer.amount}</td>
                            <td>
                              {getTimeDifferce(
                                offer.timestamp,
                                offer.cancel
                              ) ? (
                                <span
                                  onClick={() => Cancel(offer._id)}
                                  style={{ cursor: "pointer" }}
                                  className="check-btn sqr-btn "
                                >
                                  Cancel
                                </span>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="download">
                <div className="my-account-area__content">
                  <h3>Downloads</h3>
                  <div className="myaccount-table table-responsive text-center">
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th>Product</th>
                          <th>Date</th>
                          <th>Expire</th>
                          <th>Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Haven - Free Real Estate PSD Template</td>
                          <td>Aug 22, 2020</td>
                          <td>Yes</td>
                          <td>
                            <a href="#" className="check-btn sqr-btn ">
                              <FaCloudDownloadAlt /> Download File
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>HasTech - Portfolio Business Template</td>
                          <td>Sep 12, 2020</td>
                          <td>Never</td>
                          <td>
                            <a href="#" className="check-btn sqr-btn ">
                              <FaCloudDownloadAlt /> Download File
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="coins">
                <div className="my-account-area__content">
                  <h3>DONDEAD COINS</h3>
                  <h5 style={{ paddingBottom: "20px" }}>
                    Available coins: {profile.coins ? profile.coins : 0}
                  </h5>
                  {/* <p className="saved-message">
                    You Can't Saved Your Payment Method yet.
                  </p> */}
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="payment">
                <div className="my-account-area__content">
                  <h3>Payment Method</h3>
                  <h5 style={{ paddingBottom: "20px" }}>
                    Balance: {profile.balance ? profile.balance : 0}
                  </h5>
                  <p className="saved-message">
                    <h5 style={{ paddingBottom: "20px" }}>Paypal Address</h5>
                    {profile.paypal || profile.bankDetails === "" ? (
                      profile.paypal
                    ) : (
                      <form
                        style={{ paddingTop: "30px" }}
                        onSubmit={submitPaypal}
                      >
                        <input
                          style={{ padding: "10px" }}
                          type="email"
                          value={payEmail}
                          onChange={(e) => setPayEmail(e.target.value)}
                        />
                        <button
                          style={{
                            backgroundColor: "black",
                            marginLeft: "10px",
                            padding: "10px",
                            border: "none",
                            color: "white",
                          }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </p>

                  <p className="saved-message">
                    <h5 style={{ paddingBottom: "20px" }}>Bank Details</h5>
                    {profile.bankDetails || profile.bankDetails === "" ? (
                      profile.bankDetails
                    ) : (
                      <form
                        style={{ paddingTop: "30px" }}
                        onSubmit={submitBank}
                      >
                        <input
                          style={{ padding: "10px" }}
                          type="text"
                          value={bankAd}
                          onChange={(e) => setBankAd(e.target.value)}
                        />
                        <button
                          style={{
                            backgroundColor: "black",
                            marginLeft: "10px",
                            padding: "10px",
                            border: "none",
                            color: "white",
                          }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  </p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="address">
                <div className="my-account-area__content">
                  <h3>Billing Address</h3>
                  <address>
                    <p>
                      <strong>John Doe</strong>
                    </p>
                    <p>
                      1355 Market St, Suite 900 <br />
                      San Francisco, CA 94103
                    </p>
                    <p>Mobile: (123) 456-7890</p>
                  </address>
                  <a href="#" className="check-btn sqr-btn ">
                    <FaRegEdit /> Edit Address
                  </a>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="accountDetails">
                <div className="my-account-area__content">
                  <h3>Account Details</h3>
                  <div className="account-details-form">
                    <form>
                      <Row>
                        <Col lg={6}>
                          <div className="single-input-item">
                            <label htmlFor="first-name" className="required">
                              First Name
                            </label>
                            <input type="text" id="first-name" />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="single-input-item">
                            <label htmlFor="last-name" className="required">
                              Last Name
                            </label>
                            <input type="text" id="last-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="single-input-item">
                        <label htmlFor="display-name" className="required">
                          Display Name
                        </label>
                        <input type="text" id="display-name" />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="email" className="required">
                          Email Address
                        </label>
                        <input type="email" id="email" />
                      </div>
                      <fieldset>
                        <legend>Password change</legend>
                        <div className="single-input-item">
                          <label htmlFor="current-pwd" className="required">
                            Current Password
                          </label>
                          <input type="password" id="current-pwd" />
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="new-pwd" className="required">
                                New Password
                              </label>
                              <input type="password" id="new-pwd" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input-item">
                              <label htmlFor="confirm-pwd" className="required">
                                Confirm Password
                              </label>
                              <input type="password" id="confirm-pwd" />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div className="single-input-item">
                        <button>Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="logout">
                <div className="my-account-area__content">
                  <h3>Logout</h3>
                  <div className="welcome">
                    <span
                      onClick={logout}
                      className="logout"
                      style={{ cursor: "pointer", color: "black" }}
                    >
                      Logout
                    </span>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default MyAccount;
