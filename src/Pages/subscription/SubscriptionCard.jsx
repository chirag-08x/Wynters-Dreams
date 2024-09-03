import React, { useState } from "react";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

export default function SubscriptionCard({ item }) {
  const {
    axiosInstance,
    logoutUser,
    state: { user },
  } = useUserContext();
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  const navigate = useNavigate();
  const selectPlaneHandler = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.subscription) {
      toast.warning("You already have the active subscription.");
      return;
    }
    if (item.type !== "custom") {
      setPaymentInProgress(true);
      try {
        const { data } = await axiosInstance.post("/subscription", item);
        const paymentObject = new window.Razorpay({
          ...data,
          image: "logo192.png",
          handler: function () {
            toast.success(
              "You have successfully subscribed! You will be logged out shortly. It may take 15-20 minutes for your subscription to reflect."
            );
            setTimeout(logoutUser, 10000);
          },
        });
        paymentObject.open();
      } catch (error) {
        toast.error(
          (typeof error?.response?.data === "object"
            ? typeof error?.response?.data === "string"
              ? error?.response?.data
              : error?.response?.data?.message
            : error?.response?.data) || "Something went wrong"
        );
      }
      setPaymentInProgress(false);
    }
  };

  return (
    <Card key={item.id} className="pricing-section-card">
      <img src={`/images/subscription/plans/${item.type}-banner.png`} />
      <div className="details-container">
        <h3>{item.title}</h3>
        <p className="price-text">{item.priceText}</p>
        <p>{item.description}</p>
        <div style={{ marginTop: "1rem" }} className="yellow-btn-container">
          <button
            disabled={paymentInProgress}
            onClick={selectPlaneHandler}
            style={{ fontSize: "16px" }}
            className="btn button-btn-1  btn-yellow"
          >
            {item.type === "custom" ? "Contact us" : "Select plan"}
          </button>
        </div>
      </div>
    </Card>
  );
}

const Card = styled.div`
  background-color: #fff;
  border-radius: 1.8rem;
  color: #050162;

  .details-container {
    padding: 1rem;
    padding-bottom: 1.5rem;
  }

  h3 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 1rem;
  }

  p {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }

  .price-text {
    font-weight: 600;
  }
`;
