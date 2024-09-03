import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdClear, MdDone } from "react-icons/md";
import { keyframes, styled } from "styled-components";

export default function CustomInput({
  label,
  id,
  value,
  onChange,
  placeholder,
  readOnly = false,
  aadOnRight,
  correct,
  loading,
}) {
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      <div className="input">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(id, e.target.value);
          }}
          placeholder={placeholder}
          id={id}
          name={id}
          readOnly={readOnly}
        />
        {aadOnRight && (
          <>
            {loading ? (
              <Spinner />
            ) : correct ? (
              <MdDone fontSize={16} color="#1dc503" />
            ) : (
              <MdClear fontSize={16} color="#ff0000" />
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem 0;

  .input {
    padding: 0.5rem 1rem;
    background: var(--clr-grey-light);
    color: var(--clr-dark-blue);
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      border: none;
      background: var(--clr-grey-light);
      outline: 0px !important;
      width: 100%;
    }
  }

  label {
    color: var(--clr-dark-blue);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Create a styled component with the spinning animation
const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: ${spin} 1s ease-in-out infinite; /* Apply the animation */
`;
