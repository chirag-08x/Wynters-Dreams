import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { v1 } from "uuid";
import useData from "../../../Context/DataContext";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Context/UserContext";
import moment from "moment";

let lastUpdate;

export default function Gifting() {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    state: { user },
    axiosInstance,
  } = useUserContext();
  const { vouchers: giftVouchers, setVouchers } = useData();

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/gift-voucher/book-price");
      setCurrentPrice(data);
      lastUpdate = data;
      setLoading(false);
    })();
  }, []);

  const updatePrice = async () => {
    if (Number(lastUpdate) == Number(currentPrice)) {
      return;
    }
    setUpdating(true);
    const { data } = await axiosInstance.post("/gift-voucher/book-price", {
      price: Number(currentPrice),
    });
    lastUpdate = data;
    setCurrentPrice(data);
    setUpdating(false);
  };

  useEffect(() => {
    (async () => {
      if (!giftVouchers) {
        const { data } = await axiosInstance.get("/gift-voucher");
        setVouchers(data);
      }
    })();
  }, []);

  useEffect(() => {
    let timeout;
    if (currentPrice) {
      timeout = setTimeout(() => {
        updatePrice();
      }, 2000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [currentPrice]);

  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete("/gift-voucher/" + id);
      setVouchers((prev) => {
        return prev?.filter((v) => v.id != id);
      });
      toast.success("Voucher Deleted successfully");
    } catch (error) {
      toast.error("Can't delete something went wrong.");
    }
  };

  const red = { color: "red" };
  const green = { color: "green" };

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
          <Breadcrumb.Item>Gifting</Breadcrumb.Item>
        </Breadcrumb>
        <Typography.Title level={4}>Gifting</Typography.Title>
        {loading ? (
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        ) : (
          <>
            <div style={{ background: "#fff", padding: 24 }}>
              <h4 style={{ marginBottom: "0px" }}>Book Value</h4>
              <Divider />
              <Typography.Title level={5}>
                Individual Book Value {updating && "(Updating Price...)"}
              </Typography.Title>
              <Input
                type="number"
                value={currentPrice}
                onChange={(e) => {
                  setCurrentPrice(e.target.value);
                }}
                placeholder="Input Book Value"
              />
            </div>
            <div
              style={{
                background: "#fff",
                marginTop: 34,
                padding: 24,
                // minHeight: 80,
              }}
            >
              <h4 style={{ marginBottom: "25px" }}>All Gift Voucher</h4>
              <Table
                showHeader
                style={{ marginBottom: "4rem" }}
                dataSource={giftVouchers || []}
                columns={[
                  { title: "Code", dataIndex: "code", key: "code" },
                  {
                    title: "No. of books",
                    dataIndex: "numberOfBooks",
                    key: "numberOfBooks",
                  },
                  {
                    title: "Status",
                    render: (value, record) => {
                      return (
                        <div style={value ? red : green}>
                          {value ? "Redeemed" : "Unredeemed"}
                        </div>
                      );
                    },
                    dataIndex: "redeemed",
                    key: "redeemed",
                  },
                  {
                    title: `Created By`,
                    dataIndex: "createdBy",
                    key: "createdBy",
                  },
                  {
                    title: `Date of creation`,
                    dataIndex: "createdAt",
                    render: (value) =>
                      moment(value).format("DD MMM YYYY hh:mm a"),
                  },
                  {
                    title: "Action",
                    render: (_, record) => {
                      return (
                        <>
                          <Button
                            onClick={() => deleteHandler(record.id)}
                            color="red"
                          >
                            Delete
                          </Button>
                        </>
                      );
                    },
                    key: "actions",
                  },
                ]}
                rowKey="id"
              />
            </div>
          </>
        )}
      </Layout>
    </Layout>
  );
}
