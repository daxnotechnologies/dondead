import { Card, Col, Row, Timeline } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getOneOffer, getUserProfile, updateArrive, updateOffer, updatePayment, updateVerified } from '../../api';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { CardToolbox, Main } from '../styled';
import { ProductDetailsWrapper } from './Style';
import { Button } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';

function OfferPage() {
  const [offer, setOffer] = useState();
  const [user, setUser] = useState();
  const { params } = useRouteMatch();

  console.log(offer);

  const handleUpdate = async () => {
    await updateOffer({ _id: offer._id, offer });

    const { data } = await getOneOffer(params.id);

    setOffer(data);
  };

  const handleRemove = index => {
    let o = offer;
    o.products.splice(index, 1);
    setOffer({ ...o });
  };

  const handleComplete = async () => {
    await updateArrive({ _id: offer._id, offer: { ...offer, status: 'DELIVERED' } });

    const { data } = await getOneOffer(params.id);

    setOffer(data);
  };

  const handleVerified = async () => {
    await updateVerified({ _id: offer._id, offer: { ...offer, status: 'VERIFIED' } });

    const { data } = await getOneOffer(params.id);

    setOffer(data);
  };

  const handlePayment = async () => {
    await updatePayment({ _id: offer._id, offer: { ...offer, paymentStatus: 'CLEARED' } });

    const { data } = await getOneOffer(params.id);

    setOffer(data);
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getOneOffer(params.id);

      setOffer(data);
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getUserProfile(offer.offererID);
      setUser(data);
    };

    if (offer) {
      fetch();
    }
  }, [offer]);

  return (
    <>
      <PageHeader ghost title={`Order ID: ${params.id}`} subTitle={offer?.status} />
      <Main>
        <Row gutter={15}>
          <Col xs={18}>
            <Cards title="Products">
              <div style={{ borderBottom: '1px solid #E3E6EF', paddingBottom: '30px', marginBottom: '28px' }}>
                <div style={{ borderBottom: '1px solid #E3E6EF' }}>
                  <Row style={{ paddingTop: '30px' }} gutter={30}>
                    <Col xs={8}>
                      <h4 style={{ fontWeight: 'bolder', textAlign: 'center' }}>Image</h4>
                    </Col>
                    <Col xs={7}>
                      <h4 style={{ fontWeight: 'bolder', textAlign: 'center' }}>Title</h4>
                    </Col>
                    <Col xs={5}>
                      <h4 style={{ fontWeight: 'bolder', textAlign: 'center' }}>SKU</h4>
                    </Col>
                    <Col xs={3}>
                      <h4 style={{ fontWeight: 'bolder', textAlign: 'center' }}>Remove</h4>
                    </Col>
                  </Row>
                </div>

                {offer
                  ? offer.products.map((product, index) => (
                      <Row key={product._id} style={{ paddingTop: '25px' }} gutter={30}>
                        <Col xs={8}>
                          <img width={'170px'} src={product.image} />
                        </Col>
                        <Col xs={7} style={{ textAlign: 'center' }}>
                          {product.title}
                        </Col>
                        <Col xs={5} style={{ textAlign: 'center' }}>
                          {product.sku}
                        </Col>
                        <Col xs={3} style={{ textAlign: 'center' }}>
                          <Button onClick={() => handleRemove(index)}>
                            <FeatherIcon icon="trash" />
                          </Button>
                        </Col>
                      </Row>
                    ))
                  : ''}
              </div>
              <Row>
                <Col xs={18}>
                  <Button type="primary" onClick={handleUpdate}>
                    Update Offer
                  </Button>
                </Col>
                <Col>
                  {offer?.status == 'NOT DELIVERED' && offer?.status != 'VERIFIED' ? (
                    <Button onClick={handleComplete} type="primary">
                      Mark as Completed
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={handleVerified}
                      disabled={offer?.status == 'VERIFIED' ? true : false}
                    >
                      Mark as Verified
                    </Button>
                  )}
                </Col>
              </Row>
            </Cards>
            <Cards title="Payment Status">
              <div style={{ borderBottom: '1px solid #E3E6EF', paddingBottom: '30px', marginBottom: '28px' }}>
                <Row gutter={30}>
                  <Col xs={15} style={{ fontWeight: 'bolder' }}>
                    Items:
                  </Col>
                  <Col>{offer?.products.length}</Col>
                </Row>

                <Row gutter={30}>
                  <Col xs={15} style={{ fontWeight: 'bolder' }}>
                    Extra Payout Claimed:
                  </Col>
                  <Col>{offer?.extraPayout ? 'Yes' : 'No'}</Col>
                </Row>

                <Row gutter={30}>
                  <Col xs={15} style={{ fontWeight: 'bolder' }}>
                    Total:
                  </Col>
                  <Col>{offer?.amount}</Col>
                </Row>
              </div>

              <Row gutter={25}>
                <Col xs={15}></Col>
                <Col>
                  <Button type="secondary">Send Invoice</Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={handlePayment}
                    disabled={offer?.paymentStatus == 'CLEARED' ? true : false}
                  >
                    Send Payment
                  </Button>
                </Col>
              </Row>
            </Cards>
          </Col>

          <Col xs={6}>
            <Cards title="Customer Verification">
              {user?.verified ? 'Customer already completed ID Verification' : 'Customer not verified'}
            </Cards>

            <Cards title="Customer">
              <div style={{ borderBottom: '1px solid #E3E6EF', paddingBottom: '30px', marginBottom: '28px' }}>
                <Row>
                  {user?.firstName} {user?.lastName}
                </Row>
                <Row gutter={30}>
                  <Col xs={6} style={{ fontWeight: 'bolder' }}>
                    VatID:
                  </Col>
                  <Col>{user?.vatID}</Col>
                </Row>
              </div>
              <div style={{ borderBottom: '1px solid #E3E6EF', paddingBottom: '30px', marginBottom: '28px' }}>
                <Row>
                  <h5 style={{ fontWeight: 'bold', paddingBottom: '10px' }}>CONTACT INFORMATION</h5>
                </Row>
                <Row>
                  <p>
                    <strong>Email: </strong> {user?.email}
                  </p>
                </Row>
                <Row>
                  <p>
                    <strong>Billing: </strong> {user?.billing ? user.billing : 'No address'}
                  </p>
                </Row>
              </div>
            </Cards>
          </Col>
        </Row>
        <Row>
          <Cards title="Timeline">
            <Timeline style={{ paddingLeft: '30px', paddingRight: '30px' }}>
              <Timeline.Item>
                <Row>
                  <Col xs={16}>Offer was placed by the customer</Col>
                  <Col xs={8}>{moment(offer?.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</Col>
                </Row>
              </Timeline.Item>

              {offer?.timeline.map(time => (
                <Timeline.Item>
                  <Row>
                    <Col xs={16}>{time.message}</Col>
                    <Col xs={8}>{moment(time.date).format('MMMM Do YYYY, h:mm:ss a')}</Col>
                  </Row>
                </Timeline.Item>
              ))}
            </Timeline>
          </Cards>
        </Row>
      </Main>
    </>
  );
}

export default OfferPage;
