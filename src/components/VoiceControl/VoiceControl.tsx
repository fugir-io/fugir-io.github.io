/// <reference path="../../types/speech.d.ts" />

import React from "react";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import styles from "./VoiceControl.module.css";

interface VoiceControlProps {
  className?: string;
}

export const VoiceControl: React.FC<VoiceControlProps> = ({
  className = "",
}) => {
  console.log("VoiceControl component rendering");

  const {
    isListening,
    isSupported,
    startListening,
    stopListening,
    transcript,
    error,
  } = useVoiceRecognition();

  console.log("Voice Recognition state:", { isListening, isSupported, error });

  if (!isSupported) {
    console.log("Speech Recognition not supported, rendering fallback");
    return (
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "white",
          padding: "5px",
          fontSize: "12px",
          borderRadius: "4px",
        }}
      >
        Voice not supported
      </div>
    );
  }

  return (
    <div className={`${styles.voiceControl} ${className}`}>
      <button
        onClick={isListening ? stopListening : startListening}
        className={`${styles.voiceButton} ${isListening ? styles.listening : ""}`}
        title={
          isListening ? "Stop voice recognition" : "Start voice recognition"
        }
        type="button"
      >
        {isListening ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path
              d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"
              fill="currentColor"
            />
            <path
              d="M19 10v1a7 7 0 0 1-14 0v-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="12"
              y1="19"
              x2="12"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="8"
              y1="23"
              x2="16"
              y2="23"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>

      {isListening && (
        <div className={styles.voiceFeedback}>
          <div className={styles.listeningIndicator}>
            <span className={styles.pulseDot}></span>
            Listening...
          </div>
        </div>
      )}

      {transcript && (
        <div className={styles.voiceTranscript}>
          <span>"{transcript}"</span>
        </div>
      )}

      {error && (
        <div className={styles.voiceError}>
          <span>Error: {error}</span>
        </div>
      )}
    </div>
  );
};
