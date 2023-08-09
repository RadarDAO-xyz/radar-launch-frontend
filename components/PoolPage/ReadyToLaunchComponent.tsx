import React from "react";
import { cn } from "@/lib/utils";

export function ReadyToLaunchComponent() {
  return (
    <section className={cn("section", "top-line")}>
      <div className={cn("container-3", "vertical")}>
        <h2 className={cn("heading-25")}>{"Ready to launch?"}</h2>
        <div className={cn("pricing-grid")}>
          <div
            className={cn("pricing-card-three")}
            id={cn("w-node-eabcc396-b4d7-fd44-0fcc-1f2698d1552f-98d1552a")}
          >
            <img
              className={cn("pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480802c0e353e906c43dd3a_Brief_single.png"
            />
            <h3 className={cn("heading-26")}>{"Be inspired"}</h3>
            <p className={cn("body-text", "center")}>
              {
                "Receive inspiration and insight from the RADAR community and partners"
              }
            </p>
          </div>
          <div
            className={cn("pricing-card-three")}
            id={cn("w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15535-98d1552a")}
          >
            <img
              className={cn("pricing-image")}
              loading="lazy"
              width={100}
              height={100}
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/648087d8889d8922b98f1441_submit%20vision_2.png"
            />
            <h3>{"Share your vision"}</h3>
            <p className={cn("body-text", "center")}>
              {
                "Submit a video proposal (less than 3 mins) and set your milestones"
              }
            </p>
          </div>
          <div
            className={cn("pricing-card-three")}
            id={cn("w-node-eabcc396-b4d7-fd44-0fcc-1f2698d1553b-98d1552a")}
          >
            <img
              className={cn("pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64808ab90c4bfc697c1a478e_submission%20icons.png"
            />
            <h3>{"Receive validation"}</h3>
            <p className={cn("body-text", "center")}>
              {
                "Receive an approval decision within 48 hours from RADAR's curation crew"
              }
            </p>
          </div>
          <div
            className={cn("pricing-card-three")}
            id={cn("w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15541-98d1552a")}
          >
            <img
              className={cn("pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480d007b8df65a9d406feeb_Artboard%201.png"
            />
            <h3>{"Get support"}</h3>
            <p className={cn("body-text", "center")}>
              {
                "Share your project page to attract users, contributors, and funding onchain"
              }
            </p>
          </div>
          <div
            className={cn("pricing-card-three")}
            id={cn("w-node-eabcc396-b4d7-fd44-0fcc-1f2698d15547-98d1552a")}
          >
            <img
              className={cn("pricing-image")}
              loading="lazy"
              width="auto"
              height="auto"
              src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/6480dc87dff309c9a60279b0_Artboard%203.png"
            />
            <h3>{"Make the future"}</h3>
            <p className={cn("body-text", "center")}>
              {"Withdraw your crowdfunded ETH to achieve your first milestone"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
