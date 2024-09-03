import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Table,
  Breadcrumb,
  Typography,
  Button,
  Col,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiEdit,
  FiFile,
  FiImage,
  FiMusic,
  FiUpload,
} from "react-icons/fi";
import useFetch from "../../../../Hooks/useFetch";
import { toast } from "react-toastify";
import useAdmin from "../../../../Context/AdminContext";
import { useUserContext } from "../../../../Context/UserContext";
const { Content } = Layout;

const Books = () => {
  // const { data: allBooks, loading: loadingAllBooks } = useFetch('/book/all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editBookData, setEditBookData] = useState(null);
  const [editBookId, setEditBookId] = useState(null);
  const [modalBookImage, setModalBookImage] = useState(null);
  const [music, setMusic] = useState(null);
  const { allBooks, stats, setAllBooks } = useAdmin();

  const { axiosInstance } = useUserContext();

  useEffect(() => {
    (async () => {
      try {
        if (!allBooks) {
          const { data } = await axiosInstance.get("/book/all");
          if (stats) {
            const bookPurchaseTelly = stats.bought_books.reduce(
              (prev, curr) => {
                prev[curr.name] = curr.bought_count;
                return prev;
              },
              {}
            );
            const finalData = [];
            for (let book of data) {
              finalData.push({
                ...book,
                purchases: bookPurchaseTelly[book.name] ?? 0,
              });
            }
            setAllBooks(finalData);
          } else {
            setAllBooks(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (editBookId) {
      setIsModalVisible(true);
      form.setFieldsValue({
        ...editBookData,
        cover_image: [
          {
            url: editBookData.cover_image,
          },
        ],
      });
    }
  }, [editBookId]);

  const columns = [
    {
      title: "Cover",
      key: "cover_image",
      render: (text, record) => (
        <img
          src={record.cover_image}
          alt={record.name}
          style={{ width: "50px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Chapters",
      dataIndex: "chapters",
      key: "chapters",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => <>{record.price}</>,
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
      render: (text, record) => <>{record.current_price}</>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      // render "Male" if value is m female if f
      render: (text, record) => (
        <>
          {record.gender === "m"
            ? "Male"
            : record.gender === "f"
            ? "Female"
            : record.gender}
        </>
      ),
    },
    {
      title: "Purchases",
      dataIndex: "purchases",
      key: "purchases",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) =>
        text.length > 80 ? `${text.substring(0, 80)}...` : text,
    },
    {
      title: "",
      key: "action_paging",
      render: (text, record) => (
        <Link to={`/admin/books/${record.id}`}>
          <Button icon={<FiEdit />} type="default">
            Pages
          </Button>
        </Link>
      ),
    },
    {
      title: "",
      key: "action_book",
      render: (text, record) => (
        <Button
          icon={<FiEdit />}
          type="default"
          onClick={() => {
            setEditBookData(record);
            setEditBookId(record.id);
          }}
        >
          Details
        </Button>
      ),
    },
  ];
  const handleBookEdit = async (bookData) => {
    try {
      delete bookData.cover_image;
      await axiosInstance.put(`/book`, {
        ...bookData,
        id: editBookId,
      });
      //   if (modalBookImage) {
      //     const formData = new FormData();
      //     formData.append("image", modalBookImage);
      //     await axiosInstance.post(`/asset/image/${editBookId}/cover`, formData);
      //   }
      const formData = new FormData();
      let params = {};
      if (modalBookImage) {
        formData.append(
          "image",
          modalBookImage?.originFileObj
            ? modalBookImage.originFileObj
            : modalBookImage
        );
        params["image"] = "true";
      }

      if (music) {
        formData.append(
          "music",
          music?.originFileObj ? music.originFileObj : music
        );
        params["music"] = "true";
      }

      if (modalBookImage || music) {
        await axiosInstance.post(`/asset/${editBookId}/cover`, formData, {
          params,
        });
      }

      toast.success("Book Updated Successfully");
      setIsModalVisible(false);
      window.location.reload();
    } catch (error) {
      toast.error("Error Updating Book");
      return;
    }
  };
  const handleNewBook = async (bookData) => {
    try {
      delete bookData.cover_image;
      let newBook = await axiosInstance.post(`/book`, {
        ...bookData,
        id: editBookId,
      });
      const formData = new FormData();
      let params = {};
      console.log({ modalBookImage, music });
      if (modalBookImage) {
        formData.append(
          "image",
          modalBookImage?.originFileObj
            ? modalBookImage?.originFileObj
            : modalBookImage
        );
        params["image"] = "true";
      }

      if (music) {
        formData.append(
          "music",
          music?.originFileObj ? music?.originFileObj : music
        );
        params["music"] = "true";
      }

      if (modalBookImage || music) {
        await axiosInstance.post(`/asset/${newBook.data.id}/cover`, formData, {
          params,
        });
      }

      toast.success("New book added Successfully");
      setIsModalVisible(false);
      window.location.reload();
    } catch (error) {
      toast.error("Error Updating Book");
      return;
    }
  };
  return (
    <Layout hasSider style={{ minHeight: "80vh" }}>
      <Sidebar />
      <Layout
        style={{
          padding: "5px 24px 24px",
          height: "92vh",
          overflowY: "scroll",
        }}
      >
        <Content
          style={{
            minHeight: 280,
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Books</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title level={4}>All Books</Typography.Title>
          <Row gutter={[16, 16]} justify={"end"}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  setIsModalVisible(true);
                  setEditBookData(null);
                  setEditBookId(null);
                  setModalBookImage(null);
                  setMusic(null);
                }}
              >
                Add New
              </Button>
            </Col>
            <Col span={24}>
              <Table
                showHeader
                style={{ marginBottom: "4rem" }}
                dataSource={allBooks || []}
                columns={columns}
                rowKey="id"
              />
            </Col>
          </Row>
        </Content>
      </Layout>
      <Modal
        title={editBookData ? "Edit Book Details" : "Add New Book"}
        width={800}
        footer={false}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setEditBookData(null);
          setEditBookId(null);
          setModalBookImage(null);
          setIsModalVisible(false);
          setMusic(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          // initialValues={}
          onFinish={editBookData ? handleBookEdit : handleNewBook}
        >
          {/* Cover image */}
          <Form.Item
            name="cover_image"
            label="Cover Image"
            rules={[
              { required: true, message: "Please upload a cover image!" },
            ]}
          >
            <Upload
              multiple={false}
              accept="image/*"
              fileList={
                editBookData?.cover_image
                  ? [
                      {
                        url: editBookData?.cover_image,
                      },
                    ]
                  : modalBookImage
                  ? [modalBookImage]
                  : []
              }
              // defaultFileList={
              // editBookData?.cover_image && [
              //   {
              //     url: editBookData?.cover_image,
              //   },
              // ]
              // }
              onChange={(e) => {
                setModalBookImage(e.file);
              }}
              listType="picture"
            >
              <Button>Change cover</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Book Name"
            rules={[{ required: true, message: "Please input the book name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="music"
            label="Music"
            rules={[{ required: false, message: "Please upload a music!" }]}
          >
            <Upload
              accept="audio/mp3"
              beforeUpload={() => false}
              multiple={false}
              onChange={(e) => {
                setMusic(e.file);
              }}
            >
              <Button>Change Music</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[
              { required: true, message: "Please input the author name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="chapters" label="Chapters">
            <InputNumber min={1} max={100} />
          </Form.Item>
          {/*  Gender Selection */}
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select a gender!" }]}
          >
            <Select placeholder="Select a gender">
              <Select.Option value="m">Male</Select.Option>
              <Select.Option value="f">Female</Select.Option>
              <Select.Option value="both">Both</Select.Option>
              <Select.Option value="none">None</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="default_male_name"
            label="Default male name (If applicable)"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="default_female_name"
            label="Default female name (If applicable)"
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="current_price" label="Current Price">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Books;
