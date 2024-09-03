import styled from "styled-components";
import { useAppContext } from "../../Context/AppContext";
import { deviceMin } from "../../styles/size";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const Featured = (props) => {
  const {
    state: {
      bestSellers: { error, loading, data },
    },
  } = useAppContext();

  return (
    <Wrapper>
      <section className="section-center">
        <div className="text-content">
          <h2>{props.title ? props.title : "Our Recommendations"}</h2>
          <p>Time-Tested Favorites for Young Readers</p>
        </div>

        <div className="best-sellers">
          {data &&
            data.length > 0 &&
            data.map(({ id, name, cover_image }, index) => {
              return (
                <div key={`${index + 1}`} className="single-book">
                  <div className="img-container">
                    <img src={cover_image} alt="" />
                  </div>

                  <div className="book-info">
                    <p className="p-bold">{name}</p>
                    <Link to={`/book/${id}`} className="btn">
                      Explore{" "}
                      <span>
                        <MdArrowForward />
                      </span>{" "}
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </Wrapper>
  );
};

export default Featured;

const Wrapper = styled.div`
  padding: 3rem 0;

  .section-center {
    .text-content {
      color: var(--clr-dark-blue);
    }

    .best-sellers {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 1rem;
      padding: 1rem 0;

      .single-book {
        .img-container {
          height: 9rem;
          img {
            box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);
            height: 100%;
          }
        }

        .book-info {
          padding: 0.25rem 0;
          p {
            color: var(--clr-dark-blue);
            margin: 0.5rem 0;
          }

          .btn {
            background-color: var(--clr-dark-blue);
            color: white;
            width: 100%;
          }
        }
      }

      .single-book:first-child {
        display: none;
      }

      @media ${deviceMin.tablet} {
        .single-book {
          .img-container {
            height: 18.75rem;
          }
          .book-info {
            .btn {
              width: max-content;
            }
          }
        }
      }
      @media ${deviceMin.desktop} {
        .single-book {
          .img-container {
            height: 23rem;
          }
        }
        grid-template-columns: 1fr 1fr 1fr;
        .single-book:first-child {
          display: block;
        }
      }
    }
  }
`;
