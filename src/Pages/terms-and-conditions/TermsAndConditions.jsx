import { terms } from "../../helpers/terms";
import { v4 as uid } from "uuid";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { deviceMin } from "../../styles/size";

const TermsAndConditions = () => {
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
          {terms.map(({ title, points }) => {
            return (
              <div key={uid()} className="points">
                <h2 className="title">{title}</h2>
                <div className="single-point">
                  {points.map(({ header, text }, idx) => {
                    return (
                      <div key={uid()}>
                        <p className="header p-xs">
                          {idx + 1}. {header}
                        </p>

                        {text.length > 1 ? (
                          <ol
                            type="a"
                            style={{ listStylePosition: "inside" }}
                            className="p-xs"
                          >
                            {text.map(({ subtext }) => {
                              return <li key={uid()}>{subtext}</li>;
                            })}
                          </ol>
                        ) : (
                          <ul style={{ listStyle: "none" }} className="p-xs">
                            <li>{text[0].subtext}</li>
                          </ul>
                        )}
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

export default TermsAndConditions;

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
        }
      }
    }

    @media ${deviceMin.tablet} {
      .container {
        padding: 2rem 4rem;

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
