import React, { useState, useEffect } from "react";
import {
  Layout,
  List,
  Card,
  Table,
  Breadcrumb,
  Typography,
  Divider,
  Button,
} from "antd";
import Sidebar from "../Components/Sidebar";
import {} from "@ant-design/icons";
import useFetch from "../../../Hooks/useFetch";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Context/UserContext";
const { Content } = Layout;

const BestSellers = () => {
  const { data: bestSellers, loading: loadingBestSellers } =
    useFetch("/book/bestseller");
  const { data: allBooks, loading: loadingAllBooks } = useFetch("/book/all");
  const [allBooksData, setAllBooksData] = useState([]);
  const [selectedNewBestSellers, setSelectedNewBestSellers] = useState([]);

  const { axiosInstance } = useUserContext();

  useEffect(() => {
    setAllBooksData(allBooks);
  }, [bestSellers, allBooks]);

  const handleAddToBestseller = async (bookId) => {
    if (selectedNewBestSellers.length === 3) {
      return toast.error("You can only add 3 books to bestsellers");
    }
    const book = allBooksData.find((b) => b.id === bookId);
    setSelectedNewBestSellers([...selectedNewBestSellers, book]);
    // remove this book from all books data
    const filtered = allBooksData.filter((b) => b.id !== bookId);
    setAllBooksData(filtered);
  };
  const saveBestSellers = async () => {
    try {
      let res = await axiosInstance.post(
        "/book/bestseller",
        selectedNewBestSellers.map((b) => ({ id: b.id }))
      );
      if (res.status === 200) {
        toast.success("Best Sellers Updated Successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const columns = [
    {
      title: "Cover",
      dataIndex: "cover_image",
      key: "cover_image",
      render: (text) => (
        <img
          src={text}
          alt="cover"
          style={{ width: 60, height: 60, borderRadius: "100%" }}
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
    },
    {
      title: "Current Price",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="default" onClick={() => handleAddToBestseller(record.id)}>
          Add to Bestseller
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
            <Breadcrumb.Item>Best Sellers</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title level={4}>Current Best Sellers</Typography.Title>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={
              selectedNewBestSellers.length > 0
                ? selectedNewBestSellers
                : bestSellers
            }
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 260 }}
                  cover={
                    <img
                      height={200}
                      style={{ objectFit: "cover" }}
                      alt={item.name}
                      src={item.cover_image}
                    />
                  }
                >
                  <Card.Meta
                    title={item.name}
                    description={`Author: ${item.author}`}
                  />
                  <p>
                    Price: {item.current_price} (was {item.price})
                  </p>
                  <p>Chapters: {item.chapters}</p>
                </Card>
              </List.Item>
            )}
          />
          {selectedNewBestSellers.length > 0 && (
            <Button
              onClick={saveBestSellers}
              disabled={selectedNewBestSellers.length < 3}
              type="primary"
            >
              {" "}
              Save
            </Button>
          )}
          <Divider />
          <Typography.Title level={4}>All Books</Typography.Title>
          <Table
            style={{ marginBottom: "4rem" }}
            dataSource={allBooksData}
            columns={columns}
            rowKey="id"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BestSellers;
