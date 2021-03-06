"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createSvgIcon(path, displayName) {
  var Component = _react.default.memo(_react.default.forwardRef((props, ref) => _react.default.createElement(_SvgIcon.default, _extends({
    "data-mui-test": "".concat(displayName, "Icon"),
    ref: ref
  }, props), path)));

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = "".concat(displayName, "Icon");
  } // Component.muiName = SvgIcon.muiName;


  return Component;
}