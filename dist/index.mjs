// src/index.ts
var CJK = "\u2E80-\u2EFF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FA\u30FC-\u30FF\u3100-\u312F\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF";
var ANY_CJK = new RegExp(`[${CJK}]`);
var CONVERT_TO_FULLWIDTH_CJK_SYMBOLS_CJK = new RegExp(`([${CJK}])[ ]*([\\:]+|\\.)[ ]*([${CJK}])`, "g");
var CONVERT_TO_FULLWIDTH_CJK_SYMBOLS = new RegExp(`([${CJK}])[ ]*([~\\!;,\\?]+)[ ]*`, "g");
var DOTS_CJK = new RegExp(`([\\.]{2,}|\u2026)([${CJK}])`, "g");
var FIX_CJK_COLON_ANS = new RegExp(`([${CJK}])\\:([A-Z0-9\\(\\)])`, "g");
var CJK_QUOTE = new RegExp(`([${CJK}])([\`"\u05F4])`, "g");
var QUOTE_CJK = new RegExp(`([\`"\u05F4])([${CJK}])`, "g");
var FIX_QUOTE_ANY_QUOTE = /([`"\u05f4]+)[ ]*(.+?)[ ]*([`"\u05f4]+)/g;
var CJK_SINGLE_QUOTE_BUT_POSSESSIVE = new RegExp(`([${CJK}])('[^s])`, "g");
var SINGLE_QUOTE_CJK = new RegExp(`(')([${CJK}])`, "g");
var FIX_POSSESSIVE_SINGLE_QUOTE = new RegExp(`([A-Za-z0-9${CJK}])( )('s)`, "g");
var HASH_ANS_CJK_HASH = new RegExp(`([${CJK}])(#)([${CJK}]+)(#)([${CJK}])`, "g");
var CJK_HASH = new RegExp(`([${CJK}])(#([^ ]))`, "g");
var HASH_CJK = new RegExp(`(([^ ])#)([${CJK}])`, "g");
var CJK_OPERATOR_ANS = new RegExp(`([${CJK}])([\\+\\-\\*\\/=&\\|<>])([A-Za-z0-9])`, "g");
var ANS_OPERATOR_CJK = new RegExp(`([A-Za-z0-9])([\\+\\-\\*\\/=&\\|<>])([${CJK}])`, "g");
var FIX_SLASH_AS = /([/]) ([a-z\-_\./]+)/g;
var FIX_SLASH_AS_SLASH = /([/\.])([A-Za-z\-_\./]+) ([/])/g;
var CJK_LEFT_BRACKET = new RegExp(`([${CJK}])([\\(\\[\\{<>\u201C])`, "g");
var RIGHT_BRACKET_CJK = new RegExp(`([\\)\\]\\}<>\u201D])([${CJK}])`, "g");
var FIX_LEFT_BRACKET_ANY_RIGHT_BRACKET = /([\(\[\{<\u201c]+)[ ]*(.+?)[ ]*([\)\]\}>\u201d]+)/;
var ANS_CJK_LEFT_BRACKET_ANY_RIGHT_BRACKET = new RegExp(`([A-Za-z0-9${CJK}])[ ]*([\u201C])([A-Za-z0-9${CJK}\\-_ ]+)([\u201D])`, "g");
var LEFT_BRACKET_ANY_RIGHT_BRACKET_ANS_CJK = new RegExp(`([\u201C])([A-Za-z0-9${CJK}\\-_ ]+)([\u201D])[ ]*([A-Za-z0-9${CJK}])`, "g");
var AN_LEFT_BRACKET = /([A-Za-z0-9])([\(\[\{])/g;
var RIGHT_BRACKET_AN = /([\)\]\}])([A-Za-z0-9])/g;
var CJK_ANS = new RegExp(`([${CJK}])([A-Za-z\u0370-\u03FF0-9@\\$%\\^&\\*\\-\\+\\\\=\\|/\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF])`, "g");
var ANS_CJK = new RegExp(`([A-Za-z\u0370-\u03FF0-9~\\$%\\^&\\*\\-\\+\\\\=\\|/!;:,\\.\\?\xA1-\xFF\u2150-\u218F\u2700\u2014\u27BF])([${CJK}])`, "g");
var S_A = /(%)([A-Za-z])/g;
var MIDDLE_DOT = /([ ]*)([\u00b7\u2022\u2027])([ ]*)/g;
var Pangu = class {
  version;
  constructor() {
    this.version = "4.0.7";
  }
  convertToFullwidth(symbols) {
    return symbols.replace(/~/g, "\uFF5E").replace(/!/g, "\uFF01").replace(/;/g, "\uFF1B").replace(/:/g, "\uFF1A").replace(/,/g, "\uFF0C").replace(/\./g, "\u3002").replace(/\?/g, "\uFF1F");
  }
  spacing(text) {
    if (typeof text !== "string") {
      console.warn(`spacing(text) only accepts string but got ${typeof text}`);
      return text;
    }
    if (text.length <= 1 || !ANY_CJK.test(text)) {
      return text;
    }
    const self = this;
    let newText = text;
    newText = newText.replace(CONVERT_TO_FULLWIDTH_CJK_SYMBOLS_CJK, (match, leftCjk, symbols, rightCjk) => {
      const fullwidthSymbols = self.convertToFullwidth(symbols);
      return `${leftCjk}${fullwidthSymbols}${rightCjk}`;
    });
    newText = newText.replace(CONVERT_TO_FULLWIDTH_CJK_SYMBOLS, (match, cjk, symbols) => {
      const fullwidthSymbols = self.convertToFullwidth(symbols);
      return `${cjk}${fullwidthSymbols}`;
    });
    newText = newText.replace(DOTS_CJK, "$1 $2");
    newText = newText.replace(FIX_CJK_COLON_ANS, "$1\uFF1A$2");
    newText = newText.replace(CJK_QUOTE, "$1 $2");
    newText = newText.replace(QUOTE_CJK, "$1 $2");
    newText = newText.replace(FIX_QUOTE_ANY_QUOTE, "$1$2$3");
    newText = newText.replace(CJK_SINGLE_QUOTE_BUT_POSSESSIVE, "$1 $2");
    newText = newText.replace(SINGLE_QUOTE_CJK, "$1 $2");
    newText = newText.replace(FIX_POSSESSIVE_SINGLE_QUOTE, "$1's");
    newText = newText.replace(HASH_ANS_CJK_HASH, "$1 $2$3$4 $5");
    newText = newText.replace(CJK_HASH, "$1 $2");
    newText = newText.replace(HASH_CJK, "$1 $3");
    newText = newText.replace(CJK_OPERATOR_ANS, "$1 $2 $3");
    newText = newText.replace(ANS_OPERATOR_CJK, "$1 $2 $3");
    newText = newText.replace(FIX_SLASH_AS, "$1$2");
    newText = newText.replace(FIX_SLASH_AS_SLASH, "$1$2$3");
    newText = newText.replace(CJK_LEFT_BRACKET, "$1 $2");
    newText = newText.replace(RIGHT_BRACKET_CJK, "$1 $2");
    newText = newText.replace(FIX_LEFT_BRACKET_ANY_RIGHT_BRACKET, "$1$2$3");
    newText = newText.replace(ANS_CJK_LEFT_BRACKET_ANY_RIGHT_BRACKET, "$1 $2$3$4");
    newText = newText.replace(LEFT_BRACKET_ANY_RIGHT_BRACKET_ANS_CJK, "$1$2$3 $4");
    newText = newText.replace(AN_LEFT_BRACKET, "$1 $2");
    newText = newText.replace(RIGHT_BRACKET_AN, "$1 $2");
    newText = newText.replace(CJK_ANS, "$1 $2");
    newText = newText.replace(ANS_CJK, "$1 $2");
    newText = newText.replace(S_A, "$1 $2");
    newText = newText.replace(MIDDLE_DOT, "\u30FB");
    return newText;
  }
  spacingText(text, callback) {
    const newText = this.spacing(text);
    if (typeof callback === "function") {
      return callback(newText);
    }
    return newText;
  }
  spacingTextSync(text) {
    return this.spacing(text);
  }
};
var pangu = new Pangu();
var src_default = pangu;
export {
  Pangu,
  src_default as default,
  pangu
};
