import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SharedLayout from "./Layout/SharedLayout";
import { useUserContext } from "./Context/UserContext";
import { toast } from "react-toastify";
import { useEffect, Suspense, lazy } from "react";

import PageLoadingSpinner from "./Components/Common/PageLoading";
import { AdminContextProvider } from "./Context/AdminContext";
import SubscriptionPage from "./Pages/subscription";
import { loadScript } from "./Pages/Payment/Cart";
// Lazy-loaded components
const Home = lazy(() => import("./Pages/Home/Home"));
const GiftVoucher = lazy(() => import("./Pages/GiftVoucher"));
const Blogs = lazy(() => import("./Pages/Blogs/Blogs"));
const BlogDetails = lazy(() => import("./Pages/Blogs/BlogDetails"));
const Books = lazy(() => import("./Pages/Books/Books"));
const Signup = lazy(() => import("./Pages/Auth/SignUp/Signup"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const ForgotPassword = lazy(() =>
  import("./Pages/Auth/ForgotPassword/ForgotPassword")
);
const ResendVertificationEmail = lazy(() =>
  import("./Pages/Auth/ResendVerificationEmail/ResendVerificationEmail")
);
const UserDashboard = lazy(() => import("./Pages/User/UserDashboard"));
const SingleBook = lazy(() => import("./Pages/SingleBook/SingleBook"));
const TermsAndConditions = lazy(() =>
  import("./Pages/terms-and-conditions/TermsAndConditions")
);
const ViewBook = lazy(() => import("./Pages/ViewBook/ViewBook"));
const About = lazy(() => import("./Pages/About/About"));
const Payments = lazy(() => import("./Pages/Payment/Payments"));
const Error = lazy(() =>
  import("./Pages").then((module) => ({ default: module.Error }))
);
const RefundPolicy = lazy(() => import("./Pages/refund-policy/RefundPolicy"));
const PrivacyPolicy = lazy(() =>
  import("./Pages/privacy-policy/PrivacyPolicy")
);
const CancellationPolicy = lazy(() =>
  import("./Pages/cancellation-policy/CancellationPolicy")
);
const CookiesPolicy = lazy(() =>
  import("./Pages/cookies-policy/CookiesPolicy")
);
const ResetPassword = lazy(() =>
  import("./Pages/Auth/ResetPassword/ResetPassword")
);
const EditUserProfile = lazy(() => import("./Pages/User/EditUserProfile"));
const CartPage = lazy(() => import("./Pages/Payment/Cart"));
const AdminAnnouncements = lazy(() =>
  import("./Pages/Admin/Pages/Announcements")
);
const AdminDashboardHome = lazy(() => import("./Pages/Admin/Pages/Home"));
const AdminBestSellers = lazy(() => import("./Pages/Admin/Pages/BestSellers"));
const AdminBlogs = lazy(() => import("./Pages/Admin/Pages/Blogs"));
const AdminBooks = lazy(() => import("./Pages/Admin/Pages/Books/Books"));
const AdminGifting = lazy(() => import("./Pages/Admin/Pages/Gifting"));
const AdminSubscription = lazy(() =>
  import("./Pages/Admin/Pages/subscription")
);
const AdminBookPages = lazy(() =>
  import("./Pages/Admin/Pages/Books/BookPages")
);
const AdminTestimonials = lazy(() =>
  import("./Pages/Admin/Pages/Testimonials")
);
const PrivateRoute = ({ children }) => {
  const {
    state: { user, loading },
  } = useUserContext();

  useEffect(() => {}, [user, loading]);

  if (loading) {
    return (
      <div style={{ display: "grid", placeItems: "center", marginTop: "5rem" }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (user) {
    return children;
  }

  toast.warn("Please login first");
  return <Navigate to={"/login"} />;
};
const AdminRoute = ({ children }) => {
  const {
    state: { user, loading },
  } = useUserContext();

  useEffect(() => {}, [user, loading]);

  if (loading) {
    return (
      <div style={{ display: "grid", placeItems: "center", marginTop: "5rem" }}>
        <h3>Loading...</h3>
      </div>
    );
  }
  if (!user.admin) {
    return <Navigate to={"/"} />;
  }
  if (user) {
    return <AdminContextProvider>{children}</AdminContextProvider>;
  }

  toast.warn("Please login first");
  return <Navigate to={"/login"} />;
};
const App = () => {
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoadingSpinner />}>
              <SharedLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <BlogDetails />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/gifting"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <GiftVoucher />
              </Suspense>
            }
          />
          <Route
            path="/subscription"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <SubscriptionPage />
              </Suspense>
            }
          />
          <Route
            path="/books"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <Books />
              </Suspense>
            }
          />
          <Route
            path="/book/:id"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <SingleBook />
              </Suspense>
            }
          />
          <Route
            path="/view-book/:id"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <PrivateRoute>
                  <ViewBook />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <Payments />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/resend-verification-email"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <ResendVertificationEmail />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <AdminRoute>
                  <Routes>
                    <Route index element={<AdminDashboardHome />} />
                    <Route
                      path="announcements"
                      element={<AdminAnnouncements />}
                    />
                    <Route path="bestsellers" element={<AdminBestSellers />} />
                    <Route path="blogs" element={<AdminBlogs />} />
                    <Route path="books" element={<AdminBooks />} />
                    <Route path="books/:id" element={<AdminBookPages />} />
                    <Route
                      path="testimonials"
                      element={<AdminTestimonials />}
                    />
                    <Route path="gifting" element={<AdminGifting />} />
                    <Route
                      path="subscription"
                      element={<AdminSubscription />}
                    />
                  </Routes>
                </AdminRoute>
              </Suspense>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <PrivateRoute>
                  <EditUserProfile />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="/cancellation-policy"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <CancellationPolicy />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <TermsAndConditions />
              </Suspense>
            }
          />
          <Route
            path="/refund-policy"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <RefundPolicy />
              </Suspense>
            }
          />
          <Route
            path="/cookies"
            element={
              <Suspense fallback={<PageLoadingSpinner />}>
                <CookiesPolicy />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
