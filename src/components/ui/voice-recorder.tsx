import React, { useState, useEffect, useRef } from "react";
import { Label } from "./label";

interface VoiceRecorderProps {
  maxRecordingTime?: number;
  onRecordingComplete?: (audioBlob: Blob, recordingLength: number) => void;
  price?: number;
}

const VoiceRecorder = ({
  maxRecordingTime = 30,
  onRecordingComplete,
  price,
}: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    audioChunksRef.current = [];
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsLoading(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current as NodeJS.Timeout);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      navigator.mediaDevices &&
      window.MediaRecorder
    ) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.addEventListener(
            "dataavailable",
            (event) => {
              if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
              }
            }
          );

          mediaRecorderRef.current.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/mp4",
            });
            setAudioUrl(URL.createObjectURL(audioBlob));
            setIsLoading(false);
            onRecordingComplete?.(audioBlob, recordingTime);
          });
        })
        .catch((err) => console.error("Error accessing the microphone", err));
    }
  }, [onRecordingComplete]);

  useEffect(() => {
    if (recordingTime >= maxRecordingTime) {
      stopRecording();
    }
  }, [recordingTime, maxRecordingTime]);

  return (
    <div className="flex flex-col gap-y-2">
      <Label className="text-muted-foreground">
        Nagraj dźwięk (koszt: {price} PLN/1s)
      </Label>
      <div className="flex gap-4 items-center">
        <button
          className={`border-2 rounded-md px-3 py-2 cursor-pointer ${
            isRecording ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={startRecording}
          disabled={isRecording}
        >
          Start
        </button>
        <button
          className="border-2 rounded-md px-3 py-2 cursor-pointer bg-gray-300"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Stop
        </button>
        <span className="text-sm">
          Czas nagrania: {recordingTime}s / {maxRecordingTime}s
        </span>
      </div>
      {!isLoading ? (
        audioUrl ? (
          <audio src={audioUrl} controls className="mt-2" />
        ) : (
          <></>
        )
      ) : (
        <span>trwa nagrywanie...</span>
      )}
    </div>
  );
};

export default VoiceRecorder;
