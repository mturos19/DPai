import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import VoiceRecorder from '../components/VoiceRecorder/VoiceRecorder';

const VoiceSetup: React.FC = () => {
  const [recordings, setRecordings] = useState<Blob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecordingComplete = (audioBlob: Blob) => {
    setRecordings(prev => [...prev, audioBlob]);
  };

  const handleSubmit = async () => {
    if (recordings.length === 0) {
      alert('Please record at least one voice sample');
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Implement API call to process voice samples
      console.log('Processing voice samples...');
      // const formData = new FormData();
      // recordings.forEach((blob, index) => {
      //   formData.append(`recording${index}`, blob);
      // });
      // await api.processVoiceSamples(formData);
    } catch (error) {
      console.error('Error processing voice samples:', error);
      alert('Error processing voice samples. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Voice Setup
        </Typography>
        
        <Typography variant="body1" paragraph>
          Please record several voice samples to help us create your personalized voice model.
          Try to speak clearly and naturally.
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
        </Paper>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recorded Samples: {recordings.length}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={recordings.length === 0 || isProcessing}
            sx={{ mt: 2 }}
          >
            {isProcessing ? 'Processing...' : 'Submit Voice Samples'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VoiceSetup; 