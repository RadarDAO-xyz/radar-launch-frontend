import { AuthContext } from "@/components/AuthProvider";
import { TinyMCE } from "@/components/Layout/TinyMCE";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

async function updateUser(
  values: z.infer<typeof schema>,
  userId: string,
  idToken: string
) {
  const formData = new FormData();
  const newValues = { ...values, profile: values.profile.name };
  formData.append("payload_json", JSON.stringify(newValues));

  const res = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: formData,
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to update user");
  }
  return await res.json();
}

const schema = z.object({
  name: z.string().min(1, { message: "Please enter a valid name" }),
  socials: z.string().url({ message: "Please enter a valid URL" }),
  bio: z.string(),
  profile: z.instanceof(File),
  email: z.string().email({ message: "Please enter a valid email" }),
});

export function UpdateForm() {
  const { data } = useGetCurrentUser();
  const { idToken } = useContext(AuthContext);
  const form = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    defaultValues: {
      name: data ? data.name : "",
      socials: data ? data.socials : "",
      bio: data ? data.bio : "",
      email: data ? data.email : "",
    },
  });
  const { handleSubmit, control } = form;

  const onSubmit = (formData: z.infer<typeof schema>) => {
    try {
      if (data && idToken !== "") {
        updateUser(formData, data._id, idToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-24 max-w-screen-lg mx-auto"
      >
        <div className="border border-slate-200 rounded p-10 mb-10">
          <div className="flex gap-4">
            <div>
              <div>
                <FormField
                  control={control}
                  name="profile"
                  render={({ field }) => {
                    const { value, onChange, ...rest } = field;
                    return (
                      <FormItem className="pb-4">
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            type="file"
                            onChange={(event) => {
                              console.log(
                                event.target.files,
                                event.target.files?.[0]
                              );
                              if (event.target.files) {
                                onChange(event.target.files[0]);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="grow">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grow">
              <FormField
                control={control}
                name="socials"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Where people can find you</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://" type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <FormField
            control={control}
            name="bio"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem className="pb-4">
                  <FormLabel>Your Bio</FormLabel>
                  <FormControl>
                    <TinyMCE
                      {...rest}
                      onEditorChange={(value, editor) => {
                        onChange(value);
                      }}
                      init={{
                        className: "w-full input-field mb-2",
                        placeholder: "Something about yourself...",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <hr className="border-b-1 border-slate-200 my-8" />
          <Button
            className="bg-black text-white rounded leading-10 px-5"
            type="submit"
            disabled={data === undefined || idToken === ""}
          >
            {data === undefined || idToken === ""
              ? "Please Sign In"
              : "Update Your Bio"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
