import * as React from "react";
export const AudioButton = (props) => {
  // const { disabled, ...props } = allProps;
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5306 57.1835C44.2876 57.1835 57.0612 44.4099 57.0612 28.6529C57.0612 12.8959 44.2876 0.122314 28.5306 0.122314C12.7736 0.122314 0 12.8959 0 28.6529C0 44.4099 12.7736 57.1835 28.5306 57.1835Z"
        fill="url(#paint0_linear_73_75)"
      />
      <path
        d="M28.5306 55.3648C43.2832 55.3648 55.2425 43.4055 55.2425 28.653C55.2425 13.9004 43.2832 1.9411 28.5306 1.9411C13.7781 1.9411 1.81874 13.9004 1.81874 28.653C1.81874 43.4055 13.7781 55.3648 28.5306 55.3648Z"
        fill="url(#paint1_linear_73_75)"
      />
      <path
        d="M54.2686 21.48C50.5769 11.1494 40.7054 3.75653 29.106 3.75653C14.3538 3.75812 2.39257 15.7161 2.39257 30.47C2.39257 32.947 2.7305 35.346 3.36171 37.6222C2.36229 34.8184 1.81874 31.7994 1.81874 28.6529C1.81874 13.9006 13.7768 1.93939 28.5306 1.93939C40.7994 1.93939 51.1364 10.2105 54.2686 21.48Z"
        fill="url(#paint2_linear_73_75)"
      />
      <path
        d="M28.5306 50.0904C40.3702 50.0904 49.968 40.4925 49.968 28.653C49.968 16.8134 40.3702 7.21558 28.5306 7.21558C16.6911 7.21558 7.09322 16.8134 7.09322 28.653C7.09322 40.4925 16.6911 50.0904 28.5306 50.0904Z"
        fill="url(#paint3_linear_73_75)"
      />
      <path
        d="M48.5607 28.6529C48.5607 39.7151 39.5946 48.6828 28.5308 48.6828C17.467 48.6828 8.50089 39.7167 8.50089 28.6529C8.50089 26.1217 8.96951 23.7004 9.82707 21.4704C12.7154 13.9564 19.9998 8.62457 28.5308 8.62457C37.0618 8.62457 44.3462 13.9564 47.2345 21.4704C48.0921 23.7004 48.5607 26.1233 48.5607 28.6529Z"
        fill="url(#paint4_radial_73_75)"
      />
      <path
        d="M47.2341 21.4692C44.3458 28.9832 37.0614 34.315 28.5304 34.315C19.9994 34.315 12.715 28.9832 9.82668 21.4692C12.715 13.9551 19.9994 8.62329 28.5304 8.62329C37.0614 8.62329 44.3458 13.9551 47.2341 21.4692Z"
        fill="url(#paint5_radial_73_75)"
      />
      <path
        d="M32.3333 41H39V17H32.3333M19 41H25.6667V17H19V41Z"
        fill="#5D5D5D"
      />
      <defs>
        <linearGradient
          id="paint0_linear_73_75"
          x1="30.4163"
          y1="-4.96247"
          x2="27.0084"
          y2="55.7872"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AFAFAF" />
          <stop offset="1" stopColor="#595959" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_73_75"
          x1="30.2967"
          y1="-2.8217"
          x2="27.104"
          y2="54.0594"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DBDBDB" />
          <stop offset="1" stopColor="#9F9F9F" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_73_75"
          x1="1.81874"
          y1="19.7808"
          x2="54.2686"
          y2="19.7808"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D0D0D0" />
          <stop offset="1" stopColor="#D9D3C9" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_73_75"
          x1="38.5902"
          y1="56.1523"
          x2="21.2206"
          y2="8.67247"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C3C3C3" />
          <stop offset="1" stopColor="#A0A0A0" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_73_75"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.5308 28.6529) scale(20.0299)"
        >
          <stop stopColor="#ADADAD" />
          <stop offset="1" stopColor="#727272" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_73_75"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31.8395 11.247) scale(21.7897 21.7897)"
        >
          <stop stopColor="#D9D9D9" />
          <stop offset="1" stopColor="#9C9C9C" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const DisabledAudioButton = (props) => {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5306 57.1224C44.2876 57.1224 57.0612 44.3488 57.0612 28.5918C57.0612 12.8347 44.2876 0.0611572 28.5306 0.0611572C12.7736 0.0611572 0 12.8347 0 28.5918C0 44.3488 12.7736 57.1224 28.5306 57.1224Z"
        fill="url(#paint0_linear_73_61)"
      />
      <path
        d="M28.5306 55.3037C43.2832 55.3037 55.2425 43.3444 55.2425 28.5918C55.2425 13.8393 43.2832 1.87994 28.5306 1.87994C13.7781 1.87994 1.81874 13.8393 1.81874 28.5918C1.81874 43.3444 13.7781 55.3037 28.5306 55.3037Z"
        fill="url(#paint1_linear_73_61)"
      />
      <path
        d="M54.2686 21.4188C50.5769 11.0882 40.7054 3.69537 29.106 3.69537C14.3538 3.69696 2.39257 15.655 2.39257 30.4088C2.39257 32.8859 2.7305 35.2848 3.36171 37.561C2.36229 34.7572 1.81874 31.7382 1.81874 28.5917C1.81874 13.8394 13.7768 1.87823 28.5306 1.87823C40.7994 1.87823 51.1364 10.1494 54.2686 21.4188Z"
        fill="url(#paint2_linear_73_61)"
      />
      <path
        d="M28.5306 50.0292C40.3702 50.0292 49.968 40.4314 49.968 28.5918C49.968 16.7523 40.3702 7.15442 28.5306 7.15442C16.6911 7.15442 7.09322 16.7523 7.09322 28.5918C7.09322 40.4314 16.6911 50.0292 28.5306 50.0292Z"
        fill="url(#paint3_linear_73_61)"
      />
      <path
        d="M48.5607 28.5917C48.5607 39.6539 39.5946 48.6217 28.5308 48.6217C17.467 48.6217 8.50089 39.6555 8.50089 28.5917C8.50089 26.0605 8.96951 23.6392 9.82707 21.4093C12.7154 13.8953 19.9998 8.56342 28.5308 8.56342C37.0618 8.56342 44.3462 13.8953 47.2345 21.4093C48.0921 23.6392 48.5607 26.0621 48.5607 28.5917Z"
        fill="url(#paint4_radial_73_61)"
      />
      <path
        d="M47.2341 21.408C44.3458 28.922 37.0614 34.2539 28.5304 34.2539C19.9994 34.2539 12.715 28.922 9.82668 21.408C12.715 13.894 19.9994 8.56213 28.5304 8.56213C37.0614 8.56213 44.3458 13.894 47.2341 21.408Z"
        fill="url(#paint5_radial_73_61)"
      />
      <path
        d="M23.5369 17.978C22.8711 17.5544 22 18.0326 22 18.8217V39.1783C22 39.9674 22.8712 40.4456 23.5369 40.022L39.5314 29.8437C40.1489 29.4507 40.1489 28.5493 39.5314 28.1563L23.5369 17.978Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_73_61"
          x1="30.4163"
          y1="-5.02363"
          x2="27.0084"
          y2="55.726"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A66850" />
          <stop offset="1" stopColor="#7D3308" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_73_61"
          x1="30.2967"
          y1="-2.88286"
          x2="27.104"
          y2="53.9982"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EAAC59" />
          <stop offset="1" stopColor="#C14F0C" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_73_61"
          x1="1.81874"
          y1="19.7196"
          x2="54.2686"
          y2="19.7196"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD076" />
          <stop offset="1" stopColor="#FBD28A" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_73_61"
          x1="38.5902"
          y1="56.0911"
          x2="21.2206"
          y2="8.61131"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EAAC59" />
          <stop offset="1" stopColor="#C14F0C" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_73_61"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.5308 28.5917) scale(20.0299)"
        >
          <stop stopColor="#FFF200" />
          <stop offset="1" stopColor="#FFAA01" />
        </radialGradient>
        <radialGradient
          id="paint5_radial_73_61"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(31.8395 11.1858) scale(21.7897 21.7897)"
        >
          <stop stopColor="#FFF200" />
          <stop offset="1" stopColor="#FFAA01" />
        </radialGradient>
      </defs>
    </svg>
  );
};
