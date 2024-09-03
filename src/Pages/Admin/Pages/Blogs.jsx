import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Table,
  Breadcrumb,
  Typography,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Upload,
} from "antd";
import Sidebar from "../Components/Sidebar";
import { FiDelete, FiTrash, FiUpload } from "react-icons/fi";
import useFetch from "../../../Hooks/useFetch";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Context/UserContext";
const { Content } = Layout;

const NewBlogForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const { axiosInstance } = useUserContext();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      dir="vertical"
      layout="vertical"
      style={{ paddingTop: "2rem" }}
      onFinish={onFinish}
    >
      <Form.Item
        name="image"
        label="Cover Image"
        valuePropName="image"
        extra="Upload a cover image for the blog"
      >
        <Upload
          multiple={false}
          name="image"
          beforeUpload={() => false}
          listType="picture"
        >
          <Button icon={<FiUpload />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        name="author"
        rules={[{ required: true, message: "Please input the author!" }]}
      >
        <Input placeholder="Author" />
      </Form.Item>

      <Form.Item
        name="subtitle"
        rules={[{ required: true, message: "Please input the subtitle!" }]}
      >
        <Input placeholder="Subtitle" />
      </Form.Item>

      <Form.Item
        name="content"
        rules={[{ required: true, message: "Please input the blog content!" }]}
      >
        <Input.TextArea rows={6} placeholder="Blog Content (Markdown)" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const Blogs = () => {
  const { data: blogsData, loading: loadingBlogs } = useFetch("/blog");
  const pageSize = 10;
  const [blogs, setBlogs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { axiosInstance } = useUserContext();

  useEffect(() => {
    if (blogsData) {
      setBlogs(blogsData.blogs);
      setTotalBlogs(blogsData.total_blogs);
    }
  }, [blogsData]);
  useEffect(() => {
    axiosInstance
      .get(`/blog?offset=${offset}`)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        toast.error("Error Fetching Blogs");
        return;
      });
  }, [offset]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleNewBlogSubmit = async (blogData) => {
    if (!blogData.image) {
      toast.error("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("image", blogData.image.file);
    delete blogData.image;
    let uploadedBlog = null;
    try {
      uploadedBlog = (await axiosInstance.post("/blog", blogData)).data;
      toast.success("Blog Added Successfully");
      setIsModalVisible(false);
      try {
        await axiosInstance.post(`/blog/${uploadedBlog.id}/image`, formData);
        toast.success("Blog Image Added Successfully");
      } catch (err) {
        toast.error("Error Adding Blog Image");
        return;
      }
    } catch (error) {
      toast.error("Error Adding Blog");
      return;
    }
  };
  const columns = [
    {
      title: "S.No.",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="cover image"
          style={{ height: "5rem", borderRadius: "6%" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
      render: (text) =>
        text.length > 60 ? `${text.substring(0, 60)}...` : text,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (timestamp) => new Date(timestamp * 1000).toLocaleDateString(),
    },
    {
      title: "Modified At",
      dataIndex: "modified_at",
      key: "modified_at",
      render: (timestamp) => new Date(timestamp * 1000).toLocaleDateString(),
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          icon={<FiTrash />}
          danger
          type="default"
          onClick={() => {
            Modal.confirm({
              title: `Are you sure you want to delete "${record.title}" blog?`,
              content: "This action cannot be undone",
              okText: "Yes",
              okType: "danger",
              cancelText: "No",
              onOk() {
                axiosInstance
                  .delete(`/blog/${record.id}`)
                  .then((res) => {
                    toast.success("Blog Deleted Successfully");
                    setBlogs(blogs.filter((blog) => blog.id !== record.id));
                  })
                  .catch((err) => {
                    toast.error("Error Deleting Blog");
                    return;
                  });
              },
              onCancel() {
                console.log("Cancel");
              },
            });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

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
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title level={4}>All Blogs</Typography.Title>
          <Row gutter={[16, 16]} justify={"end"}>
            <Col>
              <Button type="primary" onClick={showModal}>
                Add New Blog
              </Button>
            </Col>
            <Col span={24}>
              <Table
                loading={loadingBlogs}
                pagination={{
                  pageSize: pageSize,
                  total: totalBlogs,
                  // NEXT PAGE OFFESET = OFFSET + 1
                  onChange: (page, pageSize) => setOffset(page - 1),
                }}
                showHeader
                style={{ marginBottom: "4rem" }}
                dataSource={
                  blogs?.length > 0
                    ? blogs.map((blog, idx) => {
                        return {
                          ...blog,
                          key: blog.id,
                          sno: idx + 1 + offset * pageSize,
                        };
                      })
                    : []
                }
                columns={columns}
                rowKey="id"
              />
            </Col>
          </Row>
        </Content>
        <Modal
          onCancel={() => setIsModalVisible(false)}
          width={800}
          footer={null}
          open={isModalVisible}
        >
          <NewBlogForm onSubmit={handleNewBlogSubmit} />
        </Modal>
      </Layout>
    </Layout>
  );
};

export default Blogs;
