import { AdminNav } from "@/components/AdminNav";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@/types/mongo";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

async function updateUser(values: User, idToken: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/users/${values._id}`, {
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
  const { data } = useGetCurrentUser()
  const { idToken } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({
    mode: "onBlur",
    defaultValues: {
      name: data ? data.name : '',
      socials: data ? data.socials : '',
      bio: data ? data.bio : ''
    }
  });

  const onSubmit: SubmitHandler<User> = (formData) => {
    try {
      if (data)
        updateUser({ ...formData, _id: data._id }, idToken)
    } catch (error) {
      console.log(error)
    }
  };

  const uploadFiles = () => {
    const files = getFiles()
    try {
      updateUser(files[0], idToken)
    } catch (error) {
      console.log(error)
    }
  }

  function getFiles () {
    const fileInput:any = document.querySelector('input[type="file"]')
    return fileInput?.files
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-24 max-w-screen-lg mx-auto"
    >
      <AdminNav isUpdateProfile={true} />
      <div className="border border-slate-200 rounded p-10 mb-10">
        <div className="flex">
          <div>
            <label>Profile Image</label>
            <input className="text-sm italic w-full" type="file" />
            <button onClick={uploadFiles} className="bg-black text-white rounded leading-10 px-5 mt-4">
              Upload
            </button>
          </div>
          <div className="grow pr-4">
            <label>Your name</label>
            <input
              {...register(`name`, { required: "Name is required" })}
              className="w-full input-field mb-2"
              placeholder="Name"
            />
            <span className="text-red-600 text-xs">
              {" "}
              {errors.name && errors.name.message}
            </span>
          </div>
          <div className="grow">
            <label>Where people can find you</label>
            <input
              {...register(`socials`, { required: "Social is required" })}
              className="w-full input-field mb-2"
              placeholder="https://"
            />
            <span className="text-red-600 text-xs">
              {" "}
              {errors.socials && errors.socials.message}
            </span>
          </div>
        </div>
        <hr className="border-b-1 border-slate-200 my-8" />
        <label>Your Bio</label>
        <textarea
          {...register(`bio`, { required: "Bio is required" })}
          className="w-full input-field mb-2"
          placeholder="Something about yourself..."
        />
        <span className="text-red-600 text-xs">
          {" "}
          {errors.bio && errors.bio.message}
        </span>
        <hr className="border-b-1 border-slate-200 my-8" />
        <button
          className="bg-black text-white rounded leading-10 px-5"
          type="submit"
        >
          Update Your Bio
        </button>
      </div>
    </form>
  );
}
