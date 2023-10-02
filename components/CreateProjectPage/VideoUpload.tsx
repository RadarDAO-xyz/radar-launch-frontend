import { cn } from '@/lib/utils';
import { useCreateAsset } from '@livepeer/react';
import { FileUpIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { createFormSchema } from './CreateForm';

export const VideoUpload = () => {
  const { control, setError, setValue } =
    useFormContext<z.infer<typeof createFormSchema>>();

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

  useEffect(() => {
    if (error?.message) {
      setError('video_url', {
        message: error.message,
      });
    } else if (video && video?.type !== 'video/mp4') {
      setError('video_url', {
        message: 'Only .mp4 files are supported',
      });
    }
  }, [error, setError, video]);

  useEffect(() => {
    if (data?.[0].storage?.ipfs?.cid && data?.[0].id) {
      console.log('File uploaded', data[0]);
      setValue('video_url', `ipfs://${data[0].storage?.ipfs?.cid}`);
      setValue('video_id', data[0].id);
    }
  }, [data, setValue]);

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
    disabled: Boolean(data?.[0]?.id),
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
    <FormField
      control={control}
      name="video_url"
      render={({ field }) => (
        <FormItem className="pb-4">
          <FormControl>
            <div
              {...getRootProps()}
              className={cn(
                'flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-8',
                isDragActive && 'border-gray-400 bg-slate-100',
                video && 'bg-slate-100/50',
              )}
            >
              {video ? (
                <div className="text-center">
                  <h4 className="pb-2">{video.name}</h4>
                  {data?.[0].id ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Video successfully uploaded to IPFS! 🎉
                    </p>
                  ) : (
                    <Button
                      onClick={() => {
                        createAsset?.();
                      }}
                      disabled={!createAsset || status === 'loading'}
                    >
                      {progressFormatted ? progressFormatted : 'Upload to IPFS'}
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <Input type="file" accept=".mp4" {...getInputProps()} />
                  <FileUpIcon width={30} height={30} className="mb-2" />
                  <h4 className="text-xl font-semibold">Upload Video</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Only .mp4 files are supported
                  </p>
                </>
              )}
            </div>
          </FormControl>
          <FormDescription>
            Share a brief 3-minute video introducing your vision for a better
            future.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
