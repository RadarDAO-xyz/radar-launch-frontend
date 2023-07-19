export default function IndividualProjectPage() {
  return (
    <div className="grid grid-cols-6 mt-20 px-[5%] bg-white">
      <div className="col-span-4 overflow-y-scroll pr-10">
        <div>
          <iframe
            width={"100%"}
            className="aspect-video  pt-6"
            src={`https://www.youtube.com/embed/wy8tgRbHN1U`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <div className="text-lg pt-10">
          The Brief: <span className="font-semibold">Brief Name</span>
        </div>
        <h2 className="text-3xl">Heading</h2>
        <hr />
        <p className="text-lg pt-6">This is some text inside of a div block.</p>
      </div>
      <div className="col-span-2 overflow-y-scroll">buttons</div>
    </div>
  );
}
