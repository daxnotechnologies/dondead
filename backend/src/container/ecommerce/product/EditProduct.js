import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message, Space, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { singleProduct } from '../../../redux/product/actionCreator';
import FileBase from 'react-file-base64';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { updateProduct } from '../../../api';

const { Option } = Select;
const { Dragger } = Upload;

const EditProduct = ({ match }) => {
  const { product, isLoader } = useSelector(state => {
    return { product: state.product.data, isLoader: state.product.loading };
  });
  console.log(product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleProduct(match.params.slug));
  }, [dispatch]);

  const [form] = Form.useForm();
  const [img, setImg] = useState();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const handleSubmit = values => {
    if (img) {
      dispatch(updateProduct({ ...product, ...values, image: img }));
    } else {
      dispatch(updateProduct({ ...product, ...values }));
    }
    // dispatch(updateProduct({ ...values, image: img }, history));
  };

  return (
    <>
      <PageHeader
        ghost
        title="Edit Product"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" /> */}
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                {isLoader ? (
                  <Col xs={24}>
                    <div className="spin">
                      <Spin />
                    </div>
                  </Col>
                ) : (
                  <Col xxl={12} md={14} sm={18} xs={24}>
                    <AddProductForm>
                      <Form style={{ width: '100%' }} form={form} name="editProduct" onFinish={handleSubmit}>
                        <BasicFormWrapper>
                          <div className="add-product-block">
                            <Row gutter={15}>
                              <Col xs={24}>
                                <div className="add-product-content">
                                  <Cards title="About Product">
                                    <Form.Item
                                      name="title"
                                      label="Product Title"
                                      initialValue={product?.title}
                                      rules={[{ message: 'Please input your Product Title!', required: true }]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Form.Item
                                      name="slug"
                                      label="Slug"
                                      initialValue={product?.slug}
                                      rules={[{ message: 'Please input your product slug!', required: true }]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Form.Item
                                      name="sku"
                                      label="SKU"
                                      initialValue={product?.sku}
                                      rules={[{ message: 'Please input your product sku!', required: true }]}
                                    >
                                      <Input />
                                    </Form.Item>

                                    <Form.Item
                                      name="category"
                                      initialValue=""
                                      label="Category"
                                      initialValue={product?.category}
                                      rules={[{ message: 'Please select your category', required: true }]}
                                    >
                                      <Select style={{ width: '100%' }}>
                                        {/* <Option value="">Please Select</Option> */}
                                        <Option value="DUNK">DUNK</Option>
                                        <Option value="YEEZY">YEEZY</Option>
                                        <Option value="JORDAN">JORDAN</Option>
                                      </Select>
                                    </Form.Item>

                                    <Form.List name="size" initialValue={product?.size}>
                                      {(fields, { add, remove }) => (
                                        <>
                                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Space
                                              key={key}
                                              style={{ display: 'flex', marginBottom: 8 }}
                                              align="baseline"
                                            >
                                              <Form.Item
                                                {...restField}
                                                name={[name, 'size']}
                                                fieldKey={[fieldKey, 'size']}
                                                rules={[{ required: true, message: 'Missing size' }]}
                                              >
                                                <InputNumber placeholder="Size" />
                                              </Form.Item>
                                              <Form.Item
                                                {...restField}
                                                name={[name, 'price']}
                                                fieldKey={[fieldKey, 'price']}
                                                rules={[{ required: true, message: 'Missing price' }]}
                                              >
                                                <InputNumber placeholder="Price" />
                                              </Form.Item>
                                              <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                          ))}
                                          <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                              Add field
                                            </Button>
                                          </Form.Item>
                                        </>
                                      )}
                                    </Form.List>
                                  </Cards>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          <div className="add-product-block">
                            <Row gutter={15}>
                              <Col xs={24}>
                                <div className="add-product-content">
                                  <Cards title="Product Image">
                                    <figure>
                                      <img style={{ width: '100%' }} src={img ? img : product?.image} alt="" />
                                    </figure>
                                    <Form.Item label="Image" name="image">
                                      <FileBase type="file" multiple={false} onDone={({ base64 }) => setImg(base64)}>
                                        <UploadOutlined />
                                        Click to upload
                                      </FileBase>
                                    </Form.Item>
                                  </Cards>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div className="add-form-action">
                            <Form.Item>
                              <Button
                                className="btn-cancel"
                                size="large"
                                onClick={() => {
                                  return form.resetFields();
                                }}
                              >
                                Cancel
                              </Button>
                              <Button size="large" htmlType="submit" type="primary" raised>
                                Save Product
                              </Button>
                            </Form.Item>
                          </div>
                        </BasicFormWrapper>
                      </Form>
                    </AddProductForm>
                  </Col>
                )}
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};
EditProduct.propTypes = {
  match: PropTypes.object,
};

export default EditProduct;
