import React, { useEffect } from "react";
import { Layout, Row, Col, Card, Statistic, Alert, Breadcrumb } from "antd";
import Sidebar from "../Components/Sidebar";
import {} from "@ant-design/icons";
import useFetch from "../../../Hooks/useFetch";
import useAdmin from "../../../Context/AdminContext";
import { useUserContext } from "../../../Context/UserContext";
const { Content } = Layout;

const DashboardHome = () => {
  const { stats, setStats } = useAdmin();
  const { axiosInstance } = useUserContext();
  // const { data: newStats, loading: loadingStats } = useFetch('/home/stats', !!stats);

  useEffect(() => {
    (async () => {
      try {
        if (!stats) {
          const { data } = await axiosInstance.get("/home/stats");
          setStats(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff" }}>
            <h1>Welcome to the dashboard.</h1>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    valueStyle={{
                      color: "#0D99FF",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                    // prefix={}
                    title="Paid orders"
                    value={stats?.paid_orders ?? "Empty"}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    valueStyle={{
                      color: "#0D99FF",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                    title="Number of Registered Users"
                    value={stats?.user_count ?? "Empty"}
                  />
                </Card>
              </Col>
            </Row>
            {/* <div style={{ margin: '24px 0' }}>
                            <h2>Errors</h2>
                            <Alert
                                message="Title of Error message"
                                description="The body of the error message can describe where the error took place and what can be done to rectify it."
                                type="error"
                                showIcon
                            />
                            <Alert
                                message="Title of Second Error message"
                                description="The body of the error message can describe where the error took place and what can be done to rectify it."
                                type="error"
                                showIcon
                            />
                        </div> */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardHome;
