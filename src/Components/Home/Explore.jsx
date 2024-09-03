import styled from "styled-components";
import bg from "../../assets/snow_bg.png";
import { deviceMin } from "../../styles/size";
import { MdArrowForward } from "react-icons/md";
import useFetch from "../../Hooks/useFetch";
import { Link } from "react-router-dom";

const Explore = () => {
  const {
    data: { book_name, image, info, subtitle, title },
  } = useFetch("/home/announcement");

  return (
    <Wrapper>
      <section className="section-center">
        <div className="container">
          <div className="img-container">
            <img src={image} alt="Cannot Fetch Image..." />
          </div>

          <div className="text-content">
            <div className="title">
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>

            <div className="subtitle">
              <p>Book: {book_name}</p>
              <p>{info}</p>
              <Link to={"/books"} className="btn">
                explore{" "}
                <span>
                  <MdArrowForward />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Explore;

const Wrapper = styled.div`
  .section-center {
    padding: 2.5rem 0;
    border-bottom: 4px solid var(--clr-dark-blue);
    position: relative;

    .container {
      box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);

      .img-container {
        height: 15rem;
        margin-top: 4rem;

        img {
          height: 100%;
        }
      }

      .text-content {
        padding: 1.5rem;
        .title {
          position: absolute;
          right: 0;
          left: 0;
          top: 0;
          margin-top: 2rem;
          * {
            color: var(--clr-dark-blue);
          }
        }

        .subtitle {
          p:nth-child(1) {
            color: var(--clr-dark-blue);
            font-weight: 700;
            font-size: 0.875rem;
            margin-bottom: 0.75rem;
          }
          p:nth-child(2) {
            max-width: 21rem;
          }
          .btn {
            display: none;
          }
        }
      }
    }

    @media ${deviceMin.tablet} {
      padding: 4rem 0;

      .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 2.5rem;
        background: url("${bg}");
        height: 19.5rem;

        .img-container {
          margin-top: 0;
          height: 19.5rem;
          img {
            height: 100%;
          }
        }

        .text-content {
          padding: 2rem 0.5rem 2rem 0;
          display: grid;
          align-content: center;
          * {
            color: white !important;
          }
          .title {
            position: static;
            margin-top: 0;
            margin-bottom: 1rem;
          }

          .subtitle {
            p: nth-child(1) {
              margin-bottom: 0;
              font-weight: 400;
              font-size: 1rem;
            }
            p: nth-child(2) {
              margin-bottom: 1.5rem;
              max-width: initial;
            }
            .btn {
              display: flex;
              background-color: white;
              width: max-content;
              color: var(--clr-dark-blue) !important;
              * {
                color: var(--clr-dark-blue) !important;
              }
            }
          }
        }
      }
    }

    @media ${deviceMin.desktop} {
      .container {
        height: 24rem;
        .img-container {
          height: 24rem;
          img {
            height: 100%;
          }
        }

        .text-content {
          .subtitle {
            p:nth-child(1) {
              font-size: 1.125rem;
            }
            p: nth-child(2) {
              margin-bottom: 2.5rem;
            }
          }
        }
      }
    }
  }
`;
