import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SubmissionMilestones.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-239":{"id":"e-239","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-240"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d795","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d795","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686485604454},"e-241":{"id":"e-241","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-242"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d79d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d79d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686485604454},"e-243":{"id":"e-243","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-244"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d7a5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d7a5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686485604454},"e-245":{"id":"e-245","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-246"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d7ad","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3c042d2f-e3b9-2a68-7c0d-5f1a6682d7ad","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686485604454}},"actionLists":{"a-19":{"id":"a-19","title":"show funding 1","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|082f2408-a6a9-8739-51d0-c5e59d38264f"},"value":"flex"}},{"id":"a-19-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".funding-column-extra._2","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","c724c400-07ee-38a0-dd6d-14a7e5b6897c"]},"value":"none"}}]},{"actionItems":[{"id":"a-19-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|082f2408-a6a9-8739-51d0-c5e59d38264f"},"value":"none"}},{"id":"a-19-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".funding-column-extra._2","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","c724c400-07ee-38a0-dd6d-14a7e5b6897c"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685603408723},"a-20":{"id":"a-20","title":"show funding milestone 2","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|1d7d13a9-f5d2-4413-daba-36ebfe7b4bd4"},"value":"flex"}},{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".funding-column-extra._1","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","24956b26-dd39-36f1-abe3-50da25ed49ad"]},"value":"none"}}]},{"actionItems":[{"id":"a-20-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|1d7d13a9-f5d2-4413-daba-36ebfe7b4bd4"},"value":"none"}},{"id":"a-20-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".funding-column-extra._1","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","24956b26-dd39-36f1-abe3-50da25ed49ad"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685603536112},"a-21":{"id":"a-21","title":"funding milestone 3","actionItemGroups":[{"actionItems":[{"id":"a-21-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|98676e7c-4f5c-5af1-0736-93bca5541bc4"},"value":"flex"}},{"id":"a-21-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".funding-column-extra._3","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","f6e5c484-e13a-6f58-8449-8c6d740b1701"]},"value":"none"}}]},{"actionItems":[{"id":"a-21-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|98676e7c-4f5c-5af1-0736-93bca5541bc4"},"value":"none"}},{"id":"a-21-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".funding-column-extra._3","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","f6e5c484-e13a-6f58-8449-8c6d740b1701"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685603605605},"a-22":{"id":"a-22","title":"funding milestone 4","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|c597983d-403f-eee3-f578-beb8db2b833f"},"value":"flex"}},{"id":"a-22-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".funding-column-extra._4","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","c816893c-b394-7eb5-3f38-0a202c3c6d76"]},"value":"none"}}]},{"actionItems":[{"id":"a-22-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|c597983d-403f-eee3-f578-beb8db2b833f"},"value":"none"}},{"id":"a-22-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".funding-column-extra._4","selectorGuids":["6366b7ad-477f-a99b-68e9-90be59187e53","c816893c-b394-7eb5-3f38-0a202c3c6d76"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685603702826}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SubmissionMilestones({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "submit")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "header-div", "no-buffer", "full")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "heading", "submit", "left")}
          tag="h1"
        >
          {"Milestones"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "form-subheading", "header")}
          tag="div"
        >
          {
            "Set yourself a roadmap to let people know where your vision is heading, you can leave the funding amounts blank if you're not looking for capital"
          }
          <br />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "project",
          "top",
          "coming-soon",
          "no-buffer",
          "full"
        )}
        tag="div"
      >
        <_Builtin.Row tag="div">
          <_Builtin.Column
            className={_utils.cx(_styles, "submit-column")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "form-subheading")}
              tag="h1"
              id="About"
            >
              {"Funding milestones"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "We believe that building is an evolutionary process. Roadmaps are important, but we also want to set achievable milestones."
              }
              <br />
              <br />
              {"You will have to reach milestone 1 to unlock your funds"}
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-70")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "benefits-stack2")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "funding-div", "dark")}
                tag="div"
                id="funding-forms"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "milestone-div")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"Milestone 1"}
                    </_Builtin.Block>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "funding-amount")}
                      autoFocus={false}
                      maxLength={256}
                      name="funding-amount-1"
                      data-name="funding amount 1"
                      placeholder="$"
                      type="number"
                      disabled={false}
                      required={false}
                      id="milestone-amount-1"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet", "milestones")}
                    name="milestone-1"
                    maxLength={5000}
                    data-name="milestone 1"
                    required={false}
                    autoFocus={false}
                    id="milestone-text-1"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "milestone-div")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"Milestone 2"}
                    </_Builtin.Block>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "funding-amount", "_1")}
                      autoFocus={false}
                      maxLength={256}
                      name="funding-amount-2"
                      data-name="funding amount 2"
                      placeholder="$"
                      type="number"
                      disabled={false}
                      required={false}
                      id="milestone-amount-2"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet", "milestones")}
                    name="milestone-2"
                    maxLength={5000}
                    data-name="milestone 2"
                    required={false}
                    autoFocus={false}
                    id="milestone-text-2"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "milestone-div")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"Milestone 3"}
                    </_Builtin.Block>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "funding-amount", "_1")}
                      autoFocus={false}
                      maxLength={256}
                      name="funding-amount-3"
                      data-name="funding amount 3"
                      placeholder="$"
                      type="number"
                      disabled={false}
                      required={false}
                      id="milestone-amount-3"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet")}
                    name="milestone-3"
                    maxLength={5000}
                    data-name="milestone 3"
                    required={false}
                    autoFocus={false}
                    id="milestone-text-3"
                  />
                  <_Builtin.Link
                    className={_utils.cx(_styles, "add-more-button")}
                    data-w-id="3c042d2f-e3b9-2a68-7c0d-5f1a6682d795"
                    button={true}
                    options={{
                      href: "#",
                    }}
                  >
                    {"+ add another"}
                  </_Builtin.Link>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "milestone-div")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"Milestone 4"}
                    </_Builtin.Block>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "funding-amount", "_1")}
                      autoFocus={false}
                      maxLength={256}
                      name="funding-amount-4"
                      data-name="funding amount 4"
                      placeholder="$"
                      type="number"
                      disabled={false}
                      required={false}
                      id="milestone-amount-4"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet")}
                    name="milestone-4"
                    maxLength={5000}
                    data-name="milestone 4"
                    required={false}
                    autoFocus={false}
                    id="milestone-text-4"
                  />
                  <_Builtin.Link
                    className={_utils.cx(
                      _styles,
                      "add-more-button",
                      "funding-1"
                    )}
                    data-w-id="3c042d2f-e3b9-2a68-7c0d-5f1a6682d79d"
                    button={true}
                    options={{
                      href: "#",
                    }}
                  >
                    {"+ add another"}
                  </_Builtin.Link>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "milestone-div")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"Milestone 5"}
                    </_Builtin.Block>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "funding-amount", "_1")}
                      autoFocus={false}
                      maxLength={256}
                      name="funding-amount-5"
                      data-name="funding amount 5"
                      placeholder="$"
                      type="number"
                      disabled={false}
                      required={false}
                      id="milestone-amount-5"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet")}
                    name="milestone-5"
                    maxLength={5000}
                    data-name="milestone 5"
                    required={false}
                    autoFocus={false}
                    id="milestone-text-5"
                  />
                  <_Builtin.Link
                    className={_utils.cx(
                      _styles,
                      "add-more-button",
                      "funding-2"
                    )}
                    data-w-id="3c042d2f-e3b9-2a68-7c0d-5f1a6682d7a5"
                    button={true}
                    options={{
                      href: "#",
                    }}
                  >
                    {"+ add another"}
                  </_Builtin.Link>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "milestone-div")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"Milestone 6"}
                    </_Builtin.Block>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "funding-amount", "_1")}
                      autoFocus={false}
                      maxLength={256}
                      name="funding-amount-6"
                      data-name="funding amount 6"
                      placeholder="$"
                      type="number"
                      disabled={false}
                      required={false}
                      id="milestone-amount-6"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet")}
                    name="milestone-6"
                    maxLength={5000}
                    data-name="milestone 6"
                    required={false}
                    autoFocus={false}
                    id="milestone-text-6"
                  />
                  <_Builtin.Link
                    className={_utils.cx(
                      _styles,
                      "add-more-button",
                      "fudning-3"
                    )}
                    data-w-id="3c042d2f-e3b9-2a68-7c0d-5f1a6682d7ad"
                    button={true}
                    options={{
                      href: "#",
                    }}
                  >
                    {"+ add another"}
                  </_Builtin.Link>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "milestone-div")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"Milestone 7"}
                    </_Builtin.Block>
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "funding-amount", "_1")}
                      autoFocus={false}
                      maxLength={256}
                      name="funding-amount-7"
                      data-name="funding amount 7"
                      placeholder="$"
                      type="number"
                      disabled={false}
                      required={false}
                      id="milestone-amount-7"
                    />
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet")}
                    name="milestone-7"
                    maxLength={5000}
                    data-name="milestone 7"
                    required={false}
                    autoFocus={false}
                    id="milestone-text-7"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
    </_Component>
  );
}
