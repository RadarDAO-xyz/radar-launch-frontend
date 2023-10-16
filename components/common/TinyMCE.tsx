import { Editor, IAllProps } from '@tinymce/tinymce-react';

export function TinyMCE({ init, ...props }: IAllProps) {
  return (
    <Editor
      apiKey={process.env.TINYMCE_API_KEY}
      init={{
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'preview',
          'wordcount',
          'quickbars',
          'autoresize',
        ],
        toolbar:
          'undo redo | blocks | fontsize | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat link quickimage',
        menubar: false,
        ...init,
      }}
      {...props}
    />
  );
}
