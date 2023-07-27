"use client";
import { MilestoneFields } from "@/components/MilestoneFields";
import { SubmissionReadytoSubmit } from "@/devlink/SubmissionReadytoSubmit";
import { Project } from "@/types/mongo";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TeamFields } from "../../components/TeamFields";

export default function ProjectForm() {
  const methods = useForm<Project>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      video_url: "",
      tldr: "",
      brief: "",
      inspiration: "",
      team: [],
      collaborators: "",
      waitlist: true,
      milestones: [],
      edition_price: 0,
      mint_end_date: "",
      benefits: [],
      admin_address: "",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Project> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-md mx-auto mt-40"
      >
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>The Vision</h1>
          <p className="form-subheading">
            Make it easy for people to learn about your vision
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Title</h2>
              <p>
                At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque
                pellentesque orci, in blandit nisi finibus pellentesque. Nam nec
                suscipit elit, a imperdiet nisi. Cras hendrerit in lectus nec
                volutpat. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus.
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`title`)}
                className="w-full input-field mb-2"
                placeholder="Title"
              />
              <textarea
                className="w-full input-field mb-2"
                placeholder="Description"
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Summary</h2>
              <p>
                At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque
                pellentesque orci, in blandit nisi finibus pellentesque. Nam nec
                suscipit elit, a imperdiet nisi. Cras hendrerit in lectus nec
                volutpat. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus.
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`video_url`)}
                className="w-full input-field mb-2"
                placeholder="Video URL"
              />
              <input
                {...register(`tldr`)}
                className="w-full input-field mb-2"
                placeholder="tldr"
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Video Image</h2>
              <p>
                This thumbnail is taken from the first slide of your uploaded
                video. This will appear for collectors in their wallet and on
                their profile.
              </p>
            </div>
            <div className="w-1/2">video upload btn</div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Inspiration</h2>
              <p>
                At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque
                pellentesque orci, in blandit nisi finibus pellentesque.
              </p>
            </div>
            <div className="w-1/2">
              <select {...register(`brief`)} placeholder="Select a brief">
                <option>The Enchantress</option>
                <option>The Enchantress</option>
                <option>The Enchantress</option>
              </select>
              <input
                className="w-full input-field mb-2"
                placeholder="Inspiration"
              />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>The Team</h1>
          <p className="form-subheading">Who is building the vision</p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Team</h2>
              <p>
                Add your team members and a short bio, your email will not be
                visible on the platform.
              </p>
            </div>
            <div className="w-1/2">
              <TeamFields />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>Support</h1>
          <p className="form-subheading">What support are you looking for?</p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Collaborators</h2>
              <p>
                Do you want to find collaborators on your project? This will
                appear in your project description for people to apply to help
                you build, leave blank if you are not looking for collaborators
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`collaborators`)}
                className="w-full input-field mb-2"
                placeholder="Collaborators"
              />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>Milestones</h1>
          <p className="form-subheading">
            Set yourself a roadmap to let people know where your vision is
            heading, you can leave the funding amounts blank if you&apos;re not
            looking for capital
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Funding Milestones</h2>
              <p>
                We believe that building is an evolutionary process. Roadmaps
                are important, but we also want to set achievable milestones.
              </p>
              <p>
                Fill out milestones you&apos;re hoping to achieve in your
                projects, big or small.
              </p>
              <p>
                Leave the funding amount blank if you&apos;re not looking to
                crowdfund.
              </p>
              <p>
                Note: you will have to reach milestone 1 to unlock your funds
              </p>
            </div>
            <div className="w-1/2">
              <MilestoneFields />
            </div>
          </div>
        </div>
        <div className="border border-slate-200 rounded p-10 mb-10">
          <h1>Crowdfund (Optional)</h1>
          <p className="form-subheading">
            Raise capital to reach your milestones, set optional benefits to
            inspire people to support
          </p>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Crowdfunding</h2>
              <p>
                At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque
                pellentesque orci, in blandit nisi finibus pellentesque.
              </p>
            </div>
            <div className="w-1/2">
              <input {...register(`waitlist`)} id="waitlist" type="checkbox" />
              <label htmlFor="waitlist">
                I want to set benefits and crowdfund on Launch
              </label>
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Editions</h2>
              <p>
                At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque
                pellentesque orci, in blandit nisi finibus pellentesque.
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`edition_price`)}
                className="w-full input-field mb-2"
                type="number"
              />{" "}
              ETH
              <input
                {...register(`mint_end_date`)}
                className="w-full input-field mb-2"
                placeholder="End Date"
              />
            </div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Optional Benefits for supporters</h2>
              <p>Onchain patronage will by default be listed as a benefit.</p>
            </div>
            <div className="w-1/2">repeatable field</div>
          </div>
          <hr className="border-b-1 border-slate-200 my-8" />
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2>Set your admin address</h2>
              <p>
                Please share an address which can withdraw your crowdfunded
                money. Make sure you have access to this address. In the current
                version this cannot be a safe address.
              </p>
            </div>
            <div className="w-1/2">
              <input
                {...register(`admin_address`)}
                className="w-full input-field mb-2"
                placeholder="Your ETH / ENS address"
              />
            </div>
          </div>
        </div>

        <SubmissionReadytoSubmit />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
