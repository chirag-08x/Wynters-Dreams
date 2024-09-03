import styled from "styled-components";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import snowBg from "../../assets/snow_bg.png";
import { deviceMin } from "../../styles/size";

const Error = () => {
  return (
    <Wrapper>
      <section className="section-center">
        <div className="container">
          <div className="inner-container">
            <h2>Page not found - 404</h2>

            <div className="info">
              <p>
                <AiFillInfoCircle /> Page not found
              </p>
              <p>
                The page you are looking for does not exist or some error has occurred. For assistance, please return to our homepage or navigate using the menu above.
              </p>
            </div>
          </div>
          <Link to={"/"} className="btn">
            <span>
              <MdArrowBack />
            </span>
            Back to Home
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  background: url(${snowBg});
  padding: 5rem 0;
  min-height: calc(100vh - 21rem);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;

  .section-center {
    .container {
      max-width: 30rem;
      margin: 0 auto;
      display: grid;
      > .btn {
        color: white;
        margin-top: 1.5rem;
        justify-self: flex-start;
      }

      .inner-container {
        background-color: white;
        padding: 3rem 2rem;

        .info {
          border: 1px solid var(--clr-dark-blue);
          padding: 0.75rem;
          color: var(--clr-dark-blue);
          p:first-child {
            display: flex;
            align-items: center;
            gap: 0 0.5rem;
            margin-bottom: 0.5rem;
          }
          p {
            font-size: 1rem;
          }
        }

        > h2 {
          color: var(--clr-dark-blue);
          margin-bottom: 1.5rem;
        }
      }
    }
  }
`;
