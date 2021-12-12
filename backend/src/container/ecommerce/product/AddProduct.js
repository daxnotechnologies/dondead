import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message, Checkbox, Space } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import FileBase from 'react-file-base64';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../../../redux/product/actionCreator';
import { useHistory } from 'react-router';

const { Option } = Select;
const { Dragger } = Upload;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [img, setImg] = useState();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const history = useHistory();
  const dispatch = useDispatch();

  // const fileList = [
  //   {
  //     uid: '1',
  //     name: '1.png',
  //     status: 'done',
  //     url: require('../../../static/img/products/1.png'),
  //     thumbUrl: require('../../../static/img/products/1.png'),
  //   },
  // ];

  // const fileUploadProps = {
  //   name: 'file',
  //   multiple: false,
  //   // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       setState({ ...state, file: info.file, list: info.fileList });
  //     }
  //     if (status === 'done') {
  //       console.log(info);
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   listType: 'picture',
  //   defaultFileList: fileList,
  //   showUploadList: {
  //     showRemoveIcon: true,
  //     removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
  //   },
  // };

  const handleSubmit = values => {
    // setState({ ...state, submitValues: values });
    // console.log(values);
    dispatch(addNewProduct({ ...values, image: img }, history));
  };

  return (
    <>
      <PageHeader
        ghost
        title="Add Product"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
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
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About Product">
                                  <Form.Item
                                    name="title"
                                    label="Product Title"
                                    rules={[{ message: 'Please input your Product Title!', required: true }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name="slug"
                                    label="Slug"
                                    rules={[{ message: 'Please input your product slug!', required: true }]}
                                  >
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    name="sku"
                                    label="SKU"
                                    rules={[{ message: 'Please input your product sku!', required: true }]}
                                  >
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    name="category"
                                    initialValue=""
                                    label="Category"
                                    rules={[{ message: 'Please select your category', required: true }]}
                                  >
                                    <Select style={{ width: '100%' }}>
                                      {/* <Option value="">Please Select</Option> */}
                                      <Option value="DUNK">DUNK</Option>
                                      <Option value="YEEZY">YEEZY</Option>
                                      <Option value="JORDAN">JORDAN</Option>
                                    </Select>
                                  </Form.Item>

                                  {/* <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[{ message: 'Please select your price', required: true }]}
                                  >
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FontAwesomeIcon icon={faEuroSign} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item> */}

                                  <Form.List name="size" initialValue={[{}]}>
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

                                  {/* <Form.Item name="size" label="Size">
                                    <Checkbox.Group>
                                      {sizes.map(({ size, price }) => (
                                        <Row key={size}>
                                          <Col span={8}>
                                            <Checkbox value={size}>{size}</Checkbox>
                                          </Col>
                                          <Col span={16}>
                                            <div className="input-prepend-wrap">
                                              <span className="input-prepend">
                                                <FontAwesomeIcon icon={faEuroSign} />
                                              </span>
                                              <InputNumber value={price} style={{ width: '100%' }} />
                                            </div>
                                          </Col>
                                        </Row>
                                      ))}
                                    </Checkbox.Group>
                                  </Form.Item> */}

                                  {/* <Form.Item name="discount" label="Discount">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend f">
                                        <FeatherIcon icon="percent" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item> */}

                                  {/* <Form.Item name="status" label="Status">
                                    <Radio.Group>
                                      <Radio value="Published">Published</Radio>
                                      <Radio value="Draft">Draft</Radio>
                                    </Radio.Group>
                                  </Form.Item> */}

                                  {/* <Form.Item name="description" label="Product Description">
                                    <Input.TextArea rows={5} />
                                  </Form.Item>
                                  <Form.Item name="mTitle" label="Meta Title">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="mKeyword" label="Meta Keyword">
                                    <Input />
                                  </Form.Item> */}
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
                                    <img style={{ width: '100%' }} src={img ? img : ''} alt="" />
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
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddProduct;
