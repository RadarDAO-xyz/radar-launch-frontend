import { AdminNav } from "@/components/AdminNav";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@/types/mongo";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TinyMCE } from "@/components/Layout/TinyMCE";
import { Button } from "@/components/ui/button";

async function updateUser(values: Partial<User>, idToken: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/users/${values._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(values),
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to update user");
  }
  return await res.json();
}

async function updateAvatar(values: any, idToken: string, userId: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(values),
  });
  return await res.json();
}

// TODO: create separate form schema distinct from User
export default function UpdateProfile() {
  const { data } = useGetCurrentUser();
  const { idToken } = useContext(AuthContext);
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      name: data ? data.name : "",
      socials: data ? data.socials : "",
      bio: data ? data.bio : "",
      profile: data ? data.profile : "",
    },
  });
  const { handleSubmit, watch, control } = form;

  const onSubmit: SubmitHandler<Omit<User, "_id" | "wallets">> = (formData) => {
    try {
      if (data) updateUser({ ...formData, _id: data._id }, idToken);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFiles = () => {
    const files = getFiles();
    try {
      if (data) updateAvatar(files[0], idToken, data?._id);
    } catch (error) {
      console.log(error);
    }
  };

  function getFiles() {
    const fileInput: any = document.querySelector('input[type="file"]');
    return fileInput?.files;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-24 max-w-screen-lg mx-auto"
      >
        <AdminNav isUpdateProfile={true} />
        <div className="border border-slate-200 rounded p-10 mb-10">
          <div className="flex gap-4">
            <div>
              <div>
                <label>Profile Image</label>
                <input className="text-sm italic w-full" type="file" />
                <Button
                  onClick={uploadFiles}
                  type="button"
                  className="bg-black text-white rounded leading-10 px-5 mt-4"
                >
                  Upload
                </Button>
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
                      <Input placeholder="https://" type="url" {...field} />
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
          >
            Update Your Bio
          </Button>
        </div>
      </form>
    </Form>
  );
}
