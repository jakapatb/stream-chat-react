"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/Emojis/index.ts
var Emojis_exports = {};
__export(Emojis_exports, {
  EmojiPicker: () => EmojiPicker
});
module.exports = __toCommonJS(Emojis_exports);

// src/components/Emojis/EmojiPicker.tsx
var import_react4 = __toESM(require("react"));
var import_react_popper = require("react-popper");
var import_react5 = __toESM(require("@emoji-mart/react"));

// src/context/TranslationContext.tsx
var import_react = __toESM(require("react"));
var import_dayjs2 = __toESM(require("dayjs"));
var import_calendar2 = __toESM(require("dayjs/plugin/calendar"));
var import_localizedFormat2 = __toESM(require("dayjs/plugin/localizedFormat"));

// src/i18n/Streami18n.ts
var import_i18next = __toESM(require("i18next"));
var import_dayjs = __toESM(require("dayjs"));
var import_calendar = __toESM(require("dayjs/plugin/calendar"));
var import_updateLocale = __toESM(require("dayjs/plugin/updateLocale"));
var import_localizedFormat = __toESM(require("dayjs/plugin/localizedFormat"));
var import_localeData = __toESM(require("dayjs/plugin/localeData"));
var import_relativeTime = __toESM(require("dayjs/plugin/relativeTime"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));
var import_de = require("dayjs/locale/de");
var import_es = require("dayjs/locale/es");
var import_fr = require("dayjs/locale/fr");
var import_hi = require("dayjs/locale/hi");
var import_it = require("dayjs/locale/it");
var import_ja = require("dayjs/locale/ja");
var import_ko = require("dayjs/locale/ko");
var import_nl = require("dayjs/locale/nl");
var import_pt = require("dayjs/locale/pt");
var import_ru = require("dayjs/locale/ru");
var import_tr = require("dayjs/locale/tr");
var import_en = require("dayjs/locale/en");
import_dayjs.default.extend(import_updateLocale.default);
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
import_dayjs.default.updateLocale("de", {
  calendar: {
    lastDay: "[gestern um] LT",
    lastWeek: "[letzten] dddd [um] LT",
    nextDay: "[morgen um] LT",
    nextWeek: "dddd [um] LT",
    sameDay: "[heute um] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("es", {
  calendar: {
    lastDay: "[ayer a las] LT",
    lastWeek: "[pasado] dddd [a] LT",
    nextDay: "[ma\xF1ana a] LT",
    nextWeek: "dddd [a] LT",
    sameDay: "[hoy a las] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("fr", {
  calendar: {
    lastDay: "[Hier \xE0] LT",
    lastWeek: "dddd [dernier \xE0] LT",
    nextDay: "[Demain \xE0] LT",
    nextWeek: "dddd [\xE0] LT",
    sameDay: "[Aujourd\u2019hui \xE0] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("hi", {
  calendar: {
    lastDay: "[\u0915\u0932] LT",
    lastWeek: "[\u092A\u093F\u091B\u0932\u0947] dddd, LT",
    nextDay: "[\u0915\u0932] LT",
    nextWeek: "dddd, LT",
    sameDay: "[\u0906\u091C] LT",
    sameElse: "L"
  },
  // Hindi notation for meridiems are quite fuzzy in practice. While there exists
  // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
  meridiem(hour) {
    if (hour < 4) {
      return "\u0930\u093E\u0924";
    } else if (hour < 10) {
      return "\u0938\u0941\u092C\u0939";
    } else if (hour < 17) {
      return "\u0926\u094B\u092A\u0939\u0930";
    } else if (hour < 20) {
      return "\u0936\u093E\u092E";
    } else {
      return "\u0930\u093E\u0924";
    }
  },
  meridiemHour(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "\u0930\u093E\u0924") {
      return hour < 4 ? hour : hour + 12;
    } else if (meridiem === "\u0938\u0941\u092C\u0939") {
      return hour;
    } else if (meridiem === "\u0926\u094B\u092A\u0939\u0930") {
      return hour >= 10 ? hour : hour + 12;
    } else if (meridiem === "\u0936\u093E\u092E") {
      return hour + 12;
    }
    return hour;
  },
  meridiemParse: /रात|सुबह|दोपहर|शाम/
});
import_dayjs.default.updateLocale("it", {
  calendar: {
    lastDay: "[Ieri alle] LT",
    lastWeek: "[lo scorso] dddd [alle] LT",
    nextDay: "[Domani alle] LT",
    nextWeek: "dddd [alle] LT",
    sameDay: "[Oggi alle] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("ja", {
  calendar: {
    lastDay: "[\u6628\u65E5] LT",
    lastWeek: "dddd LT",
    nextDay: "[\u660E\u65E5] LT",
    nextWeek: "[\u6B21\u306E] dddd LT",
    sameDay: "[\u4ECA\u65E5] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("ko", {
  calendar: {
    lastDay: "[\uC5B4\uC81C] LT",
    lastWeek: "[\uC9C0\uB09C] dddd LT",
    nextDay: "[\uB0B4\uC77C] LT",
    nextWeek: "dddd LT",
    sameDay: "[\uC624\uB298] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("nl", {
  calendar: {
    lastDay: "[gisteren om] LT",
    lastWeek: "[afgelopen] dddd [om] LT",
    nextDay: "[morgen om] LT",
    nextWeek: "dddd [om] LT",
    sameDay: "[vandaag om] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("pt", {
  calendar: {
    lastDay: "[ontem \xE0s] LT",
    lastWeek: "dddd [passada \xE0s] LT",
    nextDay: "[amanh\xE3 \xE0s] LT",
    nextWeek: "dddd [\xE0s] LT",
    sameDay: "[hoje \xE0s] LT",
    sameElse: "L"
  }
});
import_dayjs.default.updateLocale("ru", {
  calendar: {
    lastDay: "[\u0412\u0447\u0435\u0440\u0430, \u0432] LT",
    nextDay: "[\u0417\u0430\u0432\u0442\u0440\u0430, \u0432] LT",
    sameDay: "[\u0421\u0435\u0433\u043E\u0434\u043D\u044F, \u0432] LT"
  }
});
import_dayjs.default.updateLocale("tr", {
  calendar: {
    lastDay: "[d\xFCn] LT",
    lastWeek: "[ge\xE7en] dddd [saat] LT",
    nextDay: "[yar\u0131n saat] LT",
    nextWeek: "[gelecek] dddd [saat] LT",
    sameDay: "[bug\xFCn saat] LT",
    sameElse: "L"
  }
});
var defaultTranslatorFunction = (key) => key;

// src/context/TranslationContext.tsx
import_dayjs2.default.extend(import_calendar2.default);
import_dayjs2.default.extend(import_localizedFormat2.default);
var defaultDateTimeParser = (input) => (0, import_dayjs2.default)(input);
var TranslationContext = import_react.default.createContext({
  t: defaultTranslatorFunction,
  tDateTimeParser: defaultDateTimeParser,
  userLanguage: "en"
});
var useTranslationContext = (componentName) => {
  const contextValue = (0, import_react.useContext)(TranslationContext);
  if (!contextValue) {
    console.warn(
      `The useTranslationContext hook was called outside of the TranslationContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ${componentName} component.`
    );
    return {};
  }
  return contextValue;
};

// src/components/MessageInput/icons.tsx
var import_react2 = __toESM(require("react"));
var import_nanoid = require("nanoid");
var EmojiPickerIcon = () => /* @__PURE__ */ import_react2.default.createElement(
  "svg",
  {
    preserveAspectRatio: "xMinYMin",
    viewBox: "0 0 28 28",
    width: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ import_react2.default.createElement("g", { clipRule: "evenodd", fillRule: "evenodd" }, /* @__PURE__ */ import_react2.default.createElement("path", { d: "M14 4.4C8.6 4.4 4.4 8.6 4.4 14c0 5.4 4.2 9.6 9.6 9.6c5.4 0 9.6-4.2 9.6-9.6c0-5.4-4.2-9.6-9.6-9.6zM2 14c0-6.6 5.4-12 12-12s12 5.4 12 12s-5.4 12-12 12s-12-5.4-12-12zM12.8 11c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8s1.8.8 1.8 1.8zM18.8 11c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8s1.8.8 1.8 1.8zM8.6 15.4c.6-.4 1.2-.2 1.6.2c.6.8 1.6 1.8 3 2c1.2.4 2.8.2 4.8-2c.4-.4 1.2-.6 1.6 0c.4.4.6 1.2 0 1.6c-2.2 2.6-4.8 3.4-7 3c-2-.4-3.6-1.8-4.4-3c-.4-.6-.2-1.2.4-1.8z" }))
);

// src/context/MessageInputContext.tsx
var import_react3 = __toESM(require("react"));
var MessageInputContext = (0, import_react3.createContext)(void 0);
var useMessageInputContext = (componentName) => {
  const contextValue = (0, import_react3.useContext)(MessageInputContext);
  if (!contextValue) {
    console.warn(
      `The useMessageInputContext hook was called outside of the MessageInputContext provider. Make sure this hook is called within the MessageInput's UI component. The errored call is located in the ${componentName} component.`
    );
    return {};
  }
  return contextValue;
};

// src/components/Emojis/EmojiPicker.tsx
var isShadowRoot = (node) => !!node.host;
var classNames = {
  buttonClassName: "str-chat__emoji-picker-button",
  pickerContainerClassName: "str-chat__message-textarea-emoji-picker-container",
  wrapperClassName: "str-chat__message-textarea-emoji-picker"
};
var EmojiPicker = (props) => {
  const { t } = useTranslationContext("EmojiPicker");
  const { insertText, textareaRef } = useMessageInputContext("EmojiPicker");
  const [displayPicker, setDisplayPicker] = (0, import_react4.useState)(false);
  const [referenceElement, setReferenceElement] = (0, import_react4.useState)(null);
  const [popperElement, setPopperElement] = (0, import_react4.useState)(null);
  const { attributes, styles } = (0, import_react_popper.usePopper)(referenceElement, popperElement, {
    placement: "top-end",
    ...props.popperOptions
  });
  const { buttonClassName, pickerContainerClassName, wrapperClassName } = classNames;
  const { ButtonIconComponent = EmojiPickerIcon } = props;
  (0, import_react4.useEffect)(() => {
    if (!popperElement || !referenceElement)
      return;
    const handlePointerDown = (e) => {
      const target = e.target;
      const rootNode = target.getRootNode();
      if (popperElement.contains(isShadowRoot(rootNode) ? rootNode.host : target) || referenceElement.contains(target)) {
        return;
      }
      setDisplayPicker(false);
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [referenceElement, popperElement]);
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: props.wrapperClassName ?? wrapperClassName }, displayPicker && /* @__PURE__ */ import_react4.default.createElement(
    "div",
    {
      className: props.pickerContainerClassName ?? pickerContainerClassName,
      style: styles.popper,
      ...attributes.popper,
      ref: setPopperElement
    },
    /* @__PURE__ */ import_react4.default.createElement(
      import_react5.default,
      {
        data: async () => (await import("@emoji-mart/data")).default,
        onEmojiSelect: (e) => {
          insertText(e.native);
          textareaRef.current?.focus();
          if (props.closeOnEmojiSelect) {
            setDisplayPicker(false);
          }
        },
        ...props.pickerProps
      }
    )
  ), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      "aria-expanded": displayPicker,
      "aria-label": t("aria/Emoji picker"),
      className: props.buttonClassName ?? buttonClassName,
      onClick: () => setDisplayPicker((cv) => !cv),
      ref: setReferenceElement,
      type: "button"
    },
    ButtonIconComponent && /* @__PURE__ */ import_react4.default.createElement(ButtonIconComponent, null)
  ));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiPicker
});
//# sourceMappingURL=index.cjs.js.map
