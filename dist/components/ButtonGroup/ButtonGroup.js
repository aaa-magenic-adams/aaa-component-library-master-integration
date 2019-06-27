(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/esm/defineProperty", "react", "@material-ui/styles", "clsx"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/esm/defineProperty"), require("react"), require("@material-ui/styles"), require("clsx"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.defineProperty, global.react, global.styles, global.clsx);
    global.undefined = mod.exports;
  }
})(this, function (exports, _defineProperty2, _react, _styles, _clsx) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defineProperty3 = _interopRequireDefault(_defineProperty2);

  var _react2 = _interopRequireDefault(_react);

  var _clsx2 = _interopRequireDefault(_clsx);

  import _interopRequireDefault from "@babel/runtime/helpers/esm/interopRequireDefault";
  ;
  ;
  var defaultProps = {
    className: ''
  };

  var styleClasses = function styleClasses(theme) {
    return {
      root: (0, _defineProperty3.default)({
        width: '100%',
        marginTop: 24,
        marginBottom: 24,
        '& .Button:nth-child(n+1)': {
          marginTop: 8
        }
      }, theme.breakpoints.up('md'), {
        width: 'inherit'
      })
    };
  };

  var ButtonGroup = function ButtonGroup(_ref) {
    var children = _ref.children,
        classes = _ref.classes,
        className = _ref.className;
    return _react2.default.createElement("div", {
      className: (0, _clsx2.default)('ButtonGroup', classes.root, className)
    }, children);
  };

  ButtonGroup.defaultProps = defaultProps;
  exports.default = (0, _styles.withStyles)(styleClasses, {
    index: 0,
    withTheme: true
  })(ButtonGroup);
});