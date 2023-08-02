import { AdminNav } from "@/components/AdminNav";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "@/types/mongo";
import { useGetSignedUser } from "@/hooks/useGetSignedUser";

async function updateUser(values:User, id:number) {
  const res = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${id}`,
    },
    body: JSON.stringify(values),
  });
  return await res.json();
}

export default function UpdateProfile() {
  const { data } = useGetSignedUser()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({
    mode: "onBlur",
    defaultValues: {
      name: data ? data[0].name : '',
      socials: data ? data[0].socials : '',
      bio: data ? data[0].bio : ''
    }
  });
  const onSubmit: SubmitHandler<User> = (data) => {
    try {
      // @ts-ignore
      updateUser(data, data._id)
    } catch (error) {
      console.log(error)
    }
  };

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
            <button className="bg-black text-white rounded leading-10 px-5 mt-4">
              Upload
            </button>
          </div>
          <div className="grow pr-4">
            <label>Your name</label>
            <input
              {...register(`name`)}
              className="w-full input-field mb-2"
              placeholder="Name"
            />
          </div>
          <div className="grow">
            <label>Where people can find you</label>
            <input
              {...register(`socials`)}
              className="w-full input-field mb-2"
              placeholder="https://"
            />
          </div>
        </div>
        <hr className="border-b-1 border-slate-200 my-8" />
        <label>Your Bio</label>
        <textarea
          {...register(`bio`)}
          className="w-full input-field mb-2"
          placeholder="Something about yourself..."
        />
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
