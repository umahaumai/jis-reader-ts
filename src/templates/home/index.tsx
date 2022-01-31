import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import Webcam from 'react-webcam';
import {
  Typography,
  Box,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  styled,
  TableCell,
  tableCellClasses,
  TableBody,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Decotion {
  format?: string;
  rawValue?: string;
}

interface ScanResult {
  date: string;
  format: string;
  code: string;
}

export default function Index() {
  const [isSupported, setIsSupported] = useState(true);
  const webcamRef = useRef<Webcam>(null);
  const [results, setResults] = useState<ScanResult[]>([]);

  const run = async () => {
    if (!webcamRef.current?.video || !webcamRef.current?.video?.readyState) {
      return;
    }
    const detector = new window.BarcodeDetector();
    const decotionList = (await detector.detect(
      webcamRef.current?.video,
    )) as Decotion[];
    if (!decotionList?.length) {
      return;
    }
    let lastDecotion;
    decotionList.map((decoded) => {
      if (decoded.rawValue === lastDecotion?.rawValue) {
        return;
      }
      setResults((org) => [
        {
          date: dayjs().format(),
          format: decoded.format,
          code: decoded.rawValue,
        },
        ...org,
      ]);
      lastDecotion = decoded;
    });
  };

  const mainLoop = async () => {
    if (!isSupported) {
      return;
    }

    try {
      await run();
      setTimeout(mainLoop, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!(`BarcodeDetector` in window)) {
      setIsSupported(false);
      return;
    }
    if (webcamRef.current?.video) {
      mainLoop();
    }
  }, []);

  return (
    <Box maxWidth="md" p={8}>
      <Typography variant="h3" component="h1" gutterBottom>
        BarcodeDetector sample
      </Typography>
      {!isSupported ? (
        <Alert color="error">Chrome ブラウザで実行してください</Alert>
      ) : (
        <Box display="flex" justifyContent="center">
          <Webcam
            audio={false}
            width={540}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1920,
              height: 1080,
              facingMode: `environment`,
            }}
          />
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="result table">
          <TableHead>
            <TableRow>
              <StyledTableCell>time</StyledTableCell>
              <StyledTableCell>format</StyledTableCell>
              <StyledTableCell>code</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result: ScanResult, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {result.date}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {result.format}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {result.code}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
