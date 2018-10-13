'use strict';

require('babel-polyfill');

var _telegraf = require('telegraf');

var _telegraf2 = _interopRequireDefault(_telegraf);

var _telegram = require('telegraf/telegram');

var _telegram2 = _interopRequireDefault(_telegram);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _intervalHelper = require('./intervalHelper');

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_bluebird2.default.promisifyAll(_redis2.default);

new _intervalHelper.IntervalHelper();

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').load();
}

var client = _redis2.default.createClient(process.env.REDIS_URL);

var bot = new _telegraf2.default(process.env.BOT_TOKEN);
var telegram = new _telegram2.default(process.env.BOT_TOKEN);

bot.start(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var chat;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('start');
                        _context.next = 3;
                        return ctx.getChat();

                    case 3:
                        chat = _context.sent;

                        _intervalHelper.IntervalHelper.updateInterval(chat.id, client, telegram);
                        ctx.replyWithSticker('CAADAgADxQADV08VCEQYKX_LsRKaAg');

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

(0, _commands2.default)(bot, telegram, client);
bot.startPolling();
//# sourceMappingURL=index.js.map