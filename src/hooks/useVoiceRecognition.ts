import { useCallback, useEffect, useRef, useState } from "react";
import { useAppsStore } from "@/stores/useAppsStore";
import type { AppID } from "@/stores/useAppsStore";

interface VoiceRecognitionHook {
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  confidence: number;
  error: string | null;
}

// Map of speech patterns to app IDs
const APP_NAME_MAP: Record<string, AppID> = {
  finder: "finder",
  wallpapers: "wallpapers",
  wallpaper: "wallpapers",
  safari: "safari",
  browser: "safari",
  calculator: "calculator",
  calc: "calculator",
  calendar: "calendar",
  "vs code": "vscode",
  vscode: "vscode",
  "visual studio code": "vscode",
  "app store": "appstore",
  appstore: "appstore",
  terminal: "terminal",
  developer: "developer",
  "about developer": "developer",
  "about the developer": "developer",
};

export const useVoiceRecognition = (): VoiceRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { openApp } = useAppsStore();

  // Check if Speech Recognition is supported
  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const processVoiceCommand = useCallback(
    (text: string) => {
      const lowerText = text.toLowerCase().trim();

      // Check for "open [app name]" pattern
      const openMatch = lowerText.match(/^open\s+(.+)$/);
      if (openMatch) {
        const appName = openMatch[1].trim();
        const appId = APP_NAME_MAP[appName];

        if (appId) {
          openApp(appId);
          return true;
        }
      }

      return false;
    },
    [openApp],
  );

  const startListening = useCallback(() => {
    if (!isSupported || recognitionRef.current) return;

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Changed to false for better reliability
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.maxAlternatives = 1;

      // Add timeout to prevent hanging
      setTimeout(() => {
        if (recognitionRef.current) {
          recognition.stop();
        }
      }, 10000); // 10 second timeout

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence);

            // Process the command
            if (processVoiceCommand(finalTranscript)) {
              // Stop listening after successful command
              recognition.stop();
            }
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event) => {
        console.log("Speech recognition error:", event.error);
        if (event.error === "network") {
          setError("Network error - check internet connection");
        } else if (event.error === "not-allowed") {
          setError("Microphone access denied");
        } else if (event.error === "no-speech") {
          setError("No speech detected - try again");
        } else {
          setError(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setError("Failed to start voice recognition");
      setIsListening(false);
    }
  }, [isSupported, processVoiceCommand]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    transcript,
    confidence,
    error,
  };
};
