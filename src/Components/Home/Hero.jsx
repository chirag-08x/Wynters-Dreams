import styled from "styled-components";
import { deviceMin } from "../../styles/size";
import Snowfall from "react-snowfall";
import { MdArrowForward } from "react-icons/md";
import { useAppContext } from "../../Context/AppContext";
import { useEffect, useState } from "react";
import bg from "../../assets/snow_bg.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const {
    state: {
      bestSellers: { error, loading, data },
    },
  } = useAppContext();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    setSlideImages(data);
  }, [data]);

  useEffect(() => {
    if (slideImages && slideImages.length > 0) {
      setInterval(() => {
        const nextSlide = () => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
        };
        nextSlide();
      }, 2000);
    }
  }, [slideImages]);

  return (
    <Wrapper>
      <Snowfall snowflakeCount={100} style={{ zIndex: -1 }} />
      <section className="section-center">
        <div className="img-container">
          {slideImages && slideImages.length > 0 && (
            <img src={slideImages[currentSlide].cover_image} alt="" />
          )}
        </div>

        <div className="text-content">
          <h1>Ready to embark on an extraordinary reading adventure?</h1>
          <p>
            We're not just another eBook company – we're your child's gateway to
            an extraordinary literary journey of wonder and imagination!
          </p>
          <Link to={"/books"} className="btn">
            Start the Adventure
            <span>
              <MdArrowForward />
            </span>
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.div`
  background: url("${bg}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 2rem 0;
  position: relative;
  z-index: 2;
  .section-center {
    .img-container {
      margin-bottom: 1rem;
      height: 12.5rem;
      img {
        height: 100%;
      }
    }

    .text-content {
      h1 {
        margin-bottom: 0.75rem;
        max-width: 20.5rem;
        color: white;
      }
      p {
        color: var(--clr-blue-light);
        margin-bottom: 0.75rem;
        max-width: 20rem;
      }
      .btn {
        background-color: var(--clr-yellow);
        color: white;
      }
    }
  }

  @media ${deviceMin.tablet} {
    padding: 4rem 0;
    .section-center {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      gap: 2rem;

      .img-container {
        width: 23rem;
        height: 16.5rem;
        img {
          height: 100%;
        }
      }

      .text-content {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
          max-width: 22rem;
          margin-bottom: 1.5rem;
        }
        p {
          max-width: 29rem;
          margin-bottom: 2.5rem;
        }
        .btn {
          align-self: flex-start;
          height: 3rem;
        }
      }
    }
  }

  @media ${deviceMin.desktop} {
    .section-center {
      .img-container {
        width: 37rem;
        height: 25rem;
        img {
          height: 100%;
        }
      }
      .text-content {
        h1 {
          max-width: 30rem;
        }
      }
    }
  }
`;
