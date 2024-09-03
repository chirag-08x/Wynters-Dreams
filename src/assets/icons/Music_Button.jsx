import * as React from "react";
const MusicButton = (allProps) => {
  const { disabled, ...props } = allProps;
  return disabled ? (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5306 57.0612C44.2876 57.0612 57.0612 44.2876 57.0612 28.5306C57.0612 12.7736 44.2876 0 28.5306 0C12.7736 0 0 12.7736 0 28.5306C0 44.2876 12.7736 57.0612 28.5306 57.0612Z"
        fill="url(#paint0_linear_10_147)"
      />
      <path
        d="M28.5306 55.2425C43.2832 55.2425 55.2425 43.2831 55.2425 28.5306C55.2425 13.778 43.2832 1.81873 28.5306 1.81873C13.7781 1.81873 1.81874 13.778 1.81874 28.5306C1.81874 43.2831 13.7781 55.2425 28.5306 55.2425Z"
        fill="url(#paint1_linear_10_147)"
      />
      <path
        d="M54.2686 21.3576C50.5769 11.027 40.7054 3.63415 29.106 3.63415C14.3538 3.63574 2.39257 15.5938 2.39257 30.3476C2.39257 32.8247 2.7305 35.2236 3.36171 37.4998C2.36229 34.696 1.81874 31.677 1.81874 28.5305C1.81874 13.7782 13.7768 1.81702 28.5306 1.81702C40.7995 1.81702 51.1364 10.0882 54.2686 21.3576Z"
        fill="url(#paint2_linear_10_147)"
      />
      <path
        d="M28.5306 49.9681C40.3702 49.9681 49.968 40.3702 49.968 28.5307C49.968 16.6911 40.3702 7.09326 28.5306 7.09326C16.6911 7.09326 7.09321 16.6911 7.09321 28.5307C7.09321 40.3702 16.6911 49.9681 28.5306 49.9681Z"
        fill="url(#paint3_linear_10_147)"
      />
      <path
        d="M48.5607 28.5305C48.5607 39.5927 39.5946 48.5604 28.5308 48.5604C17.467 48.5604 8.50089 39.5943 8.50089 28.5305C8.50089 25.9993 8.96951 23.578 9.82707 21.3481C12.7154 13.8341 19.9998 8.5022 28.5308 8.5022C37.0618 8.5022 44.3462 13.8341 47.2345 21.3481C48.0921 23.578 48.5607 26.0009 48.5607 28.5305Z"
        fill="url(#paint4_radial_10_147)"
      />
      <path
        d="M47.2341 21.3467C44.3459 28.8607 37.0614 34.1926 28.5304 34.1926C19.9994 34.1926 12.715 28.8607 9.82668 21.3467C12.715 13.8327 19.9994 8.50085 28.5304 8.50085C37.0614 8.50085 44.3459 13.8327 47.2341 21.3467Z"
        fill="url(#paint5_radial_10_147)"
      />
      <path
        d="M39.776 25.9051C39.776 25.9051 38.4227 22.0429 35.7146 22.0429C35.4834 22.0429 35.2571 22.0238 35.0355 21.9903C32.6557 21.6237 30.8545 19.4671 30.8545 19.4671C31.1606 21.501 32.007 24.4482 33.6025 29.5314C35.4245 35.4196 32.9107 43.1472 24.1104 41.1866C20.8555 40.4613 18.3418 37.6304 18.4279 34.2671C18.4279 30.4448 20.9719 27.3477 24.1104 27.3477C25.2692 27.3477 26.3436 27.7701 27.241 28.4922C26.4934 18.3338 24.799 14.038 24.799 14.038C33.0367 12.0646 41.6712 17.5336 39.7744 25.9051H39.776Z"
        fill="#5D5D5D"
      />
      <path
        d="M17 40.8777L40 17.8777"
        stroke="#5D5D5D"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10_147"
          x1="30.4163"
          y1="-5.08479"
          x2="27.0084"
          y2="55.6649"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFAFAF" />
          <stop offset="1" stopColor="#595959" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10_147"
          x1="30.2967"
          y1="-2.94408"
          x2="27.104"
          y2="53.937"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E6E6" />
          <stop offset="1" stopColor="#999999" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_10_147"
          x1="1.81874"
          y1="19.6584"
          x2="54.2686"
          y2="19.6584"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C6C6C6" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_10_147"
          x1="38.5902"
          y1="56.03"
          x2="21.2206"
          y2="8.55016"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4F4F4" />
          <stop offset="1" stopColor="#5C5C5C" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_10_147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.5308 28.5305) scale(20.0299 20.0299)"
        >
          <stop stopColor="#FFF200" />
          <stop offset="0.0001" stopColor="white" />
          <stop offset="1" stopColor="#9C9C9C" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_10_147"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31.8395 11.1245) scale(21.7897 21.7897)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#A3A3A3" />
        </radialGradient>
      </defs>
    </svg>
  ) : (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5306 57.0612C44.2876 57.0612 57.0612 44.2876 57.0612 28.5306C57.0612 12.7736 44.2876 0 28.5306 0C12.7736 0 0 12.7736 0 28.5306C0 44.2876 12.7736 57.0612 28.5306 57.0612Z"
        fill="url(#paint0_linear_10_51)"
      />
      <path
        d="M28.5306 55.2425C43.2832 55.2425 55.2425 43.2831 55.2425 28.5306C55.2425 13.778 43.2832 1.81873 28.5306 1.81873C13.7781 1.81873 1.81874 13.778 1.81874 28.5306C1.81874 43.2831 13.7781 55.2425 28.5306 55.2425Z"
        fill="url(#paint1_linear_10_51)"
      />
      <path
        d="M54.2686 21.3576C50.5769 11.027 40.7054 3.63415 29.106 3.63415C14.3538 3.63574 2.39257 15.5938 2.39257 30.3476C2.39257 32.8247 2.7305 35.2236 3.36171 37.4998C2.36229 34.696 1.81874 31.677 1.81874 28.5305C1.81874 13.7782 13.7768 1.81702 28.5306 1.81702C40.7995 1.81702 51.1364 10.0882 54.2686 21.3576Z"
        fill="url(#paint2_linear_10_51)"
      />
      <path
        d="M28.5306 49.9681C40.3702 49.9681 49.968 40.3702 49.968 28.5307C49.968 16.6911 40.3702 7.09326 28.5306 7.09326C16.6911 7.09326 7.09321 16.6911 7.09321 28.5307C7.09321 40.3702 16.6911 49.9681 28.5306 49.9681Z"
        fill="url(#paint3_linear_10_51)"
      />
      <path
        d="M48.5607 28.5305C48.5607 39.5927 39.5946 48.5604 28.5308 48.5604C17.467 48.5604 8.50089 39.5943 8.50089 28.5305C8.50089 25.9993 8.96951 23.578 9.82707 21.3481C12.7154 13.8341 19.9998 8.5022 28.5308 8.5022C37.0618 8.5022 44.3462 13.8341 47.2345 21.3481C48.0921 23.578 48.5607 26.0009 48.5607 28.5305Z"
        fill="url(#paint4_radial_10_51)"
      />
      <path
        d="M47.2341 21.3467C44.3459 28.8607 37.0614 34.1926 28.5304 34.1926C19.9994 34.1926 12.715 28.8607 9.82668 21.3467C12.715 13.8327 19.9994 8.50085 28.5304 8.50085C37.0614 8.50085 44.3459 13.8327 47.2341 21.3467Z"
        fill="url(#paint5_radial_10_51)"
      />
      <path
        d="M39.776 25.9051C39.776 25.9051 38.4227 22.0429 35.7146 22.0429C35.4834 22.0429 35.2571 22.0238 35.0355 21.9903C32.6557 21.6237 30.8545 19.4671 30.8545 19.4671C31.1606 21.501 32.007 24.4482 33.6025 29.5314C35.4245 35.4196 32.9107 43.1472 24.1104 41.1866C20.8555 40.4613 18.3418 37.6304 18.4279 34.2671C18.4279 30.4448 20.9719 27.3477 24.1104 27.3477C25.2692 27.3477 26.3436 27.7701 27.241 28.4922C26.4934 18.3338 24.799 14.038 24.799 14.038C33.0367 12.0646 41.6712 17.5336 39.7744 25.9051H39.776Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10_51"
          x1="30.4163"
          y1="-5.08479"
          x2="27.0084"
          y2="55.6649"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A66850" />
          <stop offset="1" stopColor="#7D3308" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10_51"
          x1="30.2967"
          y1="-2.94408"
          x2="27.104"
          y2="53.937"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EAAC59" />
          <stop offset="1" stopColor="#C14F0C" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_10_51"
          x1="1.81874"
          y1="19.6584"
          x2="54.2686"
          y2="19.6584"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD076" />
          <stop offset="1" stopColor="#FBD28A" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_10_51"
          x1="38.5902"
          y1="56.03"
          x2="21.2206"
          y2="8.55016"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EAAC59" />
          <stop offset="1" stopColor="#C14F0C" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_10_51"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.5308 28.5305) scale(20.0299 20.0299)"
        >
          <stop stopColor="#FFF200" />
          <stop offset="1" stopColor="#FFAA01" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_10_51"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31.8395 11.1245) scale(21.7897 21.7897)"
        >
          <stop stopColor="#FFF200" />
          <stop offset="1" stopColor="#FFAA01" />
        </radialGradient>
      </defs>
    </svg>
  );
};
export default MusicButton;
