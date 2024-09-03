import { useUserContext } from "../../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { deviceMin } from "../../styles/size";
import useFetch from "../../Hooks/useFetch";
import snowBg from "../../assets/snow_bg.png";
import Cookies from "js-cookie";
import useData from "../../Context/DataContext";
import GiftCard from "./GiftCard";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Card, Modal } from "antd";
import CustomModal from "../../helpers/CustomModal";
// import  {render} from "react-dom"

const UserDashboard = () => {
  const targetRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);

  const [showVouchers, setShowVouchers] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [cancellingSubscription, setCancellingSubscription] = useState(false);
  const [renewingSubscription, setRenewingSubscription] = useState(false);

  const navigate = useNavigate();

  const {
    state: { user },
    logoutUser,
    axiosInstance,
  } = useUserContext();
  const {
    data: { image, subtitle, title },
  } = useFetch("/home/announcement");

  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [showOfferBanner, setShowOfferBanner] = useState(false);
  const { vouchers, setVouchers } = useData();

  useEffect(() => {
    const getPurchasedBooks = async () => {
      try {
        const authToken = Cookies.get("authToken");
        const { data } = await axiosInstance.get("/book/library", {
          // headers: {
          //   Authorization: `Bearer ${authToken}`,
          // },
        });
        setPurchasedBooks(data);
      } catch (error) {}
    };

    getPurchasedBooks();
  }, []);

  useEffect(() => {
    const getPurchasedVouchers = async () => {
      try {
        const authToken = Cookies.get("authToken");
        const { data } = await axiosInstance.get("/gift-voucher", {
          // headers: {
          //   Authorization: `Bearer ${authToken}`,
          // },
        });
        setVouchers(data);
      } catch (error) {}
    };

    getPurchasedVouchers();
  }, []);

  useEffect(() => {
    if (!user) {
      toast.warn("Please Login First");
      navigate("/");
    }
  }, []);

  const reactToPrintContent = useCallback(() => {
    return targetRef.current;
  }, [targetRef.current]);

  const handleOnBeforeGetContent = useCallback(() => {
    setDownloading(true);
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setTimeout(() => {
        setDownloading(false);
        resolve();
      }, 100);
    });
  }, []);

  const handleAfterPrint = () => {
    // setVoucher(null);
  };

  const handlePrintHook = useReactToPrint({
    content: reactToPrintContent,
    onBeforeGetContent: handleOnBeforeGetContent,
    // onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  const handlePrint = (e, v) => {
    setVoucher(v);
    handlePrintHook(e);
  };

  const toggleShowVouchers = () => setShowVouchers((prev) => !prev);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/edit-profile");
  };

  const giftVouchers = useMemo(() => {
    return (
      vouchers?.filter((v) => {
        return !v.redeemed && v.createdBy == user.email;
      }) || []
    );
  }, [user, vouchers]);

  const subscriptionRenewDate = useMemo(() => {
    if (user?.subscription && user.subscription.renewOn) {
      const date = new Date(user.subscription.renewOn * 1000);
      return date.toLocaleDateString();
    }
    return null;
  }, [user?.subscription]);

  const expiresAt = useMemo(() => {
    if (user?.subscription && user.subscription.expiredAt) {
      return new Date(user.subscription.expiredAt * 1000).toLocaleDateString();
    }
    return null;
  }, [user?.subscription]);

  const cancelSubscription = async () => {
    toast.warning(
      "Processing your request to cancel the subscription please stay on the page."
    );
    setCancellingSubscription(true);
    try {
      await axiosInstance.get("/subscription/cancel");
      toast.success(
        "Your subscription has been successfully canceled. You will be logged out shortly."
      );
      setTimeout(logoutUser, 5000);
    } catch (error) {
      toast.error("Something went wrong while canceling subscription");
    }
    setCancellingSubscription(false);
  };

  const renewSubscription = async () => {
    setRenewingSubscription(true);
    try {
      const { data } = await axiosInstance.post("/subscription/renew");
      const paymentObject = new window.Razorpay({
        ...data,
        image: "logo192.png",
        handler: function () {
          toast.success("You have successfully renewed your subscription.");
          setTimeout(logoutUser, 5000);
        },
      });
      paymentObject.open();
    } catch (error) {
      toast.error(
        "Something went wrong while renewing subscription, please try again after sometime."
      );
    }
    setRenewingSubscription(false);
  };

  const cancelSubscriptionHandler = async () => {
    setShowOfferBanner(true);
  };

  return (
    <>
      <Wrapper>
        <section className="announcement">
          <div className="announce-wrapper">
            <div className="img-container">
              <img src={image} alt="" />
            </div>

            <div className="announcement-text">
              <h3>{title}</h3>
              <p>{subtitle}</p>
              <Link to={"/books"} className="btn">
                Explore{" "}
                <span>
                  <MdArrowForward />
                </span>
              </Link>
            </div>
            {user?.subscription && (
              <div className="subscription-box">
                <h2>Subscription </h2>
                <div>
                  {subscriptionRenewDate ? (
                    <a>Renew on {subscriptionRenewDate}</a>
                  ) : (
                    <a>Expires at {expiresAt}</a>
                  )}
                </div>
                <a
                  onClick={cancelSubscriptionHandler}
                  className="underline-button"
                >
                  Cancel Subscription
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="wrapper">
          <div className="user-info">
            <div className="text-info">
              <h3>Hello {user.name},</h3>
              <p>
                Here’s where you’ll find all the important stuff. See child’s
                name, gender and discover new releases.
              </p>
            </div>

            <form className="form">
              <div className="form-field">
                <label htmlFor="mail">Registered Email</label>
                <input
                  type="email"
                  value={user.email}
                  placeholder="Email"
                  id="mail"
                  readOnly
                />
              </div>
              <div className="form-field">
                <label htmlFor="child-name">Child's Name</label>
                <input
                  type="text"
                  value={user.name}
                  placeholder="Child's name"
                  id="child-name"
                  readOnly
                />
              </div>
              <div className="form-field">
                <label htmlFor="gender">Child's Gender</label>
                <input
                  type="text"
                  value={user.gender.toLowerCase() === "m" ? "Male" : "Female"}
                  placeholder="Gender"
                  id="gender"
                  readOnly
                />
              </div>

              <div className="info info-1">
                <p>
                  <AiFillInfoCircle /> About name and Gender
                </p>
                <p>
                  The first name registered with your account will reflect
                  across all the books purchased.
                </p>
              </div>

              <div className="info">
                <p>
                  <AiFillInfoCircle /> About name Change
                </p>
                <p>
                  The name does not change if the gender specified for your
                  child does not correspond to the character in the story.
                </p>
              </div>

              <button className="btn" onClick={handleClick}>
                Edit Profile
              </button>
            </form>

            <div className="books">
              <h3 style={{ cursor: "pointer" }} onClick={toggleShowVouchers}>
                Your Gift Vouchers
              </h3>

              {(giftVouchers.length ?? 0) == 0 ? (
                <div className="no-data">
                  There are no gift vouchers purchased under this email address.
                  <a href="/gifting">Generate your first gift voucher.</a>
                </div>
              ) : (
                <div className="purchased-vouchers">
                  {giftVouchers.map((v) => (
                    <div className="voucher" key={v.id}>
                      <img src="/images/user-dashboard/gift.png" alt={v.id} />
                      <div className="details-container">
                        <div>
                          <div>Voucher Code: {v.code}</div>
                          <div>Number of books: {v.numberOfBooks}</div>
                        </div>
                        <button
                          onClick={(e) => handlePrint(e, v)}
                          className="yellow-btn"
                          // disabled={voucher?.code == v.code}
                        >
                          {"Download"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="books">
              <h3>Your Books</h3>

              <div className="purchased-books">
                {purchasedBooks && purchasedBooks.length > 0 ? (
                  purchasedBooks.map(({ id, name, cover_image }) => {
                    return (
                      <div key={id}>
                        <div className="img-container">
                          <img src={cover_image} alt="" />
                        </div>

                        <div className="book-info">
                          <p className="p-bold">{name}</p>
                          <Link to={`/book/${id}`} className="btn">
                            Explore{" "}
                            <span>
                              <MdArrowForward />
                            </span>
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h4>You have no purchases as of now.</h4>
                )}
              </div>

              <Link to={"/"} className="btn bth">
                <span>
                  <MdArrowBack />{" "}
                </span>
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </Wrapper>
      {downloading && <GiftCard ref={targetRef} voucher={voucher} />}
      <CustomModal
        open={showOfferBanner}
        onCancel={() => setShowOfferBanner((prev) => !prev)}
      >
        <OfferContainer>
          <img alt="offer.png" src="/images/subscription/offer/index.png" />
          <div
            style={{
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
              color: "var(--clr-dark-blue)",
              gap: "1.2rem",
            }}
            className="main-content"
          >
            <h3>
              We’re sorry
              <br /> to see you go
            </h3>
            <p style={{ fontSize: "16px" }}>
              Here’s&nbsp;<span style={{ fontWeight: "bold" }}>50% off</span>
              &nbsp;on your next yearly subscription, in case you change your
              mind!
            </p>
            <button
              style={{ maxWidth: "200px", fontSize: "14px" }}
              onClick={renewSubscription}
              disabled={renewingSubscription || cancellingSubscription}
              className="btn btn-dark"
            >
              {renewingSubscription ? "Loading..." : " Claim 50% off"}
            </button>
            <button
              style={{
                maxWidth: "200px",
                fontSize: "14px",
                // marginBottom: "2rem",
                // marginTop: "2rem",
              }}
              disabled={cancellingSubscription || renewingSubscription}
              onClick={cancelSubscription}
              className="btn btn-dark-outline"
            >
              {cancellingSubscription ? "Loading..." : "Unsubscribe"}
            </button>
          </div>
        </OfferContainer>
      </CustomModal>
    </>
  );
};

export default UserDashboard;

const Wrapper = styled.div`
  .announcement {
    display: none;
    background: url(${snowBg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .subscription-box {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 12px;
    background-color: #fff;
    color: var(--clr-dark-blue);

    h2 {
      margin-bottom: 1rem;
    }

    .underline-button {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .wrapper {
    padding: 3rem 0;
    .user-info {
      width: 90%;
      max-width: 42rem;
      margin: 0 auto;
      .text-info {
        margin-bottom: 2.5rem;
        color: var(--clr-dark-blue);
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 1rem 0;
        margin-bottom: 1rem;
        width: 100%;
        max-width: 28rem;

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem 0;

          input {
            padding: 0.45rem 0.8rem;
            background: var(--clr-grey-light);
            border: none;
            color: var(--clr-dark-blue);
          }

          label {
            color: var(--clr-dark-blue);
          }
        }

        .btn {
          color: var(--clr-dark-blue);
          border: 1px solid var(--clr-dark-blue);
          align-self: flex-start;
          margin-top: 0.5rem;
        }

        .info-1 {
          margin-top: 1rem;
        }

        .info {
          border: 1px solid var(--clr-dark-blue);
          padding: 0.75rem;
          color: var(--clr-dark-blue);
          p:first-child {
            display: flex;
            align-items: center;
            gap: 0 0.5rem;
            margin-bottom: 0.2rem;
          }
          p {
            font-size: 0.75rem;
          }
        }
      }
    }

    .books {
      margin-top: 2.5rem;
      color: var(--clr-dark-blue);

      .purchased-vouchers {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 23.147px;
        margin-top: 23px;

        .voucher {
          display: flex;
          padding: 10px;
          align-items: center;
          gap: 24px;
          align-self: stretch;
          border-radius: 8px;
          border: 1px dashed #050162;
          background: var(--Grey-Scale-grey-scale-0, #fff);
          box-shadow: 0px 0px 9.7px 3px rgba(5, 1, 98, 0.1);
          max-width: 432px;

          .details-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }

          img {
            width: 112px;
            height: 112px;
            flex-shrink: 0;
            /* margin-left: 28px;
            margin-right: 28px; */
          }
        }
      }

      .purchased-books {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        > div {
          box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);
          display: grid;
          align-content: space-between;
        }

        .book-info {
          margin-top: 1rem;
          display: grid;
          gap: 0.5rem;
          padding: 1.5rem;
          .btn {
            background: var(--clr-dark-blue);
            color: white;
          }
        }

        .img-container {
          height: 9rem;
          img {
            height: 100%;
          }
        }
      }

      .no-data {
        margin-top: 24px;
        color: var(--WD-Dark-Blu, #050162);
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 140.625%;

        a {
          color: var(--WD-Dark-Blu, #050162);
          font-family: Roboto;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 140.625%;
          text-decoration-line: underline;
        }
      }

      .bth {
        padding: 0;
        margin-top: 1rem;
        color: var(--clr-dark-blue);
        width: max-content;
      }
    }
  }

  @media ${deviceMin.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 3rem;

    .announcement {
      display: block;
      .announce-wrapper {
        width: 90%;
        max-width: 25rem;
        padding: 3rem 0;
        margin: 0 auto;

        .announcement-text {
          background-color: white;
          padding: 1rem;
          color: var(--clr-dark-blue);
          display: grid;
          gap: 0.5rem 0;
          .btn {
            background-color: var(--clr-yellow);
            color: white;
            justify-self: start;
          }
        }
      }
      .img-container {
        height: 25rem;
        img {
          height: 100%;
        }
      }
    }

    .wrapper {
      .user-info {
        margin: 0 0;
        .form {
          .info {
            > p {
              font-size: 1rem;
            }
          }
        }
      }

      .books {
        .purchased-books {
          .book-info {
            .btn {
              justify-self: start;
            }
          }

          .img-container {
            height: 10rem;
          }
          .p-bold {
            font-size: 1rem;
          }
        }
      }
    }
  }

  @media ${deviceMin.desktop} {
    grid-template-columns: 1fr 2fr;

    .purchased-vouchers {
      .voucher {
        padding: 20px;

        img {
          width: 145px;
          height: 145px;
          margin-left: 23px;
          margin-right: 23px;
        }
      }
    }
  }
`;

const OfferContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 90vw;

  img {
    border-top-right-radius: 1.6rem;
    border-top-left-radius: 1.6rem;

    height: 45vh;

    /* max-height: 40vh; */
    /* height: 50%; */
    /* width: 100%; */
  }

  .main-content {
    overflow-y: auto;
    height: 45vh;
    /* margin: 1rem 0; */
  }

  @media ${deviceMin.tablet} {
    width: 70vw;
    /* height: 0vh; */
    /* min-height: 40vh; */

    img {
      object-fit: cover;
      object-position: 0 0;
    }

    .main-content {
      /* height: 100%; */
      /* padding-top: 4rem; */
      /* padding-bottom: 4rem; */
    }
  }
  @media ${deviceMin.desktop} {
    width: 50vw;
    height: 60vh;
    display: flex;
    flex-direction: row;
    min-height: 411px;

    .main-content {
      width: 25vw;
      height: 60vh;
      min-height: 411px;
      /* width: 50%; */
    }

    img {
      width: 25vw;
      height: 60vh;
      min-height: 411px;
      border-top-right-radius: 0px;
      border-top-left-radius: 1.6rem;
      border-bottom-right-radius: 0rem;
      border-bottom-left-radius: 1.6rem;
    }
  }
`;
