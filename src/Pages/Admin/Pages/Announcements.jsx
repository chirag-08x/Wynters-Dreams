import React, { useEffect, useState } from "react";
import {
  Layout,
  Upload,
  Breadcrumb,
  Form,
  Input,
  Button,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Sidebar from "../Components/Sidebar";
import useFetch from "../../../Hooks/useFetch";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUserContext } from "../../../Context/UserContext";

const { Header, Content, Footer, Sider } = Layout;

const Announcements = () => {
  const { data, loading, error } = useFetch("/home/announcement");
  const { axiosInstance } = useUserContext();

  const onSubmit = async (values) => {
    if (values.info?.length > 120) {
      toast.error("Info length should not exceed 120 characters.");
      return;
    }
    if (values.image) {
      // convert antd upload file from from to formdata
      const formData = new FormData();
      formData.append("image", values.image.file);
      await axiosInstance.post("/home/announcement/image", formData);
      toast.success("Image uploaded successfully");
    }
    delete values["image"];
    await axiosInstance.post("/home/announcement", values, {
      // headers: {
      //   Authorization: `Bearer ${Cookies.get("authToken")}`,
      // },
    });
    toast.success("Announcement added successfully");
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
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Announcement</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            minHeight: 280,
          }}
        >
          <Row gutter={[32, 32]} style={{ marginBottom: "5rem" }}>
            {/* New Announcement Section */}
            <Col span={24}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <h2>New Announcement</h2>
                <Form layout="vertical" onFinish={onSubmit}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item label="Add Image" name="image">
                        <Upload
                          showUploadList={true}
                          listType="picture"
                          beforeUpload={() => false}
                          multiple={false}
                        >
                          <Button icon={<UploadOutlined />}>
                            Upload (Max 1MB)
                          </Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item label="Add Title" name="title" required>
                        <Input placeholder="Enter title" />
                      </Form.Item>
                      <Form.Item label="Add Subtitle" name="subtitle" required>
                        <Input placeholder="Enter subtitle" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Add Book Name"
                        name="book_name"
                        required
                      >
                        <Input placeholder="Enter BookName" />
                      </Form.Item>
                      <Form.Item
                        label="Add Book Info (120 characters max)"
                        name="info"
                      >
                        <Input.TextArea
                          rows={5}
                          placeholder="Enter Book Info"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit" type="primary">
                          Add Announcement
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
            {/* Current Announcement Section */}
            <Col span={24}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <h2>Current Announcement</h2>
                <Form layout="vertical">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item label="Current Image">
                        <img
                          alt={data?.title}
                          src={data?.image}
                          style={{ height: "400px", objectFit: "cover" }}
                        />
                      </Form.Item>
                      <Form.Item label="Current Title">
                        <Input
                          placeholder="Enter title"
                          readOnly
                          value={data?.title}
                        />
                      </Form.Item>
                      <Form.Item label="Current Subtitle">
                        <Input
                          placeholder="Enter subtitle"
                          readOnly
                          value={data?.subtitle}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Current Book Name">
                        <Input
                          placeholder="Enter BookName"
                          readOnly
                          value={data?.book_name}
                        />
                      </Form.Item>
                      <Form.Item label="Current Book Info">
                        <Input.TextArea
                          rows={5}
                          placeholder="Enter Book Info"
                          readOnly
                          value={data?.info}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Announcements;
