// app/hooks/useVideoExport.ts
import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setExportStatus,
  setExportProgress,
  setOutputUrl,
} from '../store/slices/exportSlice';

export function useVideoExport() {
  const dispatch = useAppDispatch();
  const { format } = useAppSelector(state => state.export);
  const [exportInterval, setExportInterval] = useState<NodeJS.Timeout | null>(null);

  const startExport = useCallback(() => {
    dispatch(setExportStatus('rendering'));
    dispatch(setExportProgress(0));

    // Simulate export process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      dispatch(setExportProgress(progress));

      if (progress >= 100) {
        clearInterval(interval);

        // Set a mock output URL
        dispatch(setOutputUrl(`mock-video.${format}`));
        dispatch(setExportStatus('success'));
      }
    }, 300);

    setExportInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dispatch, format]);

  const cancelExport = useCallback(() => {
    if (exportInterval) {
      clearInterval(exportInterval);
      setExportInterval(null);
    }

    dispatch(setExportStatus('idle'));
    dispatch(setExportProgress(0));
  }, [dispatch, exportInterval]);

  return { startExport, cancelExport };
}