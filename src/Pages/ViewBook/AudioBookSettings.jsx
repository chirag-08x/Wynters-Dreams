import React from "react";
import Modal from "../../Components/Modal/Modal";
import { ModalWrapper } from "./ViewBook";
import { RiSettings5Fill } from "react-icons/ri";
import TurtleIcon from "../../assets/icons/TurtleIcon";
import RabbitIcon from "../../assets/icons/RabbitIcon";
import { Radio, Slider } from "antd";

export default function AudioBookSettings({
  toggleSettings,
  openSettings,
  setUpdatedAudioSetting,
  updatedAudioSettings,
  audioSettings,
  setAudioSettings,
  playingAudioBook,
  currentAudio,
  setPlayingAudioBook,
  setCurrentAudio,
}) {
  return (
    <Modal closeModal={toggleSettings} isModalOpen={openSettings}>
      <ModalWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "4px",
          }}
        >
          <RiSettings5Fill color="#050162" size={38} />
        </div>
        <h3 style={{ textAlign: "center" }}>Audio Book Settings</h3>
        <div className="info-box">
          <p>
            You can choose the speed and the accent of the text to speech
            feature here
          </p>
        </div>
        <div className="info-box">
          <div className="speed-setting-container">
            <div className="speed-setting-icon-container">
              <p>Slow</p>
              <p>Fast</p>
            </div>
            <div className="speed-setting-icon-container">
              <TurtleIcon size={24} />
              <RabbitIcon size={24} />
            </div>
            <Slider
              min={0.25}
              max={2}
              step={0.25}
              // tooltip={false}
              onChange={(v) =>
                setUpdatedAudioSetting((prev) => ({
                  ...prev,
                  speed: v,
                }))
              }
              value={updatedAudioSettings.speed}
            />
          </div>
        </div>
        <div className="info-box">
          <p>Choose the accent from the options below:</p>
          <Radio.Group
            onChange={(e) => {
              setUpdatedAudioSetting((prev) => ({
                ...prev,
                voice: e.target.value,
              }));
            }}
            name="radiogroup"
            value={updatedAudioSettings.voice}
          >
            <Radio value="en-IN_en-IN-Neural2-D">
              <p className="radio-text">Indian</p>
            </Radio>
            <Radio value="en-GB_en-GB-Neural2-C">
              <p className="radio-text">British</p>
            </Radio>
            <Radio value="en-US_en-US-Standard-C">
              <p className="radio-text">American</p>
            </Radio>
          </Radio.Group>
        </div>
        <div className="btns-container">
          <button
            onClick={() => {
              setUpdatedAudioSetting(audioSettings);
              toggleSettings();
            }}
            className="btn btn-outline"
          >
            Don't Save Change
          </button>
          <button
            onClick={() => {
              if (playingAudioBook) {
                currentAudio?.pause();
              }
              setPlayingAudioBook(false);
              setCurrentAudio(null);
              setAudioSettings(updatedAudioSettings);
              toggleSettings();
            }}
            className="btn btn-yellow"
          >
            Save Changes
          </button>
        </div>
      </ModalWrapper>
    </Modal>
  );
}
