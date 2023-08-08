import Link from "next/link";
import { Button } from "../ui/button";

export function FundingPoolProjectHeader({}) {
  return (
    <section className="project-page-header">
      <div className="columns-28">
        <div className="column-86">
          <div>
            <p className="project-page-subtitle left">
              {"A More Play-Full Future"}
            </p>
            <h1 className="heading-trending-launch-page">
              {"What if NPCs were autonomous beings?"}
            </h1>
            <div className="_20px-div" />
            <p>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum."
              }
            </p>
          </div>
          <div>
            <Button asChild className="w-full mb-3">
              <Link href="/">{"READ THE BRIEF"}</Link>
            </Button>
            <Button variant={"ghost"} className="w-full" asChild>
              <Link href="/">{"SEE UP COMING EVENTS FOR THIS BRIEF"}</Link>
            </Button>
          </div>
        </div>
        <div className="column-80">
          <div className="div-block-99 no-line">
            <h1 className="heading-5">{"$10,000"}</h1>
            <p className="body-text larger">
              {"pool to build"}
              <span className="arrow-diagonal">{""}</span>
              <br />
            </p>
          </div>
          <p className="small-text">{"Supported by:"}</p>
          <div className="columns-27">
            <div>
              <img
                className="image-26"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2c10486350c0fc2ad6f65_1200px-Ad_Council_2018_SVG.svg.png"
              />
            </div>
            <div>
              <p>
                {"OPGames"}
                <br />
                {"$5000"}
              </p>
            </div>
          </div>
          <div className="columns-27">
            <div>
              <img
                className="image-27"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2b9ce5b9d6dd4d41a01dc_uk-government-crown-crest-logo-9FDF513DBC-seeklogo.com.png"
              />
            </div>
            <div>
              <p>
                {"Future Primative"}
                <br />
                {"$3000"}
              </p>
            </div>
          </div>
          <div className="columns-27 bottom">
            <div>
              <img
                className="image-28"
                loading="lazy"
                width="auto"
                height="auto"
                src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a2b9c6636eec16b79e21af_complex-logo-vector.png"
              />
            </div>
            <div>
              <p>
                {"NEAR"}
                <br />
                {"$2000"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="funding-pool-image" />
    </section>
  );
}
