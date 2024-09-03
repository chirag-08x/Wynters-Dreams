import { useUserContext } from "../../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Cookies from "js-cookie";
import { deviceMin } from "../../styles/size";
import useFetch from "../../Hooks/useFetch";
import snowBg from "../../assets/snow_bg.png";
import useData from "../../Context/DataContext";

const EditUserProfile = () => {
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");
  const { resetState } = useData();

  const {
    state: { user },
    axiosInstance,
    updateUserDetails,
  } = useUserContext();
  const {
    data: { image, subtitle, title },
  } = useFetch("/home/announcement");

  const [formValues, setFormValues] = useState({
    name: user.name,
    gender: user.gender,
  });
  useEffect(() => {
    if (!user) {
      toast.warn("Please Login First");
      navigate("/");
    }
  }, []);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        "/auth/profile",
        {
          name: formValues.name,
          gender: formValues.gender,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${authToken}`,
        //   },
        // }
      );
      updateUserDetails({ ...data });
      toast.success("Successfully updated profile.");
      resetState();
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Wrapper>
      <section className="announcement">
        <div className="announce-wrapper">
          <div className="img-container">
            <img src={image} alt="" />
          </div>

          <div className="announcement-text">
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <Link to={"/books"} className="btn">
              Explore{" "}
              <span>
                <MdArrowForward />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="wrapper">
        <div className="user-info">
          <div className="text-info">
            <h3>Hello {user.name},</h3>
            <p>
              Here’s where you’ll find all the important stuff. See child’s
              name, gender and discover new releases.
            </p>
          </div>

          <form className="form">
            <div className="info">
              <p>
                <AiFillInfoCircle /> You are Editing your Information
              </p>
              <p>
                The changes you make to your account information will reflect
                across the books you have purchased.
              </p>
            </div>

            <div className="form-field">
              <div className="form-field">
                <label htmlFor="child-name">Edit Name</label>
                <input
                  type="text"
                  id="child-name"
                  placeholder="First Name"
                  name="name"
                  required
                  value={formValues.name}
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
            </div>
            <button className="btn" onClick={handleSaveClick}>
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </Wrapper>
  );
};

export default EditUserProfile;

const Wrapper = styled.div`
  min-height: calc(100vh - 21rem);
  .announcement {
    display: none;
    background: url(${snowBg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .wrapper {
    padding: 3rem 0;
    .user-info {
      width: 90%;
      max-width: 42rem;
      margin: 0 auto;
      .text-info {
        margin-bottom: 2.5rem;
        color: var(--clr-dark-blue);
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 1rem 0;
        margin-bottom: 1rem;
        width: 100%;
        max-width: 28rem;

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem 0;

          input {
            padding: 0.45rem 0.8rem;
            background: var(--clr-grey-light);
            border: none;
            color: var(--clr-dark-blue);
          }
          select {
            padding: 0.45rem 0.5rem;
            border: none;
            background: var(--clr-grey-light);
            color: rgba(5, 1, 98, 0.5);
          }
          label {
            color: var(--clr-dark-blue);
          }
        }

        .btn {
          background-color: var(--clr-dark-blue);
          color: white;
          border: 1px solid var(--clr-dark-blue);
          align-self: flex-start;
          margin-top: 0.5rem;
        }

        .info-1 {
          margin-top: 1rem;
        }

        .info {
          border: 1px solid var(--clr-dark-blue);
          padding: 0.75rem;
          color: var(--clr-dark-blue);
          p:first-child {
            display: flex;
            align-items: center;
            gap: 0 0.5rem;
            margin-bottom: 0.2rem;
          }
          p {
            font-size: 0.75rem;
          }
        }
      }
    }

    .books {
      margin-top: 2.5rem;
      color: var(--clr-dark-blue);

      .purchased-books {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        > div {
          box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);
          display: grid;
          align-content: space-between;
        }

        .book-info {
          margin-top: 1rem;
          display: grid;
          gap: 0.5rem;

          .btn {
            background: var(--clr-dark-blue);
            color: white;
          }
        }

        .img-container {
          height: 9rem;
          img {
            height: 100%;
          }
        }
      }

      .bth {
        padding: 0;
        margin-top: 1rem;
        color: var(--clr-dark-blue);
        width: max-content;
      }
    }
  }

  @media ${deviceMin.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 3rem;

    .announcement {
      display: block;
      .announce-wrapper {
        width: 90%;
        max-width: 25rem;
        padding: 3rem 0;
        margin: 0 auto;

        .announcement-text {
          background-color: white;
          padding: 1rem;
          color: var(--clr-dark-blue);
          display: grid;
          gap: 0.5rem 0;
          .btn {
            background-color: var(--clr-yellow);
            color: white;
            justify-self: start;
          }
        }
      }
      .img-container {
        height: 25rem;
        img {
          height: 100%;
        }
      }
    }

    .wrapper {
      .user-info {
        margin: 0 0;
        .form {
          .info {
            > p {
              font-size: 1rem;
            }
          }
        }
      }

      .books {
        .purchased-books {
          .book-info {
            .btn {
              justify-self: start;
            }
          }

          .img-container {
            height: 10rem;
          }
          .p-bold {
            font-size: 1rem;
          }
        }
      }
    }
  }

  @media ${deviceMin.desktop} {
    grid-template-columns: 1fr 2fr;
  }
`;
