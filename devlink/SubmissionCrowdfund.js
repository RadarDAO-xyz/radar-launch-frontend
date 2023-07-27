import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SubmissionCrowdfund.module.css";
import { RepeatingField } from "../components/RepeatingField";

const _interactionsData = JSON.parse(
  '{"events":{"e-247":{"id":"e-247","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-248"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"add16c56-8239-c783-6899-a4bd54e24c43","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"add16c56-8239-c783-6899-a4bd54e24c43","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686498810408},"e-249":{"id":"e-249","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-250"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"add16c56-8239-c783-6899-a4bd54e24c4b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"add16c56-8239-c783-6899-a4bd54e24c4b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686498884473},"e-251":{"id":"e-251","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-252"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"add16c56-8239-c783-6899-a4bd54e24c53","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"add16c56-8239-c783-6899-a4bd54e24c53","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1686498924309}},"actionLists":{"a-26":{"id":"a-26","title":"show benefit 4","actionItemGroups":[{"actionItems":[{"id":"a-26-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".benefits-div._4","selectorGuids":["6cbe4261-3b97-e2b8-62c8-559ebd19a19b","eb5594bc-2df0-2423-40df-a08c95b30e82"]},"value":"none"}},{"id":"a-26-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"add16c56-8239-c783-6899-a4bd54e24c43"},"value":"flex"}}]},{"actionItems":[{"id":"a-26-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".benefits-div._4","selectorGuids":["6cbe4261-3b97-e2b8-62c8-559ebd19a19b","eb5594bc-2df0-2423-40df-a08c95b30e82"]},"value":"block"}},{"id":"a-26-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"add16c56-8239-c783-6899-a4bd54e24c43"},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1686498819454},"a-27":{"id":"a-27","title":"show benefits 5","actionItemGroups":[{"actionItems":[{"id":"a-27-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".benefits-div._5","selectorGuids":["6cbe4261-3b97-e2b8-62c8-559ebd19a19b","118b41ab-1662-8276-f566-542f44632545"]},"value":"none"}},{"id":"a-27-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"add16c56-8239-c783-6899-a4bd54e24c4b"},"value":"flex"}}]},{"actionItems":[{"id":"a-27-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".benefits-div._5","selectorGuids":["6cbe4261-3b97-e2b8-62c8-559ebd19a19b","118b41ab-1662-8276-f566-542f44632545"]},"value":"block"}},{"id":"a-27-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"add16c56-8239-c783-6899-a4bd54e24c4b"},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1686498892159},"a-28":{"id":"a-28","title":"show benefit 6","actionItemGroups":[{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".benefits-div._6","selectorGuids":["6cbe4261-3b97-e2b8-62c8-559ebd19a19b","2a72f764-44de-f7b3-0f27-0c965449ebb3"]},"value":"none"}},{"id":"a-28-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"add16c56-8239-c783-6899-a4bd54e24c53"},"value":"flex"}}]},{"actionItems":[{"id":"a-28-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".benefits-div._6","selectorGuids":["6cbe4261-3b97-e2b8-62c8-559ebd19a19b","2a72f764-44de-f7b3-0f27-0c965449ebb3"]},"value":"block"}},{"id":"a-28-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"add16c56-8239-c783-6899-a4bd54e24c53"},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1686498928520}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SubmissionCrowdfund({ as: _Component = _Builtin.Block }) {
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
          {"Crowdfund (Optional)"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "form-subheading", "header")}
          tag="div"
        >
          {
            "Raise capital to reach your milestones, set optional benefits to inspire people to support"
          }
          <br />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "project", "top")}
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
              {"Crowdfunding"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque pellentesque orci, in blandit nisi finibus pellentesque."
              }
              <br />
              <br />
              {
                "Nam nec suscipit elit, a imperdiet nisi. Cras hendrerit in lectus nec volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-69")}
            tag="div"
          >
            <_Builtin.FormCheckboxWrapper>
              <_Builtin.FormCheckboxInput
                className={_utils.cx(_styles, "checkbox")}
                inputType="default"
                type="checkbox"
                name="waitlist-2"
                data-name="Waitlist 2"
                required={false}
                checked={false}
                id="waitlist-2"
              />
              <_Builtin.FormInlineLabel
                className={_utils.cx(_styles, "checkbox-label")}
              >
                {"Iwant to set benefits and crowdfund on Launch"}
              </_Builtin.FormInlineLabel>
              <_Builtin.Block
                className={_utils.cx(_styles, "_10px-div")}
                tag="div"
              />
            </_Builtin.FormCheckboxWrapper>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "project", "top")}
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
              {"Editions"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "At est rutrum at. Curabitur at auctor quam. Vivamus pellentesque pellentesque orci, in blandit nisi finibus pellentesque."
              }
              <br />
              <br />
              {
                "Nam nec suscipit elit, a imperdiet nisi. Cras hendrerit in lectus nec volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-72")}
            tag="div"
          >
            <_Builtin.FormBlockLabel
              className={_utils.cx(_styles, "body-text-3")}
              htmlFor="Team"
            >
              <_Builtin.Strong className={_utils.cx(_styles, "bold-text-7")}>
                {"Edition Price"}
              </_Builtin.Strong>
            </_Builtin.FormBlockLabel>
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-76")}
              tag="div"
            >
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "input-field", "_80")}
                autoFocus={false}
                maxLength={256}
                name="Edition-price"
                data-name="Edition price"
                placeholder="0.01"
                type="number"
                disabled={false}
                required={true}
                step="0.01"
                id="edition_price"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "body-text-3", "middle")}
                tag="div"
              >
                {"ETH"}
                <br />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-75")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "body-text-3")}
                tag="div"
              >
                <_Builtin.Strong>{"Mint End Date"}</_Builtin.Strong>
                <br />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "mint-window-div")}
              tag="div"
            >
              <_Builtin.FormTextInput
                className={_utils.cx(_styles, "input-field", "_80")}
                autoFocus={false}
                maxLength={256}
                name="End-Date"
                data-name="End Date"
                placeholder="End date"
                type="text"
                disabled={false}
                required={true}
                data-toggle="datepicker"
                autoComplete="off"
                id="mind_end_date"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {
                "You will control your launch date via your admin dashboard once your project been approved by RADAR"
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "project-2", "top")}
        tag="div"
      >
        <_Builtin.Row tag="div">
          <_Builtin.Column
            className={_utils.cx(_styles, "submit-column")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "form-subheading-3")}
              tag="h1"
              id="About"
            >
              {"Optional Benefits for supporters"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "editions-page-small-text",
                "submit-page"
              )}
              tag="div"
            >
              {"Onchain patronage will by default be listed as a benefit"}
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-73")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "benefits-stack2")}
              tag="div"
              id="benefit-forms"
            >
              <RepeatingField>
                <_Builtin.Block
                  className={_utils.cx(_styles, "benefits-div", "buffer")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-78")}
                    tag="div"
                  >
                    <_Builtin.FormTextInput
                      className={_utils.cx(_styles, "input-field", "nft")}
                      autoFocus={false}
                      maxLength={256}
                      name="NFT-1"
                      data-name="NFT 1"
                      placeholder="#"
                      type="number"
                      disabled={false}
                      required={true}
                      id="benefit-amount-1"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "body-text", "middle")}
                      tag="div"
                    >
                      {"editions collected"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "bullet")}
                    name="NFT-benefits-1"
                    maxLength={5000}
                    data-name="NFT benefits 1"
                    required={false}
                    autoFocus={false}
                    id="benefit-text-1"
                  />
                </_Builtin.Block>
              </RepeatingField> 
             
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "project-2", "top")}
        tag="div"
      >
        <_Builtin.Row tag="div">
          <_Builtin.Column
            className={_utils.cx(_styles, "submit-column")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "form-subheading-3")}
              tag="h1"
              id="About"
            >
              {"Set your admin address"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "editions-page-small-text",
                "submit-page"
              )}
              tag="div"
            >
              {
                "Please share an address which can withdraw your crowdfunded money."
              }
              <br />
              <br />
              {
                "Make sure you have access to this address. In the current version this cannot be a safe address."
              }
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
          <_Builtin.Column
            className={_utils.cx(_styles, "column-74")}
            tag="div"
          >
            <_Builtin.FormTextInput
              className={_utils.cx(_styles, "input-field-2", "eth-address")}
              autoFocus={false}
              maxLength={256}
              name="Eth-address"
              data-name="Eth address"
              placeholder="Your ETH / ENS address"
              type="text"
              disabled={false}
              required={true}
              id="admin_address"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "_10px-div")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "small-text", "submit-page")}
              tag="div"
            >
              {"This should start with 0x... or end with .ens"}
              <br />
            </_Builtin.Block>
          </_Builtin.Column>
        </_Builtin.Row>
      </_Builtin.Block>
    </_Component>
  );
}
