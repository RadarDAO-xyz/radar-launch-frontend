import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SubmissionTeam.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-125":{"id":"e-125","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-8","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d423","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d423","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685611802415},"e-127":{"id":"e-127","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-16","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-128"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d42d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d42d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685611802415},"e-129":{"id":"e-129","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-130"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d437","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d437","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685611802415},"e-131":{"id":"e-131","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-132"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d441","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d441","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685611802415},"e-133":{"id":"e-133","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-15","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-134"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d44b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d44b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685611802415},"e-135":{"id":"e-135","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-17","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-136"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d455","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d455","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685611802415},"e-137":{"id":"e-137","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-138"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d45f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"64ad4b9eac47ec97bc4f73b4|5344f332-e7e8-03b4-abdd-61cc2c47d45f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685611802415}},"actionLists":{"a-8":{"id":"a-8","title":"Show team 2","actionItemGroups":[{"actionItems":[{"id":"a-8-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|1fb5ce2e-83fc-cdb5-9964-21026e126711"},"value":"flex"}},{"id":"a-8-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._2","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","2ee428c3-c839-92ba-3cae-e92baf25547d"]},"value":"none"}}]},{"actionItems":[{"id":"a-8-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|1fb5ce2e-83fc-cdb5-9964-21026e126711"},"value":"none"}},{"id":"a-8-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._2","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","2ee428c3-c839-92ba-3cae-e92baf25547d"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685600399594},"a-16":{"id":"a-16","title":"show team 3","actionItemGroups":[{"actionItems":[{"id":"a-16-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._3","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","0390ca2c-df2d-bf2d-6323-6d57ffac317c"]},"value":"none"}},{"id":"a-16-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|a24aabd5-0042-587d-df92-9ebe23cc93dd"},"value":"flex"}}]},{"actionItems":[{"id":"a-16-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|a24aabd5-0042-587d-df92-9ebe23cc93dd"},"value":"none"}},{"id":"a-16-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._3","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","0390ca2c-df2d-bf2d-6323-6d57ffac317c"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685602650138},"a-13":{"id":"a-13","title":"show team 4","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|d5d92f66-e584-db56-14f7-8638e73e3ce9"},"value":"flex"}},{"id":"a-13-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._4","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","415ea33b-a439-1ab3-f51a-0f8a3e4c4c41"]},"value":"none"}}]},{"actionItems":[{"id":"a-13-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|d5d92f66-e584-db56-14f7-8638e73e3ce9"},"value":"none"}},{"id":"a-13-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._4","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","415ea33b-a439-1ab3-f51a-0f8a3e4c4c41"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685601662845},"a-14":{"id":"a-14","title":"show team 5","actionItemGroups":[{"actionItems":[{"id":"a-14-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._5","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","99a9d74d-a6f0-2c53-971f-2c51aa50fda4"]},"value":"none"}}]},{"actionItems":[{"id":"a-14-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|c9b9cd44-c682-52c3-94c8-18b6d95c72ad"},"value":"flex"}}]},{"actionItems":[{"id":"a-14-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|c9b9cd44-c682-52c3-94c8-18b6d95c72ad"},"value":"none"}},{"id":"a-14-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._5","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","99a9d74d-a6f0-2c53-971f-2c51aa50fda4"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685602038303},"a-15":{"id":"a-15","title":"show team 6","actionItemGroups":[{"actionItems":[{"id":"a-15-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|b2d5220b-c7a5-0c62-19e9-1dbf866309a3"},"value":"flex"}},{"id":"a-15-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._6","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","bc387f48-b323-cfb0-5f60-2bd777a87e6c"]},"value":"none"}}]},{"actionItems":[{"id":"a-15-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|b2d5220b-c7a5-0c62-19e9-1dbf866309a3"},"value":"none"}},{"id":"a-15-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._6","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","bc387f48-b323-cfb0-5f60-2bd777a87e6c"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685602367448},"a-17":{"id":"a-17","title":"show team 7","actionItemGroups":[{"actionItems":[{"id":"a-17-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._7","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","086107ab-4a38-5bfb-a708-b1c01e3ee263"]},"value":"none"}},{"id":"a-17-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|38402a0f-fbf4-37b7-1d37-eb61e4eac69e"},"value":"flex"}}]},{"actionItems":[{"id":"a-17-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|38402a0f-fbf4-37b7-1d37-eb61e4eac69e"},"value":"none"}},{"id":"a-17-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._7","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","086107ab-4a38-5bfb-a708-b1c01e3ee263"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685602789834},"a-18":{"id":"a-18","title":"show team 8","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|5f500ec9-e964-b783-d0ed-04b438accab8"},"value":"flex"}},{"id":"a-18-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._8","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","c4b74ec4-6525-3d9d-ca66-09742192bc99"]},"value":"none"}}]},{"actionItems":[{"id":"a-18-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"64ad4b9eac47ec97bc4f73b4|5f500ec9-e964-b783-d0ed-04b438accab8"},"value":"none"}},{"id":"a-18-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".team-form._8","selectorGuids":["db83357a-b614-0ccb-9289-709311d73f00","c4b74ec4-6525-3d9d-ca66-09742192bc99"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1685602882230}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SubmissionTeam({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "team")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "header-div")} tag="div">
        <_Builtin.Heading
          className={_utils.cx(_styles, "heading", "submit", "center", "left")}
          tag="h1"
        >
          {"The team"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "form-subheading", "header")}
          tag="div"
        >
          {"Who is building the vision"}
          <br />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "project",
          "top",
          "no-line",
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
              {"Team"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "Adding contributors will notify them and allow them to sign up and join as admins on the project"
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-67")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "project-name")}
              tag="div"
              id="team-forms"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "team-form")}
                tag="div"
                id="team-member-1"
              >
                <_Builtin.FormTextInput
                  className={_utils.cx(
                    _styles,
                    "input-field",
                    "eth-team-member"
                  )}
                  autoFocus={false}
                  maxLength={256}
                  name="team-name-6"
                  data-name="Team Name 6"
                  placeholder="Name"
                  type="text"
                  disabled={false}
                  required={false}
                  id="team-name-6"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-42",
                    "vetical-stack"
                  )}
                  tag="div"
                >
                  <_Builtin.FormTextarea
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "team-form",
                      "_2"
                    )}
                    name="Team-3"
                    maxLength={5000}
                    data-name="Team 3"
                    placeholder="Bio"
                    required={false}
                    autoFocus={false}
                    id="team-bio-1"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                  <_Builtin.FormTextInput
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "eth-team-member"
                    )}
                    autoFocus={false}
                    maxLength={256}
                    name="Contributor-2"
                    data-name="Contributor 2"
                    placeholder="Email"
                    type="text"
                    disabled={false}
                    required={false}
                    id="team-email-1"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "divider")}
                  tag="div"
                />
                <_Builtin.Link
                  className={_utils.cx(_styles, "add-more-button")}
                  button={true}
                  options={{
                    href: "#",
                  }}
                >
                  {"+ add another"}
                </_Builtin.Link>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "team-form")}
                tag="div"
                id="team-member-2"
              >
                <_Builtin.FormTextInput
                  className={_utils.cx(
                    _styles,
                    "input-field",
                    "eth-team-member"
                  )}
                  autoFocus={false}
                  maxLength={256}
                  name="team-name-5"
                  data-name="Team Name 5"
                  placeholder="Name"
                  type="text"
                  disabled={false}
                  required={false}
                  id="team-name-2"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-42",
                    "vetical-stack"
                  )}
                  tag="div"
                >
                  <_Builtin.FormTextarea
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "team-form",
                      "_2"
                    )}
                    name="Team-3"
                    maxLength={5000}
                    data-name="Team 3"
                    placeholder="Bio"
                    required={false}
                    autoFocus={false}
                    id="team-bio-2"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                  <_Builtin.FormTextInput
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "eth-team-member"
                    )}
                    autoFocus={false}
                    maxLength={256}
                    name="Contributor-2"
                    data-name="Contributor 2"
                    placeholder="Email"
                    type="text"
                    disabled={false}
                    required={false}
                    id="team-email-2"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "divider")}
                  tag="div"
                />
                <_Builtin.Link
                  className={_utils.cx(_styles, "add-more-button")}
                  button={true}
                  options={{
                    href: "#",
                  }}
                >
                  {"+ add another"}
                </_Builtin.Link>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "team-form")}
                tag="div"
                id="team-member-3"
              >
                <_Builtin.FormTextInput
                  className={_utils.cx(
                    _styles,
                    "input-field",
                    "eth-team-member"
                  )}
                  autoFocus={false}
                  maxLength={256}
                  name="team-name-4"
                  data-name="Team Name 4"
                  placeholder="Name"
                  type="text"
                  disabled={false}
                  required={false}
                  id="team-name-3"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-42",
                    "vetical-stack"
                  )}
                  tag="div"
                >
                  <_Builtin.FormTextarea
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "team-form",
                      "_2"
                    )}
                    name="Team-3"
                    maxLength={5000}
                    data-name="Team 3"
                    placeholder="Bio"
                    required={false}
                    autoFocus={false}
                    id="team-bio-3"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                  <_Builtin.FormTextInput
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "eth-team-member"
                    )}
                    autoFocus={false}
                    maxLength={256}
                    name="Contributor-2"
                    data-name="Contributor 2"
                    placeholder="Email"
                    type="text"
                    disabled={false}
                    required={false}
                    id="team-email-3"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "divider")}
                  tag="div"
                />
                <_Builtin.Link
                  className={_utils.cx(_styles, "add-more-button")}
                  button={true}
                  options={{
                    href: "#",
                  }}
                >
                  {"+ add another"}
                </_Builtin.Link>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "team-form")}
                tag="div"
                id="team-member-4"
              >
                <_Builtin.FormTextInput
                  className={_utils.cx(
                    _styles,
                    "input-field",
                    "eth-team-member"
                  )}
                  autoFocus={false}
                  maxLength={256}
                  name="team-name-3"
                  data-name="Team Name 3"
                  placeholder="Name"
                  type="text"
                  disabled={false}
                  required={false}
                  id="team-name-4"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-42",
                    "vetical-stack"
                  )}
                  tag="div"
                >
                  <_Builtin.FormTextarea
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "team-form",
                      "_2"
                    )}
                    name="Team-3"
                    maxLength={5000}
                    data-name="Team 3"
                    placeholder="Bio"
                    required={false}
                    autoFocus={false}
                    id="team-bio-4"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                  <_Builtin.FormTextInput
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "eth-team-member"
                    )}
                    autoFocus={false}
                    maxLength={256}
                    name="Contributor-2"
                    data-name="Contributor 2"
                    placeholder="Email"
                    type="text"
                    disabled={false}
                    required={false}
                    id="team-email-4"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "divider")}
                  tag="div"
                />
                <_Builtin.Link
                  className={_utils.cx(_styles, "add-more-button")}
                  button={true}
                  options={{
                    href: "#",
                  }}
                >
                  {"+ add another"}
                </_Builtin.Link>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "team-form")}
                tag="div"
                id="team-member-5"
              >
                <_Builtin.FormTextInput
                  className={_utils.cx(
                    _styles,
                    "input-field",
                    "eth-team-member"
                  )}
                  autoFocus={false}
                  maxLength={256}
                  name="team-name-2"
                  data-name="Team Name 2"
                  placeholder="Name"
                  type="text"
                  disabled={false}
                  required={false}
                  id="team-name-5"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "_10px-div")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-42",
                    "vetical-stack"
                  )}
                  tag="div"
                >
                  <_Builtin.FormTextarea
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "team-form",
                      "_2"
                    )}
                    name="Team-3"
                    maxLength={5000}
                    data-name="Team 3"
                    placeholder="Bio"
                    required={false}
                    autoFocus={false}
                    id="team-bio-5"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "_10px-div")}
                    tag="div"
                  />
                  <_Builtin.FormTextInput
                    className={_utils.cx(
                      _styles,
                      "input-field",
                      "eth-team-member"
                    )}
                    autoFocus={false}
                    maxLength={256}
                    name="Contributor-2"
                    data-name="Contributor 2"
                    placeholder="Email"
                    type="text"
                    disabled={false}
                    required={false}
                    id="team-email-5"
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
