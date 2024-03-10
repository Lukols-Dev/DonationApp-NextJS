import React, { useRef, useState } from "react";
import { Label } from "./label";

interface AudioUploaderProps {
  price?: number;
  onFileLoaded: (audioBlob: Blob, duration: number) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({
  price,
  onFileLoaded,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null); // Dodano stan dla długości nagrania
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = event.target.files;

    if (files && files[0]) {
      const audioFile = files[0];

      // Sprawdzenie typu pliku audio
      if (!audioFile.type.startsWith("audio/")) {
        setError("Proszę wybrać plik audio.");
        return;
      }

      const url = URL.createObjectURL(audioFile);
      if (audioRef.current) {
        audioRef.current.src = url;

        // Event załadowania metadanych pliku
        audioRef.current.onloadedmetadata = () => {
          if (audioRef.current) {
            const audioDuration = audioRef.current.duration;
            if (audioDuration > 10) {
              setError("Długość pliku przekracza 10 sekund.");
              setDuration(null); // Reset długości nagrania w stanie
            } else {
              setDuration(audioDuration); // Aktualizacja stanu z długością nagrania
              onFileLoaded(audioFile, audioDuration); // Wywołanie funkcji callback z plikiem audio i jego długością
            }
          }
        };
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground">
        Dodaj dźwięk (koszt: {price} PLN/1s)
      </Label>
      <input type="file" accept="audio/*" onChange={handleAudioChange} />
      {error && <div className="text-red-500">{error}</div>}
      {duration !== null && <div>Plik ma {duration.toFixed(2)} sekund.</div>}
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        preload="metadata"
      ></audio>
    </div>
  );
};

export default AudioUploader;
