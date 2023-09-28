import { useCreateAsset } from '@livepeer/react';

import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FileUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VideoUpload = () => {
  const [video, setVideo] = useState<File | undefined>();
  const {
    mutate: createAsset,
    data,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [
            {
              name: video.name,
              file: video,
              storage: {
                ipfs: true,
              },
            },
          ] as const,
        }
      : null,
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'video/*': ['*.mp4'],
    },
    maxFiles: 1,
    onDrop,
  });

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  );

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          'flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-6',
          isDragActive && 'border-gray-400 bg-slate-100',
          video && 'bg-slate-100/50',
        )}
      >
        <input type="file" {...getInputProps()} />
        {video ? (
          <div className="text-center">
            <h4>{video.name}</h4>
            <Button
              onClick={() => {
                createAsset?.();
              }}
              disabled={!createAsset || status === 'loading'}
            >
              {progressFormatted ? progressFormatted : 'Upload to IPFS'}
            </Button>
          </div>
        ) : (
          <>
            <FileUpIcon width={30} height={30} className="mb-2" />
            <h4 className="text-xl font-bold">Upload Video</h4>
            <p className="mt-2 text-sm text-gray-600">
              Only .mp4 files are supported
            </p>
          </>
        )}
      </div>

      {error?.message && (
        <p className="py-2 font-medium text-destructive">{error.message}</p>
      )}
    </>
  );
};
