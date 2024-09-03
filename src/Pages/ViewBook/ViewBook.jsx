import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef, useMemo } from "react";
import Cookies from "js-cookie";
import styled from "styled-components";
import { deviceMin } from "../../styles/size";
import flipSound from "../../assets/flipsound.mp3";
import { baseURL } from "../../api/api";
import Snowfall from "react-snowfall";
import { LuMoveLeft } from "react-icons/lu";
import { RiSettings5Fill } from "react-icons/ri";
import ResetIcon from "../../assets/icons/ResetIcon";
import { toast } from "react-toastify";
import MobileBook from "./MobileBook";
import MainBook from "./MainBook";
import {
  DisabledAudioButton,
  AudioButton,
} from "../../assets/icons/AudioButton";
import MusicButton from "../../assets/icons/Music_Button";
import SettingsButton from "../../assets/icons/SettingsButton";
import { Radio, Slider, Spin } from "antd";
import TurtleIcon from "../../assets/icons/TurtleIcon";
import RabbitIcon from "../../assets/icons/RabbitIcon";
import useData from "../../Context/DataContext";
import AudioBookSettings from "./AudioBookSettings";
import BookNameChangeModal from "./BookNameChangeModal";
import BookController from "./BookController";
import { useUserContext } from "../../Context/UserContext";
import { MdHomeFilled } from "react-icons/md";

function extractTextFromHTML(html) {
  var tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  var text = tempElement.textContent || tempElement.innerText;
  tempElement = null;
  return text;
}

async function getAudio(apiURL, axiosInstance) {
  const { data: base64Data } = await axiosInstance.get(apiURL);
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "audio/mp3" });
  const url = URL.createObjectURL(blob);
  return url;
}

