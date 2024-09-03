import { useAppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deviceMin } from "../../styles/size";
import { MdArrowForward } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { useUserContext } from "../../Context/UserContext";
const Blogs = () => {
  const {
    state: {
      blogs: { loading, error, data: blogsData },
    },
  } = useAppContext();
  const { axiosInstance } = useUserContext();

  const pageSize = 10;
  const [blogs, setBlogs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  useEffect(() => {
    if (blogsData) {
      setBlogs(blogsData.blogs);
      setTotalBlogs(blogsData.total_blogs);
    }
  }, [blogsData]);
  useEffect(() => {
    axiosInstance
      .get(`/blog?offset=${offset}`)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        toast.error("Error Fetching Blogs");
        return;
      });
  }, [offset]);
  return (
    <Wrapper>
      <section className="section-center">
        <div className="text-content">
          <h1>Blog Section</h1>
          <p>
            Welcome to our Blog Corner, where we dive into the fascinating world
            of young minds. Join us as we explore the incredible universe of
            children and expand your understanding of their amazing world.
          </p>
        </div>

        <div className="blogs">
          {blogs?.length > 0 && (
            <>
              {blogs.map(({ id, title, author, subtitle, image }) => {
                return (
                  <div key={id} className="single-blog">
                    <div className="img-container">
                      <img src={image} alt="" />
                    </div>

                    <div className="blog-text">
                      <p>{author}</p>
                      <div>
                        <h2>{title}</h2>
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

              {/* Pagination  */}
              <div className="pagination">
                {offset > 0 ? (
                  <button
                    className="btn"
                    onClick={() => {
                      if (offset > 0) {
                        setOffset(offset - 1);
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    <FaArrowLeft />
                    Previous
                  </button>
                ) : (
                  <Link className="btn" to={"/"}>
                    <FaHome />
                    Back to Home
                  </Link>
                )}
                <p>
                  {offset + 1} of {Math.ceil(totalBlogs / pageSize)}
                </p>
                {(offset + 1) * pageSize < totalBlogs && (
                  <button
                    className="btn "
                    onClick={() => {
                      if (offset + pageSize < totalBlogs) {
                        setOffset(offset + 1);
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    Next
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </Wrapper>
  );
};

export default Blogs;

export const Wrapper = styled.div`
  padding: 3rem 0;
  p {
    color: var(--clr-dark-blue);
  }
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .section-center {
    .text-content {
      color: var(--clr-dark-blue);
      * {
        margin-bottom: 1rem;
      }
    }

    .blogs {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .single-blog {
        box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);
        /* 
        .img-container {
          display: none;
        } */

        .blog-text {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          justify-content: center;

          .btn {
            color: black;
            border: 1px solid var(--clr-dark-blue);
            align-self: flex-start;
          }

          div {
            h2 {
              color: var(--clr-dark-blue);
              text-transform: capitalize;
            }

            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        }
      }

      .btn-home {
        color: var(--clr-dark-blue);
      }
    }

    @media ${deviceMin.tablet} {
      .blogs {
        .single-blog {
          display: grid;
          grid-template-columns: 18.75rem 1fr;
          .img-container {
            display: block;
            img {
              aspect-ratio: 1;
            }
          }
        }
      }
    }

    @media ${deviceMin.desktop} {
      .blogs {
        .single-blog {
          display: grid;
          grid-template-columns: 32.5rem 1fr;
          .img-container {
            display: block;
            img {
              height: 20rem;
            }
          }
        }
      }
    }
  }
`;
