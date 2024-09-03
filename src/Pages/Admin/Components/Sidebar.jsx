import { Layout, Menu } from "antd";
import {
  FiBookOpen,
  FiFileText,
  FiMessageSquare,
  FiStar,
  FiBell,
  FiHome,
  FiHeart,
  FiDollarSign,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
const { Sider } = Layout;
const Sidebar = () => {
  const location = useLocation();
  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/admin":
        return "1";
      case "/admin/announcements":
        return "2";
      case "/admin/bestsellers":
        return "3";
      case "/admin/testimonials":
        return "4";
      case "/admin/blogs":
        return "5";
      case "/admin/books":
        return "6";
      case "/admin/gifting":
        return "7";
      case "/admin/subscription":
        return "8";
      default:
        return "1";
    }
  };
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        style={{ height: "100%", borderRight: 0, padding: "2rem 0" }}
      >
        <Menu.Item key="1" icon={<FiHome />}>
          <Link to="/admin">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FiBell />}>
          <Link to="/admin/announcements">Announcements</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FiHeart />}>
          <Link to="/admin/bestsellers">Bestsellers</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FiMessageSquare />}>
          <Link to="/admin/testimonials">Testimonials</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FiFileText />}>
          <Link to="/admin/blogs">Blogs</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FiBookOpen />}>
          <Link to="/admin/books">Books</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<FiBookOpen />}>
          <Link to="/admin/gifting">Gifting</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<FiDollarSign />}>
          <Link to="/admin/subscription">Subscription</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
