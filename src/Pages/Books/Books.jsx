import styled from "styled-components";
import { useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { deviceMin } from "../../styles/size";
import { Link, useRoutes, useNavigate, useLocation } from "react-router-dom";
import useData from "../../Context/DataContext";
import { useUserContext } from "../../Context/UserContext";

const Books = () => {
  const [formValues, setFormValues] = useState({
    currency: "",
  });

  const { axiosInstance } = useUserContext();

  const { books, setBooks } = useData();
  // const { data, loading } = useFetch("/book/all");
  // const navigate = useNavigate();

  useEffect(() => {
    if (!books) {
      (async () => {
        try {
          const { data: booksData } = await axiosInstance.get("/book/all");
          setBooks(booksData);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ [name]: value });
  };

  return (
    <Wrapper>
      <section className="section-center">
        <div className="text-content">
          {/* <div>
            <h1>Book Bundles</h1>
            <p>Our shelves are stacked with the latest bundle of books.</p>
          </div> */}

          <form className="form">
            <div className="form-field">
              <label htmlFor="currency">Preferred Currency</label>
              <select
                name="currency"
                id="currency"
                value={formValues.currency}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Choose Preferred Currency </option>
                <option value="rupees">INR (&#x20B9;)</option>
                <option value="dollars">USD (&#x0024;)</option>
                <option value="dirhams">AED (&#x62f;&#x2e;&#x625;)</option>
                <option value="pounds">EUR (&euro;)</option>
              </select>
            </div>
          </form>
        </div>

        <div className="books">
          {/* <div className="bundles">
            <h3>Bundles will come over here</h3>
          </div> */}

          <div className="book-list">
            <div className="text-container">
              <h1>Personalised Books</h1>
              <p>
                Look what just arrived! The latest personalised books to land on
                our bookshelves.
              </p>
            </div>

            <div className="books-container">
              {books &&
                books.length > 0 &&
                books.map(({ id, name, cover_image }) => {
                  return (
                    <div key={id} className="single-book">
                      <div className="img-container">
                        <img src={cover_image} alt={name} />
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
                })}
            </div>
          </div>
        </div>
        <Link to={"/"} className="btn bth">
          <span>
            {" "}
            <MdArrowBack />{" "}
          </span>
          Back to Home
        </Link>
      </section>
    </Wrapper>
  );
};

export default Books;

export const Wrapper = styled.div`
  padding: 3rem 0;

  .bth {
    width: max-content;
    margin-top: 2rem;
    padding: 0;
    color: var(--clr-dark-blue);
  }

  .text-content {
    display: flex;
    flex-direction: column-reverse;
    color: var(--clr-dark-blue);

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem 0;
      margin-bottom: 1rem;

      .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.3rem 0;

        select {
          padding: 0.45rem 0.5rem;
          border: none;
          background: var(--clr-grey-light);
          color: rgba(5, 1, 98, 0.5);
        }

        input {
          padding: 0.45rem 0.8rem;
          background: var(--clr-grey-light);
          border: none;
        }
      }
    }
  }

  .books {
    .text-container {
      color: var(--clr-dark-blue);
    }
    .book-list {
      margin-top: 2rem;
    }
    .books-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-content: center;
      align-items: stretch;
      gap: 1.5rem 1rem;
      margin-top: 1rem;
      .single-book {
        .p-bold {
          color: var(--clr-dark-blue);
        }
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .book-info {
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          justify-content: space-between;
          height: 100%;
          .btn {
            color: white;
            background: var(--clr-dark-blue);
          }
        }
      }

      .single-book .img-container {
        box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);

        height: 9rem;
        img {
          height: 100%;
        }
      }

      @media ${deviceMin.tablet} {
        .single-book {
          border: 1px solid #d6e8fd;

          .book-info {
            padding: 1.5rem;
            gap: 1rem;
          }

          .btn {
            align-self: flex-start;
          }

          .img-container {
            height: 13.875rem;
          }
        }
      }

      @media ${deviceMin.desktop} {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
`;
