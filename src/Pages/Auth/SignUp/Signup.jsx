import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { deviceMin } from "../../../styles/size";
import snowBg from "../../../assets/snow_bg.png";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import Modal from "../../../Components/Modal/Modal";
import { AiFillInfoCircle } from "react-icons/ai";
import { useUserContext } from "../../../Context/UserContext";
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { baseURL } from "../../../api/api";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    fname: "",
    gender: "",
    currency: "",
    phone: "",
    email: "",
    password: "",
    checked: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // show pass
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const {
    state: { user },
    axiosInstance,
  } = useUserContext();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const registerUser = async (values) => {
    try {
      await axios.post(`${baseURL}/auth/sign-up`, values);
      setIsModalOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fname, gender, currency, phone, email, password, checked } =
      formValues;
    let adjustedPhone = phone.trim().replaceAll(" ", "");
    if (adjustedPhone[0] !== "+") adjustedPhone = "+" + adjustedPhone;
    if (!validator.isAlpha(fname.trim())) {
      return toast.warn("Please enter a valid name.");
    }
    if (gender === "") {
      return toast.warn("Please select a valid gender.");
    }
    if (currency === "") {
      return toast.warn("Please select a valid currency.");
    }
    if (!validator.matches(adjustedPhone, /^\+(?:[0-9] ?){6,14}[0-9]$/)) {
      return toast.warn("Please select a valid phone Number.");
    }
    if (!validator.isEmail(email.trim())) {
      return toast.warn("Please select a valid phone Eamil.");
    }
    if (!validator.isStrongPassword(password)) {
      toast.warn("Please enter a valid Password.");
      return toast.warn(
        "Password should have minimum 1 lowercase, 1 Uppercase, 1 digit and 1 special character."
      );
    }
    if (!checked) {
      return toast.warn("Please agree to terms and conditions.");
    }
    const finalData = {
      name: fname.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      gender: gender,
      currency: currency,
      phone: adjustedPhone,
      password,
    };
    registerUser(finalData);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <Wrapper>
      <Modal
        className="modal-content"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      >
        <ModalWrapper>
          <h3>Verify Email to Login</h3>

          <div className="info-box">
            <p>Didn't receive verification email ?</p>
            <ul>
              <li className="p-xs">Check you spam folder.</li>
              <li className="p-xs">
                Click{" "}
                <Link className="resend-btn" to={"/resend-verification-email"}>
                  here
                </Link>{" "}
                to resend the verification email.
              </li>
            </ul>
          </div>
          <div className="info-box">
            <p className="p-xs">
              By verifying your email, you'll gain access to your account and
              login to start the adventure!
            </p>
          </div>
          <p>Note: You won't be able to log in until your email is verified.</p>
        </ModalWrapper>
      </Modal>
      <section className="section-center">
        <div className="text-content">
          <h2>Ready to embark on an extraordinary reading adventure?</h2>
          <p>
            We're not just another eBook company – we're your child's gateway to
            an extraordinary literary journey of wonder and imagination!
          </p>
          <Link className="btn" to={"/"}>
            <span>
              <MdArrowBack />
            </span>
            Back to Home
          </Link>
        </div>

        <div className="form-container">
          <div className="text">
            <p>
              Already a Member?{" "}
              <Link to={"/login"} style={{ color: "var(--clr-blue)" }}>
                Login
              </Link>
            </p>
            <h1>Sign up !</h1>
            {/* <button className="btn">
              <FcGoogle /> Continue with Google
            </button>

            <div className="separator">
              <div></div>
              <p>or</p>
              <div></div>
            </div> */}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="child-name">Child's First Name</label>
              <input
                type="text"
                id="child-name"
                placeholder="First Name"
                name="fname"
                required
                value={formValues.fname}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                value={formValues.gender}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Choose Gender</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>

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

            <div className="form-field">
              <label htmlFor="ph-number">
                Phone Number(country code is compulsory, e.g. +91xxxxxxxxxx)
              </label>
              <input
                type="text"
                id="ph-number"
                placeholder="+91 9747xxxxxx"
                required
                value={formValues.phone}
                name="phone"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={formValues.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-field password">
              <label htmlFor="password">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                required
                value={formValues.password}
                onChange={(e) => handleChange(e)}
              />
              {showPass ? (
                <FaEye className="icon" onClick={() => setShowPass(false)} />
              ) : (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setShowPass(true)}
                />
              )}
            </div>

            <div className="form-field terms-check">
              <input
                type="checkbox"
                className="terms-checkbox"
                id="terms"
                value={formValues.checked}
                onChange={(e) =>
                  setFormValues({ ...formValues, checked: e.target.checked })
                }
              />
              <label htmlFor="terms">
                By checking this box, you agree to our terms and conditions.Read
                the{" "}
                <Link
                  to={"/privacy-policy-terms-and-conditions"}
                  target="_blank"
                >
                  terms and conditions
                </Link>
                .
              </label>
            </div>

            <div className="info">
              <p>
                <AiFillInfoCircle /> About name change{" "}
              </p>
              <p>
                The name does not change if the gender specified for your child
                does not correspond to the character in the story.
              </p>
            </div>

            <button className="btn">
              Create Account{" "}
              <span>
                {" "}
                <MdArrowForward />{" "}
              </span>
            </button>
          </form>
        </div>
      </section>
    </Wrapper>
  );
};

