import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Wrapper } from "../Books/Books";
import { Button, Col, Row, Table } from "antd";
import CreateVoucherForm from "./CreateVoucherForm";
import { toast } from "react-toastify";
import useData from "../../Context/DataContext";
import useAdmin from "../../Context/AdminContext";
import { useUserContext } from "../../Context/UserContext";
import { styled } from "styled-components";
import { deviceMin } from "../../styles/size";
import { IoMdInformationCircle } from "react-icons/io";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    description: "Choose the number of books you want to gift!",
    src: "/images/gifting/how-it-works/book.png",
  },
  {
    description:
      "Your vouchers will be emailed to you, and are also visible on your profile page. Now, you can share these codes with your loved ones!",
    src: "/images/gifting/how-it-works/message.png",
  },
  {
    description:
      "These voucher codes can be used to claim free books at checkout. Happy Reading!",
    src: "/images/gifting/how-it-works/gift.png",
  },
];

export default function GiftVoucher() {
  const refContainer = useRef();
  const [paymentForm, setPaymentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(0);

  const [form, setForm] = useState({
    quantity: 1,
    booksPerVoucher: 1,
  });

  const navigate = useNavigate();

  const {
    state: { user },
    axiosInstance,
  } = useUserContext();

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/gift-voucher/book-price");
      setCurrentPrice(data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (paymentForm) {
      refContainer.current.querySelector("form").submit();
    }
  }, [paymentForm]);

  const updateForm = (name, updateBy) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name] + updateBy || 1,
    }));
  };

  const generateGiftVoucherHandler = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const { data } = await axiosInstance.post("/gift-voucher", {
        numberOfVouchers: form.quantity,
        booksPerVoucher: form.booksPerVoucher,
      });
      if (user.admin) {
        toast.success("Voucher created successfully!");
      } else {
        delete data["callback"];
        const paymentObject = new window.Razorpay({
          ...data,
          image: "logo192.png",
          handler: function (response) {
            toast.success("Purchase successful");
            navigate("/dashboard");
          },
        });
        paymentObject.open();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const counter = useCallback(
    (name, onClickLink) => {
      return (
        <>
          <div className="action-container">
            <MinusCircleFilled
              onClick={() => updateForm(name, -1)}
              className="ic_btn"
            />
            <div className="count">{form[name]}</div>
            <PlusCircleFilled
              onClick={() => updateForm(name, 1)}
              className="ic_btn"
            />
          </div>
          {/* <div className="info" onClick={onClickLink}>
            <IoMdInformationCircle />
            Learn More
          </div> */}
        </>
      );
    },
    [form]
  );

  const actions = useMemo(() => {
    return [
      {
        title: "Voucher Quantity",
        content: counter("quantity"),
      },
      {
        title: "Books per Voucher",
        content: counter("booksPerVoucher"),
      },
      {
        title: "Gifting Value",
        content: (
          <h3 className="xl-3">
            ₹ {currentPrice * form.booksPerVoucher * form.quantity}
          </h3>
        ),
      },
    ];
  }, [counter, currentPrice]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          color: "#fff",
        }}
      >
        <h1> Loading...</h1>
      </div>
    );
  }

  return (
    <Wrapper style={{ padding: "0rem" }}>
      <img
        src={
          window.innerWidth < 768
            ? "images/gifting/gifting-banner-mobile.png"
            : window.innerWidth < 1024
            ? "/images/gifting/gifting-banner-tablet.png"
            : "/images/gifting/gifting-banner-desktop.png"
        }
      />
      <Tutorial>
        <h3 style={{ textAlign: "center" }}>How it works</h3>
        <div className="step-container">
          {steps.map((step, index) => {
            return (
              <div key={`${index + 1}`} className="step">
                <img className="image" alt={step.src} src={step.src} />
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
        <div className="divider"></div>
      </Tutorial>
      <Tutorial>
        <h3 style={{ textAlign: "center" }}>Generate Vouchers</h3>
        <div className="step-container">
          {actions.map((action, index) => {
            return (
              <div key={`${index + 1}`} className="card">
                <h5 className="title">{action.title}</h5>
                {action.content || null}
              </div>
            );
          })}
        </div>
        <div className="btn-container">
          <button
            onClick={generateGiftVoucherHandler}
            className="btn btn-yellow"
          >
            Generate Vouchers!
          </button>
        </div>
      </Tutorial>
      <img
        src={
          window.innerWidth < 768
            ? "images/gifting/footer/mobile.png"
            : window.innerWidth < 1024
            ? "/images/gifting/footer/tablet.png"
            : "/images/gifting/footer/desktop.png"
        }
      />
      <section
        style={{ display: "none" }}
        ref={refContainer}
        className="section-center"
        dangerouslySetInnerHTML={{ __html: paymentForm }}
      ></section>
    </Wrapper>
  );
}

const Tutorial = styled.section`
  padding: 20px 24px;

  .xl-3 {
    color: var(--WD-Dark-Blu, #050162);
    text-align: center;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 40px */
  }

  h3 {
    font-size: 20px;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 48px;
    /* margin-bottom: 40px; */
  }
  .btn {
    width: fit-content;
    /* border: 1px solid var(--clr-dark-blue); */
    color: #fff;
    text-align: start !important;
    text-transform: none !important;
    transition: all 0.1s;
    border-radius: 8px;
    background: linear-gradient(95deg, #ffa000 -43.97%, #ffcf00 127.01%);
  }

  .divider {
    height: 2px;
    background-color: #0d9aff7d;
    margin: auto;
    margin-top: 40px;
  }

  .step-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;

    .step {
      display: flex;
      align-items: center;
      gap: 15px;

      img {
        width: 80px;
      }

      p {
        color: #050162;
        font-size: 12px;
        font-weight: 600;
      }
    }

    .card {
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0px 0px 20px 0px rgba(44, 59, 86, 0.1);
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 174px;
      gap: 16px;
      flex: 1;

      .action-container {
        display: flex;
        gap: 8px;
        align-items: center;
        color: #050162;

        .ic_btn {
          font-size: 21px;
          cursor: pointer;
        }

        .count {
          display: flex;
          flex: 1;
          padding: 7.5px 29px 9px 29px;
          justify-content: center;
          align-items: center;
          gap: 7.5px;
          border-radius: 75px;
          border: 1.5px solid #050162;
          background: var(--Grey-Scale-grey-scale-0, #fff);
          color: #050162;
          text-align: center;
          leading-trim: both;
          text-edge: cap;
          font-family: "Suez One";
          font-size: 20px;
          font-style: normal;
          font-weight: 400;
          line-height: 21px; /* 87.5% */
        }
      }

      .title {
        color: var(--WD-Dark-Blu, #050162);
        text-align: center;
        font-family: "Suez One";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%;
      }

      .info {
        cursor: pointer;
        display: flex;
        gap: 4px;
        justify-content: center;
        align-items: center;
        color: #8c8c8c;
        font-family: Roboto;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 140.625%; /* 14.063px */
      }

      .info:hover {
        color: #004cff;
      }
    }
  }

  @media ${deviceMin.tablet} {
    padding: 20px 100px;

    .xl-3 {
      font-size: 40px;
    }

    h3 {
      font-size: 24px;
    }

    .divider {
      margin-top: 40px;
    }

    .step-container {
      flex-direction: row;
      justify-content: space-between;
      align-items: stretch;

      .step {
        flex-direction: column;
        flex: 1;

        img {
          width: 115px;
        }

        p {
          text-align: center;
          font-size: 14px;
        }
      }

      .card {
        padding: 24px;

        .title {
          font-size: 24px;
        }

        .action-container {
          .ic_btn {
            font-size: 28px;
          }

          .count {
            display: flex;
            padding: 8px 29px 8px 29px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            border-radius: 100px;
            border: 2px solid #050162;
            background: var(--Grey-Scale-grey-scale-0, #fff);
            color: #050162;
            text-align: center;
            leading-trim: both;
            text-edge: cap;
            font-family: "Suez One";
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 28px; /* 87.5% */
          }
        }
      }
    }
  }

  @media ${deviceMin.desktop} {
    padding: 40px 100px;

    h3 {
      font-size: 30px;
    }

    .divider {
      margin-top: 80px;
    }

    .step-container {
      .step {
        p {
          font-size: 16px;
        }
      }
    }
  }
`;
