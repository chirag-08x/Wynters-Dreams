import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Table,
  Typography,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";
import { useUserContext } from "../../../../Context/UserContext";

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function Subscription() {
  const [plans, setPlans] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [editing, setEditing] = useState(false);
  const [banner, setBanner] = useState(null);

  const [form] = Form.useForm();

  const { axiosInstance } = useUserContext();

  useEffect(() => {
    if (!plans) {
      (async () => {
        const { data } = await axiosInstance.get("/subscription/plan");
        setPlans(data);
      })();
    }
  }, []);

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const submitHandler = async (payload) => {
    setCreatingPlan(true);
    try {
      const finalPayload = {
        ...payload,
        price: Number(payload.price),
      };

      const { data } = await axiosInstance[editing ? "patch" : "post"](
        "/subscription/plan",
        finalPayload
      );
      if (editing) {
        setPlans((prev) => {
          return prev.map((plan) => (plan.id === payload.id ? data : plan));
        });
      } else {
        setPlans((prev) => [...prev, data]);
      }
      form.resetFields();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong.");
    }
    setEditing(false);
    setCreatingPlan(false);
    toggleModal();
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
          <Breadcrumb.Item>Subscription</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title level={4}>Subscription Plans</Typography.Title>
        <div
          style={{
            background: "#fff",
            marginTop: 34,
            padding: 24,
            // minHeight: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ marginBottom: "25px" }}>All subscription plans</h4>
          </div>
          <Table
            showHeader
            style={{ marginBottom: "4rem" }}
            dataSource={plans || []}
            columns={[
              {
                title: "Title",
                dataIndex: "title",
                key: "title",
              },
              {
                title: "Price",
                dataIndex: "price",
                key: "price",
              },
              {
                title: "Price Text",
                dataIndex: "priceText",
                key: "priceText",
              },
              {
                title: "Razorpay plane id",
                dataIndex: "razorpayPlaneId",
                key: "razorpayPlaneId",
              },
              {
                title: "Action",
                render: (_, record) => {
                  return (
                    <>
                      <Button
                        onClick={() => {
                          form.setFieldsValue(record);
                          setEditing(true);
                          toggleModal();
                        }}
                        color="red"
                      >
                        Edit
                      </Button>
                      &nbsp; &nbsp;
                    </>
                  );
                },
                key: "actions",
              },
            ]}
            rowKey="id"
          />
        </div>
      </Layout>

      <Modal
        title={editing ? "Edit Book Details" : "Add New Book"}
        width={800}
        footer={false}
        open={isModalVisible}
        onCancel={() => {
          form.resetFields();
          toggleModal();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          // initialValues={}
          onFinish={submitHandler}
        >
          {editing && (
            <Form.Item
              name="id"
              label="Id"
              rules={[{ required: true, message: "Please input the type!" }]}
            >
              <Input disabled />
            </Form.Item>
          )}

          <Form.Item
            name="title"
            label="Title"
            placeholder="Young Explorer"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="priceText"
            label="Price Text"
            placeholder="INR 250/Month"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            placeholder="Get access to 3 books"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            htmlType="number"
            type="number"
            name="price"
            label="Price"
            placeholder="999"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="razorpayPlaneId"
            label="Razorpay Plane Id"
            placeholder="plan_24oiaaskncasi"
            rules={[
              { required: true, message: "Please input the RazorpayPlaneId!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button loading={creatingPlan} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
