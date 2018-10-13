'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IntervalHelper = exports.IntervalHelper = function () {
    function IntervalHelper() {
        _classCallCheck(this, IntervalHelper);

        IntervalHelper.intervals = {};
    }

    _createClass(IntervalHelper, null, [{
        key: 'updateInterval',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(chatId, client, telegram) {
                var _this = this;

                var schedule;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (IntervalHelper.intervals[chatId]) {
                                    clearInterval(IntervalHelper.intervals[chatId]);
                                }

                                _context2.next = 3;
                                return client.getAsync(chatId);

                            case 3:
                                schedule = _context2.sent;

                                if (!(schedule === null)) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt('return');

                            case 6:

                                IntervalHelper.intervals[chatId] = setInterval(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var date, milisec, dataMinsk, _ref3, hours, minutes;

                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    date = new Date();
                                                    milisec = (date.getTimezoneOffset() / 60 * -1 + 3) * 60 * 60 * 1000;
                                                    dataMinsk = new Date(date.getTime() + milisec);
                                                    _ref3 = [dataMinsk.getHours(), dataMinsk.getMinutes()], hours = _ref3[0], minutes = _ref3[1];

                                                    console.log('checked', schedule, hours, minutes);
                                                    if (schedule.indexOf(hours + ':' + (minutes < 10 ? '0' + minutes : minutes)) !== -1) {
                                                        telegram.sendSticker(chatId, 'CAADAgADnwADV08VCMRycuQqC77iAg');
                                                    }

                                                case 6:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                })), 10000);

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function updateInterval(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return updateInterval;
        }()
    }]);

    return IntervalHelper;
}();

IntervalHelper.intervals = {};
//# sourceMappingURL=intervalHelper.js.map