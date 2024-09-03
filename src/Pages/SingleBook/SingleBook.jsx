import React, { useState, useEffect } from "react";
import { Featured } from "../../Components";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { formatPrice } from "../../helpers/priceFormat";
import { deviceMin } from "../../styles/size";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserContext } from "../../Context/UserContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/Common/Loading";
import useData from "../../Context/DataContext";

const SingleBook = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  const {
    state: { user },
    setCart,
    axiosInstance,
  } = useUserContext();
  const navigate = useNavigate();

  const { addBookDetails, bookDetails } = useData();

  useEffect(() => {
    const fetchBook = async () => {
      // const authToken = Cookies.get("authToken");
      const { data: bookData } = await axiosInstance.get(`/book/${id}`);
      setData(bookData);
      addBookDetails(id, bookData);
    };

    if (!bookDetails[id]) {
      fetchBook();
    } else {
      setData(bookDetails[id]);
    }
  }, [id, bookDetails]);

  const handleClick = async () => {
    if (!user) {
      toast.warn("Please Login First.");
      return navigate("/login");
    }
    if (data.current_price === 0 || data.purchased) {
      return navigate(`/view-book/${id}`);
    } else {
      setAddingToCart(true);
      try {
        if (user?.cart?.find((item) => item.id === data.id)) {
          return navigate("/cart");
        }
        let newCart = user.cart;
        let res = await axiosInstance.post("/cart", { book_id: id });
        newCart.push(data);
        setCart(newCart);
        toast.success("Added to Cart");
        // navigate(`/payment/${id}`);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setAddingToCart(false);
      }
    }
  };

  return (
    <Wrapper>
      {data && typeof data === "object" && (
        <section className="section-center">
          <div className="img-container">
            <img src={data.cover_image} alt="" />
          </div>

          <div className="text-content">
            <h1>{data.name}</h1>
            <div className="book-text">
              <p>{data.description}</p>
            </div>
            <div>
              {!user.subscription && (
                <img
                  style={{ width: "200px" }}
                  alt="offer-badge"
                  src="/images/subscription/offer-badge.png"
                />
              )}
            </div>
            {!user.subscription && !data.purchased ? (
              <div className="book-info">
                {data.price !== data.current_price && (
                  <h4
                    h4
                    style={{ color: "#F33", textDecoration: "line-through" }}
                  >
                    {formatPrice(data.price)} INR
                  </h4>
                )}
                <h4>{formatPrice(data.current_price)} INR</h4>
                <h4>Chapters : {data.chapters}</h4>
              </div>
            ) : (
              <div className="book-info">
                <h4>Chapters : {data.chapters}</h4>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {data.current_price === 0 || data.purchased ? (
                <button
                  style={{ flex: 1 }}
                  onClick={handleClick}
                  className="btn"
                >
                  Start Reading
                  <span>
                    <MdArrowForward />
                  </span>{" "}
                </button>
              ) : (
                <button
                  style={{ flex: 1 }}
                  onClick={handleClick}
                  className="btn"
                >
                  {user?.cart?.find((item) => item.id === data.id)
                    ? "Go to Cart"
                    : "Add to Cart"}
                  {addingToCart && (
                    <LoadingSpinner width={20} height={20} color="white" />
                  )}
                  <span>
                    <MdArrowForward />
                  </span>{" "}
                </button>
              )}
              {user && !user.subscription && (
                <button
                  style={{ flex: 1 }}
                  onClick={() => {
                    navigate("/subscription");
                  }}
                  className="btn btn-dark"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </section>
      )}
      <Featured title="Best Sellers" />
    </Wrapper>
  );
};

export default SingleBook;

const Wrapper = styled.div`
  > .btn {
    width: max-content;
  }
  > .section-center {
    padding-top: 3rem;
    display: grid;

    .img-container {
      height: 12.5rem;
      border-radius: 0.125rem;
      img {
        height: 100%;
        border-radius: 0.125rem;
      }
    }

    .text-content {
      padding-top: 2rem;
      display: grid;
      gap: 1rem;

      h1 {
        color: var(--clr-dark-blue);
      }

      .book-text {
        color: #333;
      }

      .book-info {
        display: flex;
        align-items: center;
        gap: 0 1.5rem;
        color: var(--clr-dark-blue);
      }

      .btn {
        background: var(--clr-orange);
        margin-top: 0.5rem;
        color: white;
      }
      .btn-dark {
        color: #fff;
        background-color: var(--clr-dark-blue);
        border: 0px solid var(--clr-dark-blue);
      }
    }

    @media ${deviceMin.tablet} {
      grid-template-columns: 1fr 1fr;
      gap: 0 2rem;
      align-items: center;

      .img-container {
        height: 24.875rem;
      }
    }

    @media ${deviceMin.desktop} {
      gap: 0 4rem;
    }
  }

  > div {
    .section-center {
      .text-content {
        p {
          display: none;
        }
      }

      .best-sellers {
        .single-book {
          border: 2px solid var(--clr-blue-light);
          .book-info {
            padding: 1.5rem;
          }
        }
      }

      @media ${deviceMin.tablet} {
        .best-sellers {
          .single-book {
            .img-container {
              height: 13.875rem;
              img {
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
`;
