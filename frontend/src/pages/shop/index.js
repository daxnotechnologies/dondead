import { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
// import { getSortedProducts } from "../../lib/product";
import { ShopHeader, ShopFilter, ShopProducts } from "../../components/Shop";
import fetchProducts from "../../redux/actions/productActions";
import { useRouter } from "next/router";

const Shop = () => {
  const products = useSelector((state) => state.productData);
  const [layout, setLayout] = useState("grid four-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const router = useRouter();
  const { category } = router.query;

  const pageLimit = 20;

  const dispatch = useDispatch();

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    const getCategory = (cat) => {
      let p = [];

      products.forEach((pr) => {
        // console.log(cat);
        // console.log(pr.category);
        if (pr.category == cat) {
          p.push(pr);
        }
      });

      return p;
    };
    // let sortedProducts = getSortedProducts(products, sortType, sortValue);
    // const filterSortedProducts = getSortedProducts(
    //   sortedProducts,
    //   filterSortType,
    //   filterSortValue
    // );
    let sortedProducts = products;
    if (category) {
      let cat = category;
      if (cat[0] === "$") {
        cat = cat.slice(1);
      }
      sortedProducts = getCategory(cat.toUpperCase());
    }

    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts?.slice(offset, offset + pageLimit));
  }, [
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    category,
    router.query,
  ]);

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Shop"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Shop</li>
        </ul>
      </BreadcrumbOne>
      <div className="shop-page-content">
        {/* shop page header */}
        <ShopHeader
          getLayout={getLayout}
          getFilterSortParams={getFilterSortParams}
          productCount={products?.length}
          sortedProductCount={currentData?.length}
          shopTopFilterStatus={shopTopFilterStatus}
          setShopTopFilterStatus={setShopTopFilterStatus}
        />

        {/* shop header filter */}
        <SlideDown closed={shopTopFilterStatus ? false : true}>
          <ShopFilter products={products} router={router} />
        </SlideDown>

        {/* shop page body */}
        <div className="shop-page-content__body space-mt--r130 space-mb--r130">
          <Container>
            <Row>
              <Col>
                {/* shop products */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style">
                  <Paginator
                    totalRecords={sortedProducts?.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutTwo>
  );
};

export default Shop;
