import styled from "styled-components";
import useFetch from "../../Hooks/useFetch";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";

import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { deviceMin } from "../../styles/size";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`/blog/${id}`);

  if (loading) {
    return (
      <div style={{ height: "70vh", display: "grid", placeItems: "center" }}>
        <h3>Loading....</h3>;
      </div>
    );
  }
  const markDown = data?.content?.replaceAll("<br>", "\n\n");
  return (
    <Wrapper>
      <section className="section-center">
        <div className="container">
          <img className="cover-img" src={data.image} />
          <div className="details">
            <div className="yellow-line"></div>
            <div className="author-container">
              <h4>{data.author}</h4>
              <p>
                {" "}
                {new Date(data.created_at * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <Markdown>{markDown}</Markdown>
            {/* <div className="content" dangerouslySetInnerHTML={{ __html: data.content }}>
            </div> */}
            {/* <div className="content">
              <p>{data.content}</p>
            </div> */}
          </div>
        </div>
        <Link to={"/blogs"} className="back-btn btn ">
          <span>
            <MdArrowBack />
          </span>{" "}
          Back to blogs
        </Link>
      </section>
    </Wrapper>
  );
};

export default BlogDetails;

const Wrapper = styled.div`
  padding: 3rem 0;
  .section-center {
    .back-btn {
      margin-top: 2rem;
    }
    .btn {
      width: max-content;
      color: var(--clr-dark-blue);
    }

    .container {
      .cover-img {
        height: 60vh;
        object-fit: cover;
        object-position: center;
      }
      background-color: white;
      .details {
        box-shadow: 0px 0px 24px 3px rgba(7, 10, 104, 0.1);
        margin-top: 1rem;
        .yellow-line {
          width: 100%;
          height: 2px;
          background-color: var(--clr-yellow-light);
        }
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        h2 {
          margin-bottom: 2rem;
          color: var(--clr-dark-blue);
        }
      }
    }

    @media ${deviceMin.tablet} {
      .container {
        .details {
          padding: 2rem 2rem;
          margin-top: 0;
        }
      }
    }

    @media ${deviceMin.desktop} {
      .container {
        .details {
          padding: 2rem 4rem;
        }
      }
    }
  }
`;
