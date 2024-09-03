import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import { useUserContext } from "../../Context/UserContext";
// import useData from "../../Context/DataContext";
const ImageComponent = ({
  url,
  aspectRatio,
  className = "",
  alt = "",
  show = false,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const authToken = Cookies.get("authToken");

  const { axiosInstance } = useUserContext();
  // const { cache, imageCache } = useData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(url, {
          // headers: {
          //   Authorization: `Bearer ${authToken}`,
          // },
          responseType: "arraybuffer",
        });
        const blob = new Blob([data]);
        const imgURL = URL.createObjectURL(blob);
        // cache(url, imgURL);
        setImageSrc(imgURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    if (show) {
      // if (imageCache[url]) {
      //   setImageSrc(imageCache[url]);
      // } else {
      fetchData();
      // }
    }
  }, [show, url]); // Empty dependency array to run the effect only once on mount
  return imageSrc ? (
    <img style={{ aspectRatio }} src={imageSrc} alt={alt} />
  ) : null;
};
export default ImageComponent;
