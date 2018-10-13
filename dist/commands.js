'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (bot, telegram, client) {
    var _this = this;

    bot.command('add', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
            var chatId, regExp, result, _result$1$split, _result$1$split2, hours, minutes, timeString, schedule, res;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            chatId = ctx.message.chat.id;
                            regExp = /\/add ([0-9]{2}:[0-9]{2})/;
                            result = regExp.exec(ctx.message.text);

                            if (!(!result || !result[1])) {
                                _context.next = 6;
                                break;
                            }

                            telegram.sendMessage(chatId, 'Пиши нормально!');
                            return _context.abrupt('return');

                        case 6:
                            _result$1$split = result[1].split(':'), _result$1$split2 = _slicedToArray(_result$1$split, 2), hours = _result$1$split2[0], minutes = _result$1$split2[1];

                            if (!(hours >= 0 && hours < 24 && minutes >= 0 && minutes <= 59)) {
                                _context.next = 28;
                                break;
                            }

                            timeString = hours + ':' + minutes;
                            _context.next = 11;
                            return client.getAsync(chatId);

                        case 11:
                            schedule = _context.sent;

                            if (!(schedule === null)) {
                                _context.next = 17;
                                break;
                            }

                            _context.next = 15;
                            return client.setAsync(chatId, timeString);

                        case 15:
                            _context.next = 24;
                            break;

                        case 17:
                            res = schedule.split('.');

                            if (!res.find(function (t) {
                                return t === timeString;
                            })) {
                                _context.next = 21;
                                break;
                            }

                            telegram.sendMessage(chatId, 'Пиши нормально!');
                            return _context.abrupt('return');

                        case 21:

                            res.push(timeString);
                            _context.next = 24;
                            return client.setAsync(chatId, res.sort().join('.'));

                        case 24:

                            telegram.sendSticker(chatId, 'CAADAgADnAADV08VCF49wTfBNSDPAg');
                            _intervalHelper.IntervalHelper.updateInterval(chatId, client, telegram);
                            _context.next = 29;
                            break;

                        case 28:
                            telegram.sendMessage(chatId, 'Пиши нормально!');

                        case 29:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());

    bot.command('remove', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
            var chatId, regExp, result, schedule, _result$1$split3, _result$1$split4, hours, minutes;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            chatId = ctx.message.chat.id;
                            regExp = /\/remove ([0-9]{2}:[0-9]{2})/;
                            result = regExp.exec(ctx.message.text);
                            _context2.next = 5;
                            return client.getAsync(chatId);

                        case 5:
                            schedule = _context2.sent;

                            if (!(!result || !result[1])) {
                                _context2.next = 9;
                                break;
                            }

                            telegram.sendMessage(chatId, 'Пиши нормально!');
                            return _context2.abrupt('return');

                        case 9:
                            _result$1$split3 = result[1].split(':'), _result$1$split4 = _slicedToArray(_result$1$split3, 2), hours = _result$1$split4[0], minutes = _result$1$split4[1];

                            if (!(schedule.indexOf(hours + ':' + minutes) !== -1)) {
                                _context2.next = 17;
                                break;
                            }

                            _context2.next = 13;
                            return client.setAsync(chatId, schedule.split('.').filter(function (t) {
                                return t !== hours + ':' + minutes;
                            }).join('.'));

                        case 13:
                            telegram.sendSticker(chatId, 'CAADAgADmAADV08VCDNXeDKFVNRvAg');
                            _intervalHelper.IntervalHelper.updateInterval(chatId, client, telegram);
                            _context2.next = 18;
                            break;

                        case 17:
                            telegram.sendMessage(chatId, 'Пиши нормально!');

                        case 18:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }());

    bot.command('clear', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
            var chatId;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            chatId = ctx.message.chat.id;
                            _context3.next = 3;
                            return client.delAsync(chatId);

                        case 3:
                            telegram.sendSticker(chatId, 'CAADAgADoAADV08VCBicBX8exqU0Ag');
                            _intervalHelper.IntervalHelper.updateInterval(chatId, client, telegram);

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x3) {
            return _ref3.apply(this, arguments);
        };
    }());

    bot.command('fast', function (ctx) {
        var chatId = ctx.message.chat.id;
        telegram.sendSticker(chatId, 'CAADAgADnwADV08VCMRycuQqC77iAg');
    });
    bot.command('list', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
            var chatId, schedulle;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            chatId = ctx.message.chat.id;
                            _context4.next = 3;
                            return client.getAsync(chatId);

                        case 3:
                            schedulle = _context4.sent;

                            if (!(schedulle === null)) {
                                _context4.next = 7;
                                break;
                            }

                            telegram.sendMessage(chatId, 'Ничего нет');
                            return _context4.abrupt('return');

                        case 7:

                            telegram.sendMessage(chatId, 'Пойдем в ' + schedulle.split('.').join(', '));

                        case 8:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this);
        }));

        return function (_x4) {
            return _ref4.apply(this, arguments);
        };
    }());
};

var _intervalHelper = require('./intervalHelper');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=commands.js.map