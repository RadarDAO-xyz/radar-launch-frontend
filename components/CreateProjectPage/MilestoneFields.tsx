import { TrashIcon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TinyMCE } from '../Layout/TinyMCE';
import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

export const MilestoneFields = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'milestones',
    control,
  });

  return (
    <fieldset>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-6"
        >
          <div className="flex justify-between gap-4">
            <FormField
              key={field.id + 'amount'}
              name={`milestones.${index}.amount`}
              render={({ field }) => (
                <FormItem className="pb-4 w-full">
                  <FormControl>
                    <Input {...field} placeholder="$" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={'ghost'} onClick={() => remove(index)}>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
          <FormField
            key={field.id + 'text'}
            name={`milestones.${index}.text`}
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
