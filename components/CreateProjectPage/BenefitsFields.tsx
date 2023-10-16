import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TinyMCE } from '../common/TinyMCE';
import { Button } from '../ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { TrashIcon } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

export const BenefitsFields = ({ children }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'benefits',
    control,
  });

  return (
    <fieldset>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-6">
          <FormField
            key={field.id + 'amount'}
            control={control}
            name={`benefits.${index}.amount`}
            render={({ field }) => (
              <FormItem className="pb-4">
                <div className="flex items-center space-x-4">
                  <FormControl>
                    <Input {...field} type="number" placeholder="#" />
                  </FormControl>
                  <FormLabel className="mb-0 w-full">
                    editions collected
                  </FormLabel>
                  <Button variant={'ghost'} onClick={() => remove(index)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={field.id + 'text'}
            control={control}
            name={`benefits.${index}.text`}
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormControl>
                    <TinyMCE
                      {...rest}
                      onEditorChange={(value, editor) => {
                        onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      ))}
      <Button
        variant={'ghost'}
        type="button"
        className="w-full"
        onClick={() => append({ amount: '', text: '' })}
      >
        + add another
      </Button>
    </fieldset>
  );
};