export default Signup;

const ModalWrapper = styled.div`
  .info-box {
    border: 1px solid var(--clr-dark-blue);
    margin-bottom: 0.5rem;
    padding: 1rem;
    color: var(--clr-dark-blue);
  }

  ul {
    list-style-type: initial;
    padding-left: 1.5rem;

    .resend-btn {
      background: none;
      border: none;
      text-decoration: underline;
      color: #0ea1e0;
    }
  }

  > p {
    color: #333;
    font-size: 0.875rem;
    font-style: italic;
  }

  .close-btn {
    position: absolute;
    .password {
      position: relative;
      .icon {
        position: absolute;
        top: 50%;
        right: 15px;
        cursor: pointer;
      }
    }
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    * {
      color: rgba(240, 0, 0, 0.7);
      font-size: 1.25rem;
    }
  }
`;
const Wrapper = styled.div`
  position: relative;

  .modal-content {
    border: 5px solid red;
  }

  .section-center {
    padding: 2.5rem 0;
    .text-content {
      display: none;
      color: white;

      p {
        color: var(--clr-blue-light);
      }

      .btn {
        color: white;
        border: 1px solid white;
        align-self: flex-start;
      }
    }

    .form-container {
      .text {
        h1 {
          color: var(--clr-dark-blue);
          margin-bottom: 2rem;
        }
      }
      .password {
        position: relative;
        .icon {
          position: absolute;
          top: 50%;
          right: 15px;
          cursor: pointer;
        }
        button {
          width: 100%;
          border: 1px solid var(--clr-dark-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0 1rem;
        }

        .separator {
          div {
            background-color: #9c9494;
            height: 1px;
            width: 100%;
          }
          color: #9c9494;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0 0.5rem;
          padding: 1rem 0;
        }
      }

      form {
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

        .terms-check {
          display: flex;
          flex-direction: row !important;
          gap: 0 0.5rem;
          margin: 0.5rem 0;
          align-items: start;
          .terms-checkbox {
            height: 1.25rem;
            width: 1.25rem;
          }
        }

        .btn {
          background-color: var(--clr-yellow);
          color: white;
          margin-top: 0.5rem;
        }

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
            font-size: 0.75rem;
          }
        }
      }
    }
  }
  @media ${deviceMin.tablet} {
    background: url(${snowBg});
    background-repeat: no-repeat;
    background-size: 50% 100%;
    background-position: left;

    .section-center {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .form-container {
        padding: 0 4rem;

        form {
          .info {
            padding: 1rem;
            p {
              font-size: 1rem;
            }
          }

          .terms-check {
            label {
              font-size: 1rem;
            }
          }
        }
      }

      .text-content {
        display: flex;
        flex-direction: column;
        gap: 3rem 0;
        padding: 2rem 0;

        h2 {
          font-size: 2.75rem;
        }

        .btn {
          margin-top: 2rem;
        }
      }
    }
  }

  @media ${deviceMin.desktop} {
    .section-center {
      .form-container {
        padding: 0 6rem;
      }
    }
  }
`;
