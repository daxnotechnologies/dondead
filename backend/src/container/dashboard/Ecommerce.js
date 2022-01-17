import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { CardBarChart2, EChartCard } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { ChartjsBarChartTransparent } from '../../components/charts/chartjs';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { useDispatch, useSelector } from 'react-redux';
import { orderFilter } from '../../redux/orders/actionCreator';
import moment from 'moment';
import { sellerFilter } from '../../redux/sellers/actionCreator';

const TotalRevenue = lazy(() => import('./overview/ecommerce/TotalRevenue'));
const RevenueGenerated = lazy(() => import('./overview/ecommerce/RevenueGenerated'));
const TopSellingProduct = lazy(() => import('./overview/ecommerce/TopSellingProduct'));
const SalesByLocation = lazy(() => import('./overview/ecommerce/SalesByLocation'));
const RevenueByDevice = lazy(() => import('./overview/ecommerce/RevenueByDevice'));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const chartOptions = {
  legend: {
    display: false,
    labels: {
      display: false,
    },
  },
  scales: {
    yAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};

const Ecommerce = () => {
  const offers = useSelector(state => state.orders);
  const sellers = useSelector(state => state.sellers);
  const [offerHist, setOfferHist] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [revHist, setRevHist] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [revenue, setRevenue] = useState(0);
  const [avgHist, setAvgHist] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [avgOffer, setAverageOffer] = useState(0);
  const [seller, setSeller] = useState(0);
  const [sellerHist, setSellerHist] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const dispatch = useDispatch();

  useEffect(() => {
    let r1 = 0;
    revHist.map(r => {
      r1 = r1 + r;
    });
    setRevenue(r1);

    setAverageOffer((r1 / offers?.data?.length).toFixed(2));
  }, [revHist]);

  useEffect(() => {
    if (sellers.data) {
      let s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      sellers.data.map(sel => {
        let m = moment(sel.timestamp)
          .startOf('month')
          .format('MMM');
        let i = MONTHS.indexOf(m);
        s[i] = s[i] + 1;
      });

      setSellerHist(s);
      setSeller(sellers.data.length);
    }
  }, [sellers]);

  useEffect(() => {
    if (offers.data) {
      let o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let rev = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      offers.data.map(offer => {
        var d = moment(new Date(new Date().getFullYear(), 0, 1));
        if (moment(offer.timestamp).isAfter(d)) {
          let m = moment(offer.timestamp)
            .startOf('month')
            .format('MMM');
          let i = MONTHS.indexOf(m);
          o[i] = o[i] + 1;
          rev[i] = rev[i] + offer.amount;
        }
      });

      setOfferHist(o);
      setRevHist(rev);

      const hist = revHist.map((reven, index) => {
        return (reven / offerHist[index]).toFixed(2);
      });

      setAvgHist(hist);
    }
  }, [offers]);

  useEffect(() => {
    dispatch(orderFilter());
    dispatch(sellerFilter());
  }, []);

  return (
    <>
      <PageHeader
        ghost
        title="Dondead Dashboard"
        // buttons={[
        //   <div key="1" className="page-header-actions">
        //     <CalendarButtonPageHeader />
        //     <ExportButtonPageHeader />
        //     <ShareButtonPageHeader />
        //     <Button size="small" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{offers.loading ? <Spin /> : offers.data?.length}</Heading>
                    <span>Offers</span>
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={MONTHS}
                    datasets={[
                      {
                        data: offerHist,
                        backgroundColor: '#EFEFFE',
                        hoverBackgroundColor: '#5F63F2',
                        label: 'Offers',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{offers.loading ? <Spin /> : `$ ${revenue}`}</Heading>
                    <span>Revenue</span>
                    {/* <p>
                      <span className="growth-downward">
                        <FeatherIcon icon="arrow-down" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={MONTHS}
                    datasets={[
                      {
                        data: revHist,
                        backgroundColor: '#FFF0F6',
                        hoverBackgroundColor: '#FF69A5',
                        label: 'Revenue',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>

          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{offers.loading ? <Spin /> : `$ ${avgOffer}`}</Heading>
                    <span>Avg. offer value</span>
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={MONTHS}
                    datasets={[
                      {
                        data: avgHist,
                        backgroundColor: '#E8FAF4',
                        hoverBackgroundColor: '#20C997',
                        label: 'Avg Orders',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={6} md={12} sm={12} xs={24}>
            <Cards headless>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <Heading as="h1">{sellers.loading ? <Spin /> : seller}</Heading>
                    <span>Sellers</span>
                    {/* <p>
                      <span className="growth-upward">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last week</span>
                    </p> */}
                  </CardBarChart2>
                </div>
                <div className="card-chunk">
                  <ChartjsBarChartTransparent
                    labels={MONTHS}
                    datasets={[
                      {
                        data: sellerHist,
                        backgroundColor: '#E9F5FF',
                        hoverBackgroundColor: '#2C99FF',
                        label: 'Visitors',
                        barPercentage: 1,
                      },
                    ]}
                    options={chartOptions}
                  />
                </div>
              </EChartCard>
            </Cards>
          </Col>
        </Row>

        <Row gutter={25}>
          <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <TotalRevenue revenue={revenue} revHist={revHist} />
            </Suspense>
          </Col>
          {/* <Col xxl={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <RevenueGenerated />
            </Suspense>
          </Col> */}
          {/* <Col xxl={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <TopSellingProduct />
            </Suspense>
          </Col> */}
          {/* <Col xxl={8} md={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SalesByLocation />
            </Suspense>
          </Col> */}
          {/* <Col xxl={8} md={12} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <RevenueByDevice />
            </Suspense>
          </Col> */}
        </Row>
      </Main>
    </>
  );
};

export default Ecommerce;
