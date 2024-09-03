import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { deviceMin } from "../../styles/size";
import { useUserContext } from "../../Context/UserContext";
import { FaTrash } from "react-icons/fa";
import useFetch from "../../Hooks/useFetch";
import CustomInput from "../../helpers/CustomInput";

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const CartPage = () => {
  const {
    state: { user },
    setCart,
    cartState,
    axiosInstance,
  } = useUserContext();
  const refContainer = useRef(null);

  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [paymentForm, setPaymentForm] = useState(null);
  const [code, setCode] = useState("");
  const [validCoupon, setValidCoupon] = useState(false);
  const [validBooks, setValidBooks] = useState(0);

  const { loading: verifyingCode, fetchData: verifyCodeRequest } = useFetch(
    "",
    true
  );

  const verifyCode = async () => {
    try {
      const data = await verifyCodeRequest(`/gift-voucher/verify?code=${code}`);
      setValidBooks(data.numberOfBooks);
      setValidCoupon(true);
    } catch (error) {
      console.log(error?.response);
      toast.error(error?.response?.data?.message || "Invalid Coupon Code");
    }
  };

  useEffect(() => {
    let timeout;
    if (code.length > 5) {
      timeout = setTimeout(verifyCode, 400);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [code]);

  const handleRemoveFromCart = async (bookId) => {
    try {
      let newCart = cartState?.filter((item) => item.id !== bookId) ?? [];
      await axiosInstance.delete(`/cart`, {
        data: {
          book_id: bookId,
        },
      });
      setCart(newCart);
      toast.success("Removed from Cart");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handlePurchase = async () => {
    try {
      if (validCoupon) {
        const cartLength = cartState?.length || 0;
        if (cartLength != validBooks) {
          if (cartLength > validBooks) {
            toast.error(
              `Please remove ${cartLength - validBooks} book from the cart.`
            );
          } else {
            toast.error(
              `Please add ${validBooks - cartLength} book in the cart.`
            );
          }
        } else {
          await axiosInstance.get(`/gift-voucher/redeem?code=${code}`);
          toast.success("Gift voucher redeemed successfully.");
          setTimeout(() => {
            navigate("/dashboard");
            window.location.reload();
          }, 2000);
        }
        return;
      }
      const { data } = await axiosInstance.get("/payment/r");
      delete data["callback"];
      const paymentObject = new window.Razorpay({
        ...data,
        image: "logo192.png",
        handler: function (response) {
          toast.success("Purchase successful");
          navigate("/");
        },
      });
      paymentObject.open();

      // console.log(data);
      // setPaymentForm(data);
      // navigate(`/view-book/${id}`  );
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (paymentForm) {
      refContainer.current.querySelector("form").submit();
    }
  }, [paymentForm]);

  useEffect(() => {
    if ((cartState?.length || 0) > 0) {
      let total = 0;
      cartState.forEach((item) => {
        total += item.current_price;
      });
      setTotal(total);
    }
  }, [cartState]);

  return (
    <Wrapper>
      <div className="cart-items">
        <h2>Books</h2>
        {(cartState?.length || 0) === 0 && <p>No books in cart</p>}
        {cartState?.map((item, index) => (
          <div key={`${index + 1}`} className="cart-item">
            <img
              className="cart-item-image"
              src={item.cover_image}
              alt={item.title}
            />
            <div className="cart-item-details">
              <div className="cart-item-info">
                <p className="p-bold">{item.name}</p>
                <p>₹{item.current_price}</p>
              </div>
              <FaTrash
                size="24px"
                color="var(--clr-dark-blue)"
                style={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveFromCart(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="total-container">
        <h2>Shopping Cart</h2>
        <p>
          Ready to dive into your chosen books? Double-check your selections and
          proceed to payment. We guarantee the security of your information.
        </p>
        <hr />
        <div>
          <p className="p-bold">Sub Total:</p>
          <p>₹{total}</p>
        </div>
        <a href="/subscription">
          <img
            style={{ width: "200px" }}
            alt="offer-badge"
            src="/images/subscription/offer-badge.png"
          />
        </a>
        <CustomInput
          label="Gift Voucher"
          placeholder="Voucher Code"
          id="code"
          onChange={(name, value) => {
            if (value?.length < 7) {
              setCode(value?.toUpperCase());
            }
          }}
          value={code}
          aadOnRight={code.length === 6}
          correct={validCoupon}
          loading={verifyingCode}
        />

        <button
          style={{
            backgroundColor:
              user?.cart?.length <= 0 ? "lightgray" : "var(--clr-orange)",
          }}
          onClick={handlePurchase}
          disabled={user?.cart?.length <= 0}
          className="btn"
        >
          Continue to Payment
        </button>
      </div>

      <section
        style={{ display: "none" }}
        ref={refContainer}
        className="section-center"
        dangerouslySetInnerHTML={{ __html: paymentForm }}
      ></section>
    </Wrapper>
  );
};

export default CartPage;

export const Wrapper = styled.div`
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  .p-bold {
    color: var(--clr-dark-blue);
  }
  h2,
  p {
    color: var(--clr-dark-blue);
  }
  > div {
    width: 100%;
  }
  .total-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    hr {
      width: 100%;
      height: 2px;
      background-color: var(--clr-yellow-light);
    }
    h3 {
      color: var(--clr-dark-blue);
    }
    button {
      background: var(--clr-orange);
      margin-top: 0.5rem;
      color: white;
    }
  }
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .cart-item {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      padding: 1rem;
      background-color: white;
      box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);
      .cart-item-image {
        width: 200px;
        height: 120px;
        border-radius: 4%;
        object-fit: cover;
      }
      .cart-item-details {
        display: flex;
        width: 100%;
        height: fit-content;
        align-items: center;
        margin: auto;
        flex-direction: row;
        justify-content: space-between;
        .cart-item-info {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
  @media ${deviceMin.tablet} {
    gap: 3rem;
  }

  @media ${deviceMin.desktop} {
    flex-direction: row;
    gap: 8rem;
    > div {
      width: 50%;
    }
    .cart-items {
    }
  }
`;
