import React from "react";
import Link from "next/link";

export function InspirationFooter() {
  return (
    <section className="hero-subscribe-right">
      <div className="hero-wrapper full biffer">
        <div className="hero-split right-buffer">
          <h1 className="feature-heading">
            {"Still looking for inspiration?"}
          </h1>
          <div className="_20px-div" />
          <p className="body-text text-left">
            {
              "The RADAR community of 300+ future seekers are behind RADAR Launch."
            }
            <br />
            <br />
            {
              "To inspire your ideas for a more playful world, we invite you to..."
            }
          </p>
          <div className="_20px-div" />
          <div className="text-link-arrow">
            <Link
              className="text-block-43"
              href="https://www.launch.radardao.xyz/brief"
              target="_blank"
            >
              {"Find inspiration in our creative briefs "}
              <span className="right-arrow">{"→"}</span>
            </Link>
          </div>
          <div className="_10px-div" />
          <div className="text-link-arrow">
            <Link
              className="text-block-44"
              href="https://lu.ma/radarcommunityevents"
              target="_blank"
            >
              {"Register for one of our what-if workshops "}
              <span className="right-arrow">{"→"}</span>
            </Link>
          </div>
          <div className="_10px-div" />
          <div className="text-link-arrow">
            <Link
              className="text-block-45"
              href="https://discord.gg/fpfAsR4nRt"
              target="_blank"
            >
              {"Join our public Discord server to jam on ideas "}
              <span className="right-arrow">{"→"}</span>
            </Link>
          </div>
        </div>
        <div className="hero-split right">
          <div className="div-block-62">
            <img
              className="image-14"
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64807b266314396f633f5eee_book_mockup_v2.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
