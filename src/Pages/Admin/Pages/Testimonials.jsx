import React, { useState, useEffect } from "react";
import {
  List,
  Rate,
  Button,
  Modal,
  Form,
  Input,
  Layout,
  Table,
  Row,
  Col,
  Breadcrumb,
  Divider,
  Typography,
} from "antd";
import Sidebar from "../Components/Sidebar";
import { FiUpload } from "react-icons/fi";
import useFetch from "../../../Hooks/useFetch";
import { toast } from "react-toastify";
import { render } from "@testing-library/react";
import { useUserContext } from "../../../Context/UserContext";
const { Content } = Layout;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(null);
  const {
    data: testimonialsData,
    error,
    isPending,
  } = useFetch("home/testimonials");
  useEffect(() => {
    setTestimonials(testimonialsData);
  }, [testimonialsData]);

  const { axiosInstance } = useUserContext();

  const showModal = (index = null) => {
    setCurrentTestimonialIndex(index);
    setIsModalVisible(true);
  };

  const deleteTestimonial = async (index) => {
    try {
      let updatedTestimonials = testimonials.filter(
        (testimonial, i) => i !== index
      );
      setTestimonials(updatedTestimonials);
      await axiosInstance.post(`home/testimonials`, updatedTestimonials);
      toast.success("Testimonial deleted successfully!");
    } catch (error) {
      toast.error("Error deleting testimonial!");
    }
  };
  const handleOk = async (values) => {
    setIsModalVisible(false);
    // API call to create or update testimonial
    // If `currentTestimonial` is null, it's a new testimonial
    try {
      if (currentTestimonialIndex) {
        let updatedTestimonials = testimonials.map((testimonial, index) => {
          if (index === currentTestimonialIndex) {
            return { ...testimonial, ...values };
          }
          return testimonial;
        });
        setTestimonials(updatedTestimonials);
        await axiosInstance.post(`/home/testimonials`, updatedTestimonials);
        toast.success("Testimonial updated successfully!");
      } else {
        try {
          let updatedTestimonials = [...testimonials, values];
          setTestimonials(updatedTestimonials);
          await axiosInstance.post(`/home/testimonials`, updatedTestimonials);
          toast.success("Testimonial added successfully!");
        } catch (error) {
          toast.error("Error adding testimonial!");
        }
      }
    } catch (error) {
      toast.error("Error updating testimonial!");
    }
  };

  const columns = [
    {
      title: "Stars",
      dataIndex: "stars",
      key: "stars",
      render: (stars) => <Rate disabled value={stars} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Testimonial",
      dataIndex: "testimonial",
      key: "testimonial",
      // show only 50 characters
      render: (testimonial) => testimonial.slice(0, 80) + "...",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button onClick={() => showModal(index)}>Edit</Button>
          <Button onClick={() => deleteTestimonial(index)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const handleCancel = () => {
    setIsModalVisible(false);
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
          <Breadcrumb.Item>Testimonials</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title level={4}>All Testimonials</Typography.Title>

        <Row
          gutter={[16, 16]}
          justify={"end"}
          style={{
            minHeight: 280,
          }}
        >
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setCurrentTestimonialIndex(null);
                setIsModalVisible(true);
              }}
            >
              Add Testimonial
            </Button>
          </Col>
          <Col span={24}>
            <Table dataSource={testimonials} columns={columns} rowKey="name" />
          </Col>

          <Modal
            title={
              currentTestimonialIndex ? "Edit Testimonial" : "Add Testimonial"
            }
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              initialValues={testimonials[currentTestimonialIndex]}
              onFinish={handleOk}
            >
              <Form.Item
                name="stars"
                rules={[
                  {
                    required: true,
                    message: "Please input the number of stars!",
                  },
                ]}
              >
                <Rate />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="testimonial"
                rules={[
                  { required: true, message: "Please input the testimonial!" },
                ]}
              >
                <Input.TextArea rows={6} placeholder="Testimonial" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {currentTestimonialIndex ? "Update" : "Add"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Row>
      </Layout>
    </Layout>
  );
};

export default Testimonials;
