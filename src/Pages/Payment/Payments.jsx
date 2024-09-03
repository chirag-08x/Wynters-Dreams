import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

const Payments = () => {
  const [loading, setLoading] = useState(false);
  const [paymentForm, setPaymentForm] = useState(null);
  const [error, setError] = useState(false);
  const refContainer = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const { axiosInstance } = useUserContext();

  useEffect(() => {
    const getPaymentsForm = async () => {
      setLoading(true);
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        toast.warn("Please Login First.");
        return navigate("/login");
      }

      try {
        const requestBody = {
          products: [
            {
              product_id: id,
              product_type: "book",
            },
          ],
        };

        const { data } = await axiosInstance.post("/payment/r", requestBody);
        delete data["callback"];
        const paymentObject = new window.Razorpay({
          ...data,
          image: "logo192.png",
          handler: function (response) {
            toast.success("Purchase successful");
            setLoading(false);
            setError(false);
            window.location.reload();
          },
        });
        paymentObject.open();
      } catch (error) {
        toast.error("Cannot Process payment at this time.");
        setError(true);
        setLoading(false);
        setTimeout(() => {
          navigate(`/book/${id}`);
        }, 5000);
      }
    };

    getPaymentsForm();
  }, []);

  useEffect(() => {
    if (paymentForm && !error && !loading) {
      refContainer.current.querySelector("form").submit();
    }
  }, [paymentForm]);

  if (error) {
    return (
      <div
        style={{
          height: "70vh",
          display: "grid",
          placeContent: "center",
        }}
      >
        <p>You will be redirected to the Books Page in 5 seconds.</p>
        <Link to={`/book/${id}`} className="btn">
          Go Back
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ height: "70vh", display: "grid", placeItems: "center" }}>
        <h3>Loading....</h3>;
      </div>
    );
  }

  return (
    <div
      style={{ height: "70vh", display: "grid", placeItems: "center" }}
      ref={refContainer}
    >
      <section
        className="section-center"
        dangerouslySetInnerHTML={{ __html: paymentForm }}
      ></section>
    </div>
  );
};

export default Payments;
