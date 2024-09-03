import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { deviceMin } from "../../../styles/size";
import snowBg from "../../../assets/snow_bg.png";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import { useUserContext } from "../../../Context/UserContext";
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { baseURL } from "../../../api/api";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const {
    loginUser: login,
    state: { user },
    axiosInstance,
  } = useUserContext();
  const navigate = useNavigate("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const loginUser = async () => {
    const { email, password } = formValues;
    try {
      const { data } = await axios.post(`${baseURL}/auth/sign-in`, {
        email: email.trim(),
        password,
      });
      setFormValues({ email: "", password: "" });
      console.log({ authResponse: data });
      login({ ...data });
      toast.success("Successfully logged in.");
      // navigate("/dashboard");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
      // if (error.response.data.message === "email not verified") {
      //   toast.error("Please verify email first.");
      // } else {
      //   toast.error("Wrong email id or password.");
      // }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(formValues.email.trim())) {
      return toast.warn("Please enter a valid email.");
    }
    loginUser();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Wrapper>
      <section className="section-center">
        <div className="text-content">
          <h2>Login to explore your Curated Collections.</h2>
          <p>
            <span>Curated Collection:</span> Immerse your child in a world of
            captivating tales carefully curated to spark curiosity and inspire
            creativity.
          </p>
          <p>
            <span>Interactive Adventures:</span>
            Let your little one's imagination soar as they make decisions that
            shape the story's outcome, encouraging critical thinking and
            engagement.
          </p>
          <p>
            <span>Anytime, Anywhere:</span>
            Access your favorite stories at the touch of a button, bringing the
            magic of reading directly to your screen.
          </p>

          <p>
            <span>Parental Involvement:</span>
            Bond with your child over shared reading experiences and track their
            progress as they take steps toward becoming confident readers.
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
            <h1>Account Login !</h1>
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
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) => handleChange(e)}
              />
            </div> */}
            {/* Add show password eye icon to toggle password visibility */}
            <div className="form-field password">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) => handleChange(e)}
              />
              {showPassword ? (
                <FaEye
                  className="icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <div className="forgot-pass">
              <Link to={"/reset-password"} style={{ color: "black" }}>
                Forgot Password?
              </Link>
            </div>

            <button className="btn">
              Account Login{" "}
              <span>
                {" "}
                <MdArrowForward />{" "}
              </span>
            </button>
          </form>

          <p>
            Create An Account ?{" "}
            <Link to={"/register"} style={{ color: "var(--clr-blue)" }}>
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
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
        align-self: flex-start;
      }
    }

    .form-container {
      .password {
        position: relative;
        .icon {
          position: absolute;
          top: 50%;
          right: 15px;
          cursor: pointer;
        }
      }
      .text {
        h1 {
          color: var(--clr-dark-blue);
          margin-bottom: 2rem;
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

        .forgot-pass {
          align-self: flex-end;
        }

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

        .btn {
          background-color: var(--clr-yellow);
          color: white;
          margin-top: 0.5rem;
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
      }

      .text-content {
        display: flex;
        flex-direction: column;
        gap: 1rem 0;

        p {
          span {
            font-weight: 700;
          }
        }

        h2 {
          font-size: 2.75rem;
          margin-bottom: 1rem;
        }

        .btn {
          margin-top: 2rem;
        }
      }
    }
  }

  @media ${deviceMin.desktop} {
    .section-center {
      .text-content {
        padding: 2rem 6rem 2rem 0;
      }
      .form-container {
        padding: 0 6rem;
      }
    }
  }
`;
