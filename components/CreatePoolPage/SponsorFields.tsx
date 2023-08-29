import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TinyMCE } from '../Layout/TinyMCE';
import { Button } from '../ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { TrashIcon } from 'lucide-react';
import { createPoolFormSchema } from '@/pages/pool/create';
import * as z from 'zod';

export const SponsorFields = () => {
  const { control } = useFormContext<z.infer<typeof createPoolFormSchema>>();
  const { fields, append, remove } = useFieldArray({
    name: 'sponsors',
    control,
  });

  return (
    <fieldset>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-6 flex gap-4">
          <FormField
            key={field.id + 'name'}
            control={control}
            name={`sponsors.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={field.id + 'logo'}
            control={control}
            name={`sponsors.${index}.logo`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="logo" type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={field.id + 'link'}
            control={control}
            name={`sponsors.${index}.link`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="link" type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={field.id + 'contribution'}
            control={control}
            name={`sponsors.${index}.contribution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribution</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="contribution" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={'ghost'} onClick={() => remove(index)}>
            <TrashIcon className="h-4 w-4" />
          </Button>
          <hr className="my-2" />
        </div>
      ))}
      <Button
        variant={'ghost'}
        type="button"
        onClick={() =>
          append({ logo: '', link: '', name: '', contribution: 0 })
        }
      >
        + add sponsor
      </Button>
    </fieldset>
  );
};
