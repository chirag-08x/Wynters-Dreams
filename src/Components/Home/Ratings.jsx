import styled, { keyframes } from "styled-components";
import useFetch from "../../Hooks/useFetch";
import { deviceMin } from "../../styles/size";
import { FaStar } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import { v4 as uid } from "uuid";

const Ratings = () => {
  const { loading, data, error } = useFetch("/home/testimonials");

  return (
    <Wrapper>
      <section className="section-center">
        <div className="text-content">
          <h2>Our Happy Readers</h2>
        </div>
      </section>
      <div className="testimonial-container">
        {data && data.length > 0 && (
          <Marquee
            className="t-con"
            pauseOnHover={true}
            direction="right"
            speed={60}
          >
            {data.map(({ stars, name, testimonial }, index) => {
              return (
                <div key={`${index + 1}`} className="single-testimonial">
                  <div className="ratings">
                    {[...Array(5)].map((item, idx) => {
                      return (
                        <span key={`${index}-${idx + 1}`}>
                          <FaStar
                            style={{
                              color:
                                idx < stars ? "var(--clr-yellow)" : "lightgrey",
                            }}
                          />
                        </span>
                      );
                    })}
                  </div>

                  <div className="text">
                    <p className="feedback">"{testimonial}"</p>
                    <p className="user p-bold">{name}</p>
                  </div>
                </div>
              );
            })}
          </Marquee>
        )}
      </div>
    </Wrapper>
  );
};

export default Ratings;

const Wrapper = styled.div`
  background: linear-gradient(180deg, #05319a, #4fc0eb, #35a0e3);
  padding: 3rem 0;

  .text-content {
    margin-bottom: 1.5rem;
    color: white;
    margin: auto;
    width: 100%;
    text-align: center;
  }

  .testimonial-container {
    margin-top: 2.5rem;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgb(0, 0, 0) 10%,
      rgb(0, 0, 0) 90%,
      rgba(0, 0, 0, 0) 100%
    );
    .t-con {
      gap: 1rem;
      div:first-child {
        gap: 1rem;
        .rfm-initial-child-container {
          .rfm-child {
            width: 30rem;
            > div {
              padding: 1.5rem;
            }
          }
        }
      }
      div:nth-child(2) {
        gap: 1rem;

        .rfm-child {
          width: 30rem;
          > div {
            padding: 1.5rem;
          }
        }
      }
    }

    .single-testimonial {
      background-color: white;
      height: 300px;
      .ratings {
        margin-bottom: 1rem;
        display: flex;
        gap: 0 0.5rem;
        font-size: 1.4rem;
      }

      .feedback {
        margin-bottom: 1rem;
      }

      .user {
        color: var(--clr-dark-blue);
      }

      .user {
        @media ${deviceMin.tablet} {
          font-size: 1rem;
        }
      }
    }
  }
`;
