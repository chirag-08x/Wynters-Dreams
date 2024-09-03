import styled from "styled-components";
import snowBg from "../../../assets/snow_bg.png";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { deviceMin } from "../../../styles/size";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import validator from "validator";
import { useUserContext } from "../../../Context/UserContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { axiosInstance } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = searchParams.get("token");
    if (!token) {
      toast.warn("Empty token. Please try again later.");
      navigate("/login");
      return;
    }
    if (!email || !validator.isEmail(email)) {
      return toast.warn("Please enter valid Email address.");
    }
    if (!newPassword || !confirmPassword) {
      return toast.warn("Please enter new password and confirm password.");
    }
    if (newPassword !== confirmPassword) {
      return toast.warn("Password and confirm password does not match.");
    }
    try {
      await axiosInstance.post(
        "/auth/change-password",
        {
          email,
          new_password: newPassword,
        }
        // , {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // }
      );
      toast.success("Password changed successfully. Please login.");
      navigate("/login");
    } catch (error) {
      toast.warn("Invalid token.Please try again later.");
      navigate("/login");
    }
  };
  return (
    <Wrapper>
      <section className="section-center">
        <div className="container">
          <div className="inner-container">
            <h2>Reset Your Password</h2>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Confirm New Password</label>
                <input
                  type="password"
                  id="confirm-new-password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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

export default ResetPassword;

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
