import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { createFormSchema } from './CreateForm';
import * as z from 'zod';
import { TinyMCE } from '../common/TinyMCE';
import { cn } from '@/lib/utils';

interface Props {
  isEdit?: boolean;
}

export function SupportSection({ isEdit }: Props) {
  const { control } = useFormContext<z.infer<typeof createFormSchema>>();

  return (
    <div className="mb-10 rounded border border-slate-200 p-10">
      <h1 className="font-base">Support</h1>
      <p className="form-subheading">What support are you looking for?</p>
      <hr className="border-b-1 my-8 border-slate-200" />
      <div
        className={cn('grid gap-10', isEdit ? 'grid-cols-1' : 'grid-cols-2')}
      >
        {!isEdit && (
          <div className="col-span-1 pr-4">
            <h2 className="font-base text-xl">Collaborators</h2>
            <p>
              Specify the type of collaborators you need, technical or
              non-technical, advisors, audiences, or allies. Provide a project
              description to invite people to assist you.
            </p>
          </div>
        )}
        <div className="col-span-1">
          <FormField
            control={control}
            name="collaborators"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormLabel>
                    {"List the collaborators you're looking for"}
                  </FormLabel>
                  <FormControl>
                    <TinyMCE
                      {...rest}
                      onEditorChange={(value, editor) => {
                        onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {"Leave blank if you don't need any collaborators"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
