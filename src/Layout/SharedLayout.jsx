import { Navbar, Sidebar, Footer } from "../Components";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
const SharedLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  console.log({ path: location.pathname });
  return (
    <>
      <Sidebar />
      <Navbar />
      <main style={{ minHeight: "85vh" }}>
        <Outlet />
      </main>
      {location.pathname.includes("/view-book/") ? null : <Footer />}
    </>
  );
};

export default SharedLayout;
