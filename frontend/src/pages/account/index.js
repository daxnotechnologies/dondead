import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaCloudDownloadAlt, FaFileUpload, FaRegEdit } from "react-icons/fa";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/profile/actionCreator";
import { logOut } from "../../redux/authentication/actionCreator";
import {
  cancelOffer,
  getOffers,
  newTicket,
  paypalUpdate,
  updateBilling,
} from "../../api";
import FileBase from "react-file-base64";

const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const MyAccount = () => {
  // const [check, setCheck] = useState(false);
  const [bankAd, setBankAd] = useState("");
  const [payEmail, setPayEmail] = useState("");
  const router = useRouter();
  const profile = useSelector((state) => state.profile.profile);

  const dispatch = useDispatch();

  if (!Cookies.get("token")) {
    router.push("account/login");
  } else {
    dispatch(getProfile());
    // setCheck(true);
  }

  const [offers, setOffers] = useState([]);
  const [address, setAddress] = useState(
    profile?.billing
      ? profile.billing
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          street: "",
          country: "",
          city: "",
          state: "",
          zip: "",
        }
  );
  const [AU, setAU] = useState(false);

  const [IDimage, setIDimage] = useState();

  const perks = (coins) => {
    if (coins > 500000) {
      return (
        <p className="saved-message">
          Level 5 <br /> LVL 4 + 2% more payout on all sales
        </p>
      );
    } else if (coins > 250000) {
      return (
        <p className="saved-message">
          Level 4 <br /> LVL 3 + payment after dispatch of the goods (after
          dispatch, send the tracking number + sales number by email to
          <a href="mailto:help@dondead.com">help@dondead.com</a>)
        </p>
      );
    } else if (coins > 100000) {
      return (
        <p className="saved-message">
          Level 3 <br /> LVL 2 + 1% more payout on all sales
        </p>
      );
    } else if (coins > 25000) {
      return (
        <p className="saved-message">
          Level 2 <br /> Free shipping on all sales within Germany
        </p>
      );
    } else if (coins > 15000) {
      return (
        <p className="saved-message">
          Level 1 <br /> No Perks
        </p>
      );
    } else {
      return (
        <p className="saved-message">
          <span style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Level 0{" "}
          </span>{" "}
          <br /> No Perks
        </p>
      );
    }
  };

  useEffect(() => {
    getOffers(profile?._id)
      .then(({ data }) => setOffers(data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
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

  const handleID = (e) => {
    e.preventDefault();

    if (IDimage) {
      newTicket({ userID: profile._id, image: IDimage, status: "IN-PROGRESS" })
        .then(({ data }) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  const getLevel = (coins) => {
    if (coins > 500000) {
      return 5;
    } else if (coins > 250000) {
      return 4;
    } else if (coins > 100000) {
      return 3;
    } else if (coins > 25000) {
      return 2;
    } else if (coins > 15000) {
      return 1;
    } else {
      return 0;
    }
  };

  const submitBilling = () => {
    updateBilling(address)
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  };

  return profile ? (
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
                      (If Not <strong>{profile?.firstName} !</strong>{" "}
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
                  <p className="saved-message">
                    <h3>Verify</h3>
                    <h3>
                      Status: {profile.verified ? "VERIFIED" : "UN-VERIFIED"}
                    </h3>
                    <p>Upload Image of your ID card to get yourself verified</p>

                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) => setIDimage(base64)}
                    />

                    <Button onClick={handleID}>Click to Upload</Button>
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
                            <td>{offer.cancel ? "CANCELLED" : offer.status}</td>
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
              {/* <Tab.Pane eventKey="download">
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
              </Tab.Pane> */}

              <Tab.Pane eventKey="coins">
                <div className="my-account-area__content">
                  <h3>DONDEAD COINS</h3>
                  <h5 style={{ paddingBottom: "20px" }}>
                    Level: {getLevel(profile.coins)}
                  </h5>
                  <h5 style={{ paddingBottom: "20px" }}>
                    Available coins: {profile.coins ? profile.coins : 0}
                  </h5>
                  {perks(profile.coins)}
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
                  {profile.billing && !AU ? (
                    <>
                      <address>
                        <p>
                          <strong>{`${profile.billing.firstName} ${profile.billing.lastName}`}</strong>
                        </p>
                        <p>
                          {profile.billing.street} <br />
                          {`${profile.billing.city} ${profile.billing.state}, ${profile.billing.zip}`}
                        </p>
                        <p>{profile.billing.country}</p>
                        <p>Mobile: {profile.billing.phone}</p>
                        <p>Email: {profile.billing.email}</p>
                      </address>
                      <button
                        onClick={() => setAU(true)}
                        style={{ backgroundColor: "white", border: "none" }}
                        className="check-btn sqr-btn "
                      >
                        <FaRegEdit /> Edit Address
                      </button>
                    </>
                  ) : (
                    <div
                      className="account-details-form"
                      style={{ paddingTop: "30px" }}
                    >
                      <form onSubmit={submitBilling}>
                        <Row>
                          <Col lg={6}>
                            <div className="single-input-item">
                              <label htmlFor="first-name" className="required">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="first-name"
                                value={address.firstName}
                                onChange={(e) =>
                                  setAddress({
                                    ...address,
                                    firstName: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="single-input-item">
                              <label htmlFor="last-name" className="required">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="last-name"
                                value={address.lastName}
                                onChange={(e) =>
                                  setAddress({
                                    ...address,
                                    lastName: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className="single-input-item">
                          <label htmlFor="email" className="required">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={address.email}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="single-input-item">
                          <label htmlFor="phone" className="required">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            id="phone"
                            value={address.phone}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="single-input-item">
                          <label htmlFor="company">Company Name</label>
                          <input
                            type="text"
                            id="company"
                            value={address.company}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                company: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="single-input-item">
                          <label htmlFor="address">Street Address</label>
                          <input
                            type="text"
                            id="address"
                            value={address.street}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                street: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="single-input-item">
                          <label>Country</label>
                          <select
                            value={address.country}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                country: e.target.value,
                              })
                            }
                          >
                            {country_list.map((country) => (
                              <option>{country}</option>
                            ))}
                          </select>
                        </div>

                        <Row>
                          <Col lg={6}>
                            <div className="single-input-item">
                              <label>Town/City</label>
                              <input
                                type="text"
                                placeholder="Town/City"
                                value={address.city}
                                onChange={(e) =>
                                  setAddress({
                                    ...address,
                                    city: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="single-input-item">
                              <label>State</label>
                              <input
                                type="text"
                                placeholder="State"
                                value={address.state}
                                onChange={(e) =>
                                  setAddress({
                                    ...address,
                                    state: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </Col>
                        </Row>

                        <div className="single-input-item">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            placeholder="Zip Code"
                            value={address.zip}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                zip: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Row>
                          <Col lg={3}>
                            <div className="single-input-item">
                              <button type="submit">Save Changes</button>
                            </div>
                          </Col>
                          {profile.billing ? (
                            <Col lg={3}>
                              <div className="single-input-item">
                                <button onClick={() => setAU(false)}>
                                  Cancel
                                </button>
                              </div>
                            </Col>
                          ) : (
                            ""
                          )}
                        </Row>
                      </form>
                    </div>
                  )}
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
  ) : (
    <Spinner />
  );
};

export default MyAccount;
