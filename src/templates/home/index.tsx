import React, { useRef } from 'react';
import { Container, Typography, Link, Box, Button } from '@mui/material';

export default function Index() {
  const imgRef = useRef(null);
  const handleScan = async () => {
    if (!(`BarcodeDetector` in window)) {
      alert(`Chrome ブラウザで実行してください`);
      return;
    }
    const formats = await window.BarcodeDetector.getSupportedFormats();
    console.log(formats);
    const detector = new window.BarcodeDetector();
    console.log(detector);
    const decotionList = await detector.detect(imgRef.current);
    console.log(decotionList);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gatsby example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Box>
          <img
            ref={imgRef}
            style={{ width: `100%`, height: `100%` }}
            src="/assets/jis.jpg"
            alt="jis"
          />
        </Box>
        <Button onClick={handleScan} variant="contained">
          スキャン
        </Button>
      </Box>
    </Container>
  );
}
