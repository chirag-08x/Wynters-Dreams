import styled from "styled-components";
import snowBg from "../../../assets/snow_bg.png";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { deviceMin } from "../../../styles/size";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { useUserContext } from "../../../Context/UserContext";

const ResendVertificationEmail = () => {
  const [email, setEmail] = useState("");
  const { axiosInstance } = useUserContext();

  const resendVerificationLink = async () => {
    try {
      await axiosInstance.post("/auth/resend-email", { email: email.trim() });
      toast.success("Verification Link sent. Check your mail.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email.trim())) {
      return toast.warn("Please enter a valid email.");
    }
    resendVerificationLink();
  };
  return (
    <Wrapper>
      <section className="section-center">
        <div className="container">
          <div className="inner-container">
            <h2>Resend Verification Link</h2>
            <form className="form" noValidate onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="info">
                <div className="info-icon">
                  {" "}
                  <AiFillInfoCircle />{" "}
                </div>
                <p>Enter email to receive verification link</p>
                <p className="info-text">
                  If you don't see the verification email shortly, please check
                  your spam or junk folder as it might have been filtered there.
                </p>
              </div>

              <button className="btn">
                Submit{" "}
                <span>
                  <MdArrowForward />
                </span>{" "}
              </button>
            </form>
          </div>
          <Link to={"/login"} className="btn">
            <span>
              <MdArrowBack />
            </span>
            Back to Login
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

export default ResendVertificationEmail;

const Wrapper = styled.div`
  background: url(${snowBg});
  padding: 5rem 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: grid;
  place-items: center;

  .section-center {
    .container {
      max-width: 31rem;
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

        > h2 {
          color: var(--clr-dark-blue);
          margin-bottom: 1.5rem;
        }

        .form {
          .form-field {
            display: grid;
            gap: 0.5rem 0;

            label {
              color: var(--clr-dark-blue);
            }

            input {
              font-size: 1rem;
              padding: 0.5rem 1rem;
              border: none;
              background: var(--clr-grey-light);
            }
          }

          button {
            background: var(--clr-yellow);
            color: white;
            justify-self: flex-start;
          }

          display: grid;
          gap: 1.5rem 0;

          .info {
            border: 1px solid var(--clr-dark-blue);
            border-radius: 0.125rem;
            color: var(--clr-dark-blue);
            padding: 1rem;

            .info-icon {
              * {
                font-size: 1.5rem;
              }
            }

            .info-text {
              font-size: 0.75rem;
            }
          }
        }
      }
    }

    @media ${deviceMin.tablet} {
      .container {
        .inner-container {
          .form {
            .info {
              .info-text {
                font-size: 0.875rem;
              }
            }
          }
        }
      }
    }
  }
`;
