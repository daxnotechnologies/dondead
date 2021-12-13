import { useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../lib/product";
import { IoMdCash } from "react-icons/io";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { newOffer } from "../../api";
import { useRouter } from "next/router";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import { useState } from "react";

const Checkout = ({ cartItems }) => {
  let cartTotalPrice = 0;
  let shippingFee = 0;
  let grandTotal = 0;
  const profile = useSelector((state) => state.profile.profile);
  const [vat, setVat] = useState(false);
  const [vatCharge, setVatCharge] = useState(0);

  const [extra, setExtra] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);

  const [coinsExtraCharge, setCoinsExtraCharge] = useState(0);

  const [earlyPayout, setEarlyPayout] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  useEffect(() => {
    if (profile.coins > 100000) {
      setCoinsExtraCharge(cartTotalPrice * 0.001);
    } else if (profile.coins > 500000) {
      setCoinsExtraCharge(cartTotalPrice * 0.002);
    } else {
      setCoinsExtraCharge(0);
    }

    if (profile.coins > 250000) {
      setEarlyPayout(true);
    } else {
      setEarlyPayout(false);
    }
  }, [profile.coins]);

  useEffect(() => {
    if (extra) {
      setExtraCharge(cartTotalPrice * 0.075);
    } else {
      setExtraCharge(0);
    }
  }, [extra]);

  useEffect(() => {
    if (vat) {
      setVatCharge(cartTotalPrice * 0.19);
    } else {
      setVatCharge(0);
    }
  }, [vat]);

  const setShippingFee = (size) => {
    // console.log(cart);
    if (size == 1 && profile.coins < 25000) {
      shippingFee = 5.0;
    } else {
      shippingFee = 0.0;
    }

    return shippingFee;
  };

  const adjustPrice = (total, fee) => {
    grandTotal = total + vatCharge + extraCharge + coinsExtraCharge - fee;

    return grandTotal;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const products = cartItems.map((product) => product);
    const offererID = profile._id;
    const status = "NOT DELIVERED";
    const amount = grandTotal;
    // console.log(amount);
    newOffer({
      products,
      offererID,
      status,
      amount,
      extraPayout: extra,
      earlyPayout,
    })
      .then(({ data }) => {
        console.log(data);
        dispatch(deleteAllFromCart());
        router.push("/other/order-tracking");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Checkout"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Checkout</li>
        </ul>
      </BreadcrumbOne>
      <div className="checkout-area space-mt--r130 space-mb--r130">
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <Row>
              <Col>
                <div className="lezada-form">
                  <form className="checkout-form" onSubmit={handleCheckout}>
                    <div className="row row-40">
                      <div className="col-lg-7 space-mb--20">
                        {/* Billing Address */}
                        <div id="billing-form" className="space-mb--40">
                          <h4 className="checkout-title">Billing Address</h4>
                          {profile?.billing ? (
                            <div className="row">
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>
                                  Using the billing address saved by you.
                                </label>
                              </div>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>First Name*</label>
                                <input type="text" placeholder="First Name" />
                              </div>
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>Last Name*</label>
                                <input type="text" placeholder="Last Name" />
                              </div>
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>Email Address*</label>
                                <input
                                  type="email"
                                  placeholder="Email Address"
                                />
                              </div>
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>Phone no*</label>
                                <input type="text" placeholder="Phone number" />
                              </div>
                              <div className="col-12 space-mb--20">
                                <label>Company Name</label>
                                <input type="text" placeholder="Company Name" />
                              </div>
                              <div className="col-12 space-mb--20">
                                <label>Address*</label>
                                <input
                                  type="text"
                                  placeholder="Address line 1"
                                />
                                <input
                                  type="text"
                                  placeholder="Address line 2"
                                />
                              </div>
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>Country*</label>
                                <select>
                                  <option>Bangladesh</option>
                                  <option>China</option>
                                  <option>Australia</option>
                                  <option>India</option>
                                  <option>Japan</option>
                                </select>
                              </div>
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>Town/City*</label>
                                <input type="text" placeholder="Town/City" />
                              </div>
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>State*</label>
                                <input type="text" placeholder="State" />
                              </div>
                              <div className="col-md-6 col-12 space-mb--20">
                                <label>Zip Code*</label>
                                <input type="text" placeholder="Zip Code" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="row">
                          {/* Cart Total */}
                          <div className="col-12 space-mb--50">
                            <h4 className="checkout-title">Cart Total</h4>
                            <div className="checkout-cart-total">
                              <h4>
                                Product <span>Total</span>
                              </h4>
                              <ul>
                                {cartItems.map((product, i) => {
                                  const discountedPrice = getDiscountPrice(
                                    product.productPrice
                                  ).toFixed(2);

                                  cartTotalPrice +=
                                    discountedPrice * product.quantity;

                                  return (
                                    <li key={i}>
                                      {product.name} X {product.quantity}{" "}
                                      <span>${discountedPrice}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                              <p>
                                Sub Total{" "}
                                <span>${cartTotalPrice.toFixed(2)}</span>
                              </p>
                              <p>
                                Shipping Fee{" "}
                                <span>{setShippingFee(cartItems.length)}</span>
                              </p>

                              {profile.vatID ? (
                                <p>
                                  VAT Charge <span>{vatCharge}</span>
                                </p>
                              ) : (
                                ""
                              )}
                              <p>
                                Extra Payout <span>{extraCharge}</span>
                              </p>

                              <p>
                                Coins Extra Payout{" "}
                                <span>{coinsExtraCharge}</span>
                              </p>
                              <p>
                                Early Payout{" "}
                                <span>
                                  {earlyPayout ? "Available" : "Not Available"}
                                </span>
                              </p>
                              <h4>
                                Grand Total{" "}
                                <span>
                                  $
                                  {adjustPrice(
                                    cartTotalPrice,
                                    shippingFee
                                  ).toFixed(2)}
                                </span>
                              </h4>
                            </div>
                          </div>
                          {/* Payment Method */}
                          <div className="col-12">
                            {/* <h4 className="checkout-title">Payment Method</h4> */}
                            <div className="checkout-payment-method">
                              <div className="single-method">
                                <input
                                  type="checkbox"
                                  id="extra_check"
                                  onChange={(e) => setExtra(e.target.checked)}
                                />
                                <label htmlFor="extra_check">
                                  7.5% mehr auszahlung
                                </label>
                              </div>

                              {profile.vatID ? (
                                <div className="single-method">
                                  <input
                                    type="checkbox"
                                    id="vat_check"
                                    onChange={(e) => setVat(e.target.checked)}
                                  />
                                  <label htmlFor="vat_check">
                                    Check if you are VAT customer
                                  </label>
                                </div>
                              ) : (
                                ""
                              )}

                              {/* <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_check"
                                  name="payment-method"
                                  defaultValue="check"
                                />
                                <label htmlFor="payment_check">
                                  Check Payment
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_bank"
                                  name="payment-method"
                                  defaultValue="bank"
                                />
                                <label htmlFor="payment_bank">
                                  Direct Bank Transfer
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_cash"
                                  name="payment-method"
                                  defaultValue="cash"
                                />
                                <label htmlFor="payment_cash">
                                  Cash on Delivery
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_paypal"
                                  name="payment-method"
                                  defaultValue="paypal"
                                />
                                <label htmlFor="payment_paypal">Paypal</label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_payoneer"
                                  name="payment-method"
                                  defaultValue="payoneer"
                                />
                                <label htmlFor="payment_payoneer">
                                  Payoneer
                                </label>
                              </div> */}
                              <div className="single-method">
                                <input
                                  type="checkbox"
                                  id="accept_terms"
                                  required
                                />
                                <label htmlFor="accept_terms">
                                  I’ve read and accept the terms &amp;
                                  conditions
                                </label>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="lezada-button lezada-button--medium space-mt--20"
                            >
                              Place offer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCash />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">
                      No items found in cart to checkout
                    </p>
                    <Link
                      href="/shop/left-sidebar"
                      as={process.env.PUBLIC_URL + "/shop"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(mapStateToProps)(Checkout);