const ViewBook = () => {
  const { id } = useParams();
  const authToken = Cookies.get("authToken");
  const [landscapeBookData, setLandscapeBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [portraitBookData, setPortraitBookData] = useState([]);
  const [currentPortraitPage, setCurrentPortraitPage] = useState(0);
  const [selectedButton, setSelectedButton] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingAudioBook, setPlayingAudioBook] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const [music, setMusic] = useState(null);
  const [soundEffect, setSoundEffect] = useState(null);
  const [playingMusic, setPlayingMusic] = useState(false);

  const [audioSettings, setAudioSettings] = useState({
    voice: "en-US_en-US-Standard-C",
    speed: 1.0,
  });
  const [updatedAudioSettings, setUpdatedAudioSetting] = useState({
    voice: "en-US_en-US-Standard-C",
    speed: 1.0,
  });

  const [replaceName, setReplaceName] = useState(undefined);
  const [openNameReplaceModal, setOpenNameReplaceModal] = useState(true);

  const [playtts, setPlaytts] = useState(false);

  const navigate = useNavigate();

  const [isPortrait, setIsPortrait] = useState(
    window.innerWidth < window.innerHeight
  );

  const { bookDetails, addBookDetails, pages, addPages } = useData();

  const { axiosInstance } = useUserContext();

  const bookRef = useRef();
  const pageFlipAudio = new Audio(flipSound);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/asset/paging/${id}?replace=${!!replaceName}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${authToken}`,
        //   },
        // }
      );
      addPages(`${id}-${replaceName}`, data);
    } catch (error) {
      throw new Error(error);
    }
    setLoading(false);
  };

  const pauseText = () => {
    if (currentAudio) {
      if (
        playingAudioBook &&
        currentAudio.currentTime < currentAudio.duration
      ) {
        currentAudio.pause();
        setPlayingAudioBook(false);
      } else {
        currentAudio.play();
        setPlayingAudioBook(true);
      }
    }
  };

  const playText = async () => {
    if (!playtts) {
      return;
    }
    try {
      if (!currentAudio) {
        const targetChapter = isPortrait
          ? portraitBookData[currentPortraitPage]
          : landscapeBookData[currentPageIndex];
        let buttonText = "";
        for (const button of targetChapter.buttons) {
          if (button.text != "Restart Book") {
            if (buttonText.trim() != "") {
              buttonText = `${buttonText}... or ...${button.text}`;
            } else {
              buttonText += `${buttonText} ${button.text}`;
            }
          }
        }

        const targetText = `${targetChapter.heading}...${extractTextFromHTML(
          targetChapter.text
        )}.... . ....${
          buttonText.trim() == ""
            ? "The End"
            : "Click on the options to move ahead"
        }...${buttonText}`;

        const [lc, voice] = audioSettings.voice.split("_");
        const backgroundMusic = new Audio(
          `${baseURL}/asset/text-to-speech?text=${encodeURIComponent(
            targetText
          )}&speed=${audioSettings.speed}&voice=${voice}&lc=${lc}`
        );

        setCurrentAudio(backgroundMusic);
        setTimeout(() => {
          backgroundMusic.load();
          backgroundMusic.play();

          setPlayingAudioBook(true);
        }, 0);
      } else {
        pauseText();
      }
    } catch (error) {
      console.log(error.message);
      toast.warn("Something went wrong while loading audio.");
    }
  };

  useEffect(() => {
    if (playtts) {
      playText();
    } else {
      pauseText();
    }
  }, [playtts]);

  useEffect(() => {
    if (typeof replaceName == "boolean") {
      let timeout;
      let play = false;
      if (isPortrait) {
        if (portraitBookData[currentPortraitPage]) {
          play = true;
        }
      } else {
        if (landscapeBookData[currentPageIndex]) {
          play = true;
        }
      }
      if (play) {
        timeout = setTimeout(() => {
          playText();
        }, 1000);
      }
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [
    landscapeBookData[currentPageIndex],
    replaceName,
    currentPortraitPage,
    currentPageIndex,
    portraitBookData,
    isPortrait,
  ]);

  useEffect(() => {
    if (bookDetails[id] && typeof replaceName == "boolean") {
      const data = bookDetails[id];
      if (data.have_music) {
        (async () => {
          const url = await getAudio(`/asset/music/${id}`, axiosInstance);
          const newMusic = new Audio(url);
          newMusic.addEventListener("canplaythrough", (e) => {
            newMusic.loop = true;
            newMusic.volume = 0.1;
            setMusic(newMusic);
          });
        })();
      }
    }
  }, [replaceName, bookDetails[id]]);

  useEffect(() => {
    if (!bookDetails[id]) {
      axiosInstance.get(`/book/${id}`).then(({ data }) => {
        if (data.gender !== "none") {
          setOpenNameReplaceModal(true);
        } else {
          setReplaceName(false);
          setOpenNameReplaceModal(false);
        }
        addBookDetails(id, data);
      });
    }
  }, [bookDetails]);

  useEffect(() => {
    if (typeof replaceName == "boolean") {
      if (pages[`${id}-${replaceName}`]) {
        const data = pages[`${id}-${replaceName}`];
        let pagesArr = [];
        setPortraitBookData(data);
        for (const bookPage of data) {
          pagesArr.push({ ...bookPage, image: undefined });
          if (bookPage.image) {
            pagesArr.push({ image: bookPage.image });
          }
        }
        setLandscapeBookData(pagesArr);
      } else {
        fetchBook();
      }
    }
  }, [replaceName, pages]);

  useEffect(() => {
    if (typeof replaceName == "boolean") {
      if (music) {
        music.play();
        setPlayingMusic(true);
      }
    }
  }, [replaceName, music]);

  useEffect(() => {
    if (soundEffect && typeof replaceName == "boolean" && playingMusic) {
      soundEffect.play();
    }
  }, [replaceName, soundEffect, currentPageIndex, currentPortraitPage]);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (typeof replaceName == "boolean") {
      let data;
      if (isPortrait) {
        data = portraitBookData[currentPortraitPage];
      } else {
        if (landscapeBookData[currentPageIndex]) {
          data = landscapeBookData[currentPageIndex];
        }
      }
      if (data && data.have_sound_effect) {
        (async () => {
          const url = await getAudio(
            `/asset/sound-effect/${id}/${data.chapter}`,
            axiosInstance
          );
          const newSoundEffect = new Audio(url);
          newSoundEffect.addEventListener("canplaythrough", (e) => {
            newSoundEffect.loop = true;
            newSoundEffect.volume = 0.1;
            setSoundEffect(newSoundEffect);
          });
        })();
      } else {
        if (soundEffect && playingMusic) {
          soundEffect.pause();
        }
        setSoundEffect(null);
      }
    }
  }, [currentPageIndex, isPortrait, landscapeBookData, replaceName]);

  useEffect(() => {
    let interval;
    if (currentAudio && playingAudioBook) {
      interval = setInterval(() => {
        if (currentAudio.currentTime == currentAudio.duration) {
          setPlayingAudioBook(false);
          currentAudio.pause();
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentAudio, playingAudioBook]);

  // Cleanup effects starts from this line
  useEffect(() => {
    if (currentAudio) {
      return () => {
        currentAudio.pause();
        setCurrentAudio(null);
      };
    }
  }, [currentAudio]);

  useEffect(() => {
    if (music) {
      return () => {
        music.pause();
        setMusic(null);
      };
    }
  }, [music]);

  useEffect(() => {
    if (soundEffect) {
      return () => {
        soundEffect.pause();
        setSoundEffect(null);
      };
    }
  }, [soundEffect]);
  // Cleanup effects ends here.
  const book = useMemo(() => {
    if (typeof replaceName != "boolean" || loading) {
      return null;
    }

    if (isPortrait) {
      return (
        <MobileBook
          currentPortraitPage={currentPortraitPage}
          flip={flip}
          portraitBookData={portraitBookData}
        />
      );
    }

    return (
      <MainBook
        ref={bookRef}
        currentAudio={currentAudio}
        setPlayingAudioBook={setPlayingAudioBook}
        setCurrentAudio={setCurrentAudio}
        setCurrentPageIndex={setCurrentPageIndex}
        setSelectedButton={setSelectedButton}
        landscapeBookData={landscapeBookData}
        flip={flip}
      />
    );
  }, [
    replaceName,
    loading,
    currentPortraitPage,
    portraitBookData,
    isPortrait,
    currentAudio,
    landscapeBookData,
  ]);

  const toggleSettings = () => setOpenSettings((prev) => !prev);

  const playFlipSound = (e) => {
    if (pageFlipAudio.currentTime > 0) {
      pageFlipAudio.pause();
      pageFlipAudio.currentTime = 0;
    }
    pageFlipAudio.play();
  };

  function flip(pageIndex, goingBack, reset) {
    if (isPortrait) {
      if (currentAudio) {
        currentAudio.pause();
      }
      setCurrentAudio(null);
      if (reset) {
        setCurrentPortraitPage(0);
        setSelectedButton([]);
      } else {
        setCurrentPortraitPage(pageIndex);
        if (goingBack) {
          setSelectedButton((prev) => {
            const updatedData = [...prev];
            updatedData.pop();
            return updatedData;
          });
        } else {
          setSelectedButton((prev) => [...prev, pageIndex]);
        }
      }
    } else {
      bookRef.current.pageFlip().flip(pageIndex);
    }
    playFlipSound();
  }

  return (
    <>
      <Wrapper
        style={{
          // position:
          //   typeof replaceName == "boolean" && !isPortrait ? "fixed" : "static",
          // backgroundColor: "blue",
          // height:
          //   typeof replaceName == "boolean" && !isPortrait
          //     ? "100vh"
          //     : undefined,
          border: "3px solid #ccc",
          borderTopWidth: "1px",
        }}
      >
        <section className="section-center">
          <div className="book-wrapper">
            <Snowfall
              snowflakeCount={100}
              style={{ zIndex: 1, opacity: "60%" }}
            />
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "2rem",
                  color: "#fff",
                }}
              >
                <h1> Loading...</h1>
              </div>
            ) : (
              <>
                {!!book && (
                  <div className="action-wrapper">
                    <div
                      className="flip-book-container"
                      style={{ zIndex: 100 }}
                    >
                      {book}
                    </div>
                    <BookController
                      music={music}
                      playingAudioBook={playingAudioBook}
                      playingMusic={playingMusic}
                      setPlayingMusic={setPlayingMusic}
                      soundEffect={soundEffect}
                      toggleSettings={toggleSettings}
                      playText={playText}
                      setPlaytts={setPlaytts}
                    />
                  </div>
                )}
                {typeof replaceName == "boolean" && (
                  <div className="global-action-container">
                    <button
                      className="btn global-action-btn"
                      onClick={() => {
                        const targetIndex =
                          selectedButton[selectedButton.length - 2];
                        if (targetIndex != undefined) {
                          flip(targetIndex, true);
                        } else if (
                          currentPageIndex != 0 ||
                          selectedButton.length > 0
                        ) {
                          flip(0, true);
                        }
                      }}
                    >
                      <LuMoveLeft />
                      Previous Page
                    </button>
                    <button
                      className="btn global-action-btn"
                      onClick={() => {
                        if (
                          currentPageIndex != 0 ||
                          selectedButton.length > 0
                        ) {
                          flip(0, true, true);
                        }
                      }}
                    >
                      <ResetIcon />
                      Restart Book
                    </button>
                    <button
                      className="btn global-action-btn"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      <MdHomeFilled />
                      Home
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </Wrapper>
      <BookNameChangeModal
        openNameReplaceModal={openNameReplaceModal}
        setOpenNameReplaceModal={setOpenNameReplaceModal}
        setReplaceName={setReplaceName}
      />
      <AudioBookSettings
        audioSettings={audioSettings}
        openSettings={openSettings}
        setAudioSettings={setAudioSettings}
        setUpdatedAudioSetting={setUpdatedAudioSetting}
        toggleSettings={toggleSettings}
        updatedAudioSettings={updatedAudioSettings}
        currentAudio={currentAudio}
        playingAudioBook={playingAudioBook}
        setCurrentAudio={setCurrentAudio}
        setPlayingAudioBook={setPlayingAudioBook}
      />
    </>
  );
};

export default ViewBook;

export const ModalWrapper = styled.div`
  .info-box {
    border: 1px solid var(--clr-dark-blue);
    margin-bottom: 0.5rem;
    padding: 1rem;
    color: var(--clr-dark-blue);

    .speed-setting-container {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .ant-slider-track {
        background-color: #050162;
      }

      .ant-slider .ant-slider-handle::after {
        background-color: #050162;
        box-shadow: 0 0 0 5px #050162;
      }
      .speed-setting-icon-container {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .btns-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    .btn-outline {
      color: var(--clr-dark-blue);
      border: 1px solid var(--clr-dark-blue);
    }
    .btn-yellow {
      background-color: var(--clr-yellow-light);
      color: white;
    }
  }
  .resend-btn {
    background: none;
    border: none;
    text-decoration: underline;
    color: #0ea1e0;
  }

  .radio-text {
    color: #050162;
  }
`;
const Wrapper = styled.div`
  padding: 3rem 0;
  min-height: 85vh;
  background: url("/static/media/snow_bg.8d6228c93bd45b7ff9dc.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: fit-content;

  .book-wrapper {
    .action-wrapper {
      .action-container {
        padding-top: 2rem;
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
      }
    }

    .action-wrapper {
      margin: 0 auto;
    }

    .flip-book-container {
      background-color: white;
      margin: 0 auto;
      box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
      .portrait-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        .book-text {
          p {
            font-size: 1rem;
          }
          .book-content {
            font-size: 1rem !important;
          }
          background-color: white;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      .book-text {
        padding: 2rem;
        display: grid;
        align-content: space-between;
        overflow-y: scroll;
        background-color: white;
        &::-webkit-scrollbar {
          display: none;
        }

        .chapter-name {
          text-transform: capitalize;
          margin-top: 1rem;
          color: var(--clr-dark-blue);
        }

        .book-content {
          font-family: "Roboto";
          line-height: 1.75;
          display: grid;
          gap: 1rem;
          font-size: 1rem;
          margin-top: 2rem;
        }

        .book-btns {
          margin-top: 1rem;
          .btn-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 1rem;
            p {
              line-height: 1.8;
            }
          }
          .btn-text {
            color: var(--clr-dark-blue);
            font-weight: 700;
            margin-bottom: 1rem;
          }

          .btn {
            width: fit-content;
            border: 1px solid var(--clr-dark-blue);
            color: var(--clr-dark-blue);
            text-align: start !important;
            text-transform: none !important;
            transition: all 0.1s;
          }
          .btn:hover,
          .active-button {
            /* background-color:  var(--clr-yellow-light); */
            background: linear-gradient(
              90deg,
              var(--clr-yellow),
              var(--clr-yellow-light)
            );
            color: var(--clr-black);
            border: 1px solid var(--clr-yellow-light);
          }
        }
      }
      .book-img {
        img {
          height: 100%;
        }
      }
    }
    .global-action-container {
      margin: 0 auto;
      padding-top: 2rem;
    }
    .global-action-container:disabled {
      cursor: not-allowed;
    }

    .global-action-btn {
      background-color: #ffffff;
      display: flex;
      margin-right: 1rem;
      width: fit-content;
      margin-bottom: 1rem;
      /* border: 1px solid var(--clr-dark-blue); */
      color: var(--clr-dark-blue);
    }
  }

  @media ${deviceMin.tablet} {
    .book-wrapper {
      .flip-book-container {
        /* min-width: 38rem;
        max-width: 45rem;
        height: 32.25rem; */
        width: 60rem;
      }
      .global-action-container {
        width: 60rem;
        display: flex;

        .global-action-btn {
          margin-bottom: 0rem;
        }
      }
      .book-text {
        background: linear-gradient(
          270deg,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(255, 255, 255, 1) 50%
        );
      }
    }
  }

  @media ${deviceMin.desktop} {
    .book-wrapper {
      .action-wrapper {
        width: 65rem;
        display: flex;
        justify-content: center;

        .action-container {
          padding: 0 1rem;
          flex-direction: column;
        }
      }

      .flip-book-container {
        /* min-width: 52rem;
        max-width: 52rem; */
        width: 60rem;
      }
      .global-action-container {
        width: 65rem;
        display: flex;
      }
      .book-text {
        background: linear-gradient(
          270deg,
          rgba(0, 0, 0, 0.2) 0%,
          rgba(255, 255, 255, 1) 50%
        );
        .chapter-name {
          margin-bottom: 1rem;
        }
      }
    }
  }
`;

// const Container = styled.div`

// `;
