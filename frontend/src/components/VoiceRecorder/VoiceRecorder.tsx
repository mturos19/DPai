import React, { useState, useRef } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import './VoiceRecorder.css';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box className="voice-recorder">
      <Typography variant="h6" gutterBottom>
        Voice Recording
      </Typography>
      
      <Box className="recording-controls">
        {!isRecording ? (
          <Button
            variant="contained"
            color="primary"
            onClick={startRecording}
            startIcon={<span className="record-icon" />}
          >
            Start Recording
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={stopRecording}
            startIcon={<span className="stop-icon" />}
          >
            Stop Recording
          </Button>
        )}
      </Box>

      {isRecording && (
        <Box className="recording-status">
          <CircularProgress size={20} />
          <Typography variant="body2" color="textSecondary">
            Recording: {formatTime(recordingTime)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VoiceRecorder; 