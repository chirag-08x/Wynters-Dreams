import styled from "styled-components";
import { useAppContext } from "../../Context/AppContext";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { Wrapper } from "../../Pages/Blogs/Blogs";
import { deviceMin } from "../../styles/size";

const Blogs = () => {
  const {
    state: {
      blogs: { loading, data, error },
    },
  } = useAppContext();

  return (
    <StyledWrapper>
      <section className="section-center">
        <div className="blogs">
          {data && data.length > 0 && (
            <>
              {data.blogs
                .slice(0, 3)
                .map(({ id, title, author, image, subtitle }, idx) => {
                  return (
                    <div key={`${idx + 1}`} className="single-blog">
                      {idx === 0 && (
                        <div className="img-container">
                          <img src={image} alt="" />
                        </div>
                      )}

                      <div className="blog-text">
                        <p className="author">{author}</p>
                        <div>
                          <h2 className="title">{title}</h2>
                          <p>{subtitle}</p>
                        </div>
                        <Link to={`/blog/${id}`} className="btn">
                          <p>Read More</p>{" "}
                          <span>
                            <MdArrowForward />
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </section>
    </StyledWrapper>
  );
};

export default Blogs;

const StyledWrapper = styled(Wrapper)`
  .single-blog {
    display: none;
  }

  .single-blog:first-child {
    display: initial;
  }

  .blogs {
    @media ${deviceMin.tablet} {
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      justify-content: space-between;

      .single-blog {
        display: grid;
        grid-template-columns: auto 1fr !important;

        .img-container {
          height: 16.5rem;
          img {
            height: 100%;
          }
        }
      }

      .single-blog:not(:first-child) {
        display: grid;
        grid-template-columns: 1fr !important;
      }

      .single-blog:first-child {
        grid-column: -1/1;
      }
    }

    @media ${deviceMin.desktop} {
      .single-blog {
        grid-template-columns: 1fr 1fr !important;
        .blog-text {
          .author {
            display: none;
          }
        }
        .img-container {
          height: 18.75rem;
          img {
            height: 100% !important;
          }
        }
      }

      .single-blog:not(:first-child) {
        .blog-text {
          .title {
            font-size: 1.25rem;
          }
        }
      }
    }
  }
`;
