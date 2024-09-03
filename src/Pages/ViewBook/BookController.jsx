import React from "react";
import MusicButton from "../../assets/icons/Music_Button";
import SettingsButton from "../../assets/icons/SettingsButton";
import {
  AudioButton,
  DisabledAudioButton,
} from "../../assets/icons/AudioButton";

export default function BookController({
  soundEffect,
  music,
  setPlayingMusic,
  playingMusic,
  playingAudioBook,
  toggleSettings,
  playText,
  setPlaytts,
}) {
  const handleMusic = () => {
    if (soundEffect) {
      if (playingMusic) {
        soundEffect.pause();
      } else {
        soundEffect.play();
      }
    }
    if (music) {
      if (playingMusic) {
        music.pause();
      } else {
        music.play();
      }
      setPlayingMusic((prev) => !prev);
    }
  };

  return (
    <div className="action-container">
      <div style={{ cursor: "pointer" }} onClick={handleMusic}>
        <MusicButton disabled={!playingMusic} />
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setPlaytts((prev) => {
            return !prev;
          });
        }}
      >
        {playingAudioBook ? (
          <DisabledAudioButton key={"diabled-audio-button"} />
        ) : (
          <AudioButton key={"audio-button"} />
        )}
      </div>
      <div style={{ cursor: "pointer" }} onClick={toggleSettings}>
        <SettingsButton disabled={false} key={"settings-button"} />
      </div>
    </div>
  );
}
