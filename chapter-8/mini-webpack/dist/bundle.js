(function(modules) {
    function require(id) {
        const [fn,mapping] = modules[id]
        const module = {
            exports:{}
        }
        function localRequire(filePath) {
            const id = mapping[filePath]
            return require(id)
        }
        fn(localRequire,module,module.exports)
        return module.exports
    }
    
    require(0)
})(
    {
        
            "0":[
            function (require,module,exports) {
                "use strict";

var _foo = require("./foo.js");

var _foo2 = _interopRequireDefault(_foo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _foo2.default)();
console.log("main.js");
            },
            {"./foo.js":1}
            ],
        
            "1":[
            function (require,module,exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bar = require("./bar.js");

var _bar2 = _interopRequireDefault(_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function foo() {
  (0, _bar2.default)();
  console.log("foo....");
}

exports.default = foo;
            },
            {"./bar.js":2}
            ],
        
            "2":[
            function (require,module,exports) {
                "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function bar() {
  console.log("hahaha....");
}

exports.default = bar;
            },
            {}
            ],
        
    }
)