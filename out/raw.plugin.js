// Generated by CoffeeScript 1.6.2
(function() {
  var eachr,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  eachr = require('eachr');

  module.exports = function(BasePlugin) {
    var raw, _ref;

    return raw = (function(_super) {
      __extends(raw, _super);

      function raw() {
        _ref = raw.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      raw.prototype.name = 'raw';

      raw.prototype.writeAfter = function(opts, next) {
        var balUtil, config, docpad, outPath, winNotCygwin, _base, _base1;

        docpad = this.docpad;
        config = docpad.getConfig();
        balUtil = require('bal-util');
        winNotCygwin = /win/.test(process.platform) && !/cygwin/.test(process.env.PATH);
        if (winNotCygwin) {
          outPath = config.outPath + '\\';
        } else {
          outPath = config.outPath + '/';
        }
        config.plugins || (config.plugins = {});
        (_base = config.plugins).raw || (_base.raw = {});
        (_base1 = config.plugins.raw).commands || (_base1.commands = (winNotCygwin ? {
          raw: ['xcopy', '/e', '/q']
        } : {
          raw: ['cp', '-Rn']
        }));
        return eachr(config.plugins.raw.commands, function(command, key) {
          var rawPath;

          rawPath = config.srcPath + (winNotCygwin ? '\\' + key + '\\*' : '/' + key + '/*');
          command = command.concat([rawPath, outPath]);
          docpad.log('info', 'Copying ' + key + ' directory [' + command.join(' ') + ']');
          return balUtil.spawn(command, {
            output: true
          }, function(err) {
            if (err) {
              return next(err);
            }
            docpad.log('debug', 'Copied raw directory');
            return next();
          });
        });
      };

      return raw;

    })(BasePlugin);
  };

}).call(this);
