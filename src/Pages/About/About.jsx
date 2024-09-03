import styled from "styled-components";
import about from "../../helpers/about";
import { Link } from "react-router-dom";
import { v4 as uid } from "uuid";
import { deviceMin } from "../../styles/size";
import { MdArrowBack } from "react-icons/md";

const About = () => {
  return (
    <Wrapper>
      <section className="section-center">
        <Link to={"/"} className="btn">
          <span>
            <MdArrowBack />
          </span>{" "}
          Back to Home
        </Link>

        <div className="container">
          {about.map(({ title, points }, index) => {
            return (
              <div key={`${index + 1}`} className="points">
                <h2 className="title">{title}</h2>
                <div className="single-point">
                  {points.map(({ header, text }, j) => {
                    return (
                      <div className="about-text" key={`${index}-${j + 1}`}>
                        <p>
                          {header && <span>{header}: </span>} {text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <Link to={"/"} className="btn">
          <span>
            <MdArrowBack />
          </span>{" "}
          Back to Home
        </Link>
      </section>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  padding: 3rem 0;

  .section-center {
    .btn {
      width: max-content;
      color: var(--clr-dark-blue);
    }

    .container {
      background-color: white;
      box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);
      padding: 2rem 1rem;

      .points {
        .title {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          color: var(--clr-dark-blue);
        }

        .header {
          font-weight: 700;
        }

        .single-point {
          display: grid;
          gap: 1rem 0;
          margin-bottom: 2rem;

          .about-text {
            p {
              span {
                font-weight: 700;
              }
            }
          }
        }
      }
    }

    @media ${deviceMin.tablet} {
      .container {
        padding: 3rem 4rem;

        .points {
          .title {
            font-size: 2rem;
          }
        }
      }
    }

    @media ${deviceMin.desktop} {
      .container {
        .points {
          .title {
            font-size: 2.25rem;
          }
        }
      }
    }
  }
`;
