"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_native_1 = require('ionic-native');
var auth_1 = require('./auth');
var client_1 = require('./client');
var config_1 = require('./config');
var cordova_1 = require('./cordova');
var core_1 = require('./core');
var deploy_1 = require('./deploy/deploy');
var device_1 = require('./device');
var events_1 = require('./events');
var insights_1 = require('./insights');
var logger_1 = require('./logger');
var push_1 = require('./push/push');
var storage_1 = require('./storage');
var user_1 = require('./user/user');
var modules = {};
function cache(target, propertyKey, descriptor) {
    var method = descriptor.get;
    descriptor.get = function () {
        if (typeof method !== 'undefined' && typeof modules[propertyKey] === 'undefined') {
            var value = method.apply(this, arguments);
            modules[propertyKey] = value;
        }
        return modules[propertyKey];
    };
    descriptor.set = function (value) { };
}
/**
 * @hidden
 */
var Container = (function () {
    function Container() {
    }
    Object.defineProperty(Container.prototype, "appStatus", {
        get: function () {
            return { 'asleep': false, 'closed': false };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "config", {
        get: function () {
            return new config_1.Config();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "eventEmitter", {
        get: function () {
            return new events_1.EventEmitter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "logger", {
        get: function () {
            var config = this.config;
            var c = {};
            if (typeof config.settings !== 'undefined' && typeof config.settings.logger !== 'undefined') {
                c = config.settings.logger;
            }
            return new logger_1.Logger(c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "localStorageStrategy", {
        get: function () {
            return new storage_1.LocalStorageStrategy();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "sessionStorageStrategy", {
        get: function () {
            return new storage_1.SessionStorageStrategy();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "authTokenContext", {
        get: function () {
            var label = 'auth_' + this.config.get('app_id');
            return new auth_1.CombinedAuthTokenContext({
                'storage': new storage_1.Storage({ 'strategy': this.localStorageStrategy }),
                'tempStorage': new storage_1.Storage({ 'strategy': this.sessionStorageStrategy })
            }, label);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "client", {
        get: function () {
            return new client_1.Client(this.authTokenContext, this.config.getURL('api'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "insights", {
        get: function () {
            return new insights_1.Insights({
                'appStatus': this.appStatus,
                'storage': new storage_1.Storage({ 'strategy': this.localStorageStrategy }),
                'config': this.config,
                'client': this.client,
                'logger': this.logger
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "core", {
        get: function () {
            return new core_1.Core({
                'config': this.config,
                'logger': this.logger,
                'emitter': this.eventEmitter,
                'insights': this.insights
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "device", {
        get: function () {
            return new device_1.Device({ 'nativeDevice': ionic_native_1.Device, 'emitter': this.eventEmitter });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "cordova", {
        get: function () {
            return new cordova_1.Cordova({
                'appStatus': this.appStatus,
                'device': this.device,
                'emitter': this.eventEmitter,
                'logger': this.logger
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "userContext", {
        get: function () {
            return new user_1.UserContext({ 'storage': new storage_1.Storage({ 'strategy': this.localStorageStrategy }), 'config': this.config });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "singleUserService", {
        get: function () {
            return new user_1.SingleUserService({ 'client': this.client, 'context': this.userContext });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "authModules", {
        get: function () {
            return {
                'basic': new auth_1.BasicAuth({ 'config': this.config, 'client': this.client }),
                'custom': new auth_1.CustomAuth({ 'config': this.config, 'client': this.client }),
                'twitter': new auth_1.TwitterAuth({ 'config': this.config, 'client': this.client }),
                'facebook': new auth_1.FacebookAuth({ 'config': this.config, 'client': this.client }),
                'github': new auth_1.GithubAuth({ 'config': this.config, 'client': this.client }),
                'google': new auth_1.GoogleAuth({ 'config': this.config, 'client': this.client }),
                'instagram': new auth_1.InstagramAuth({ 'config': this.config, 'client': this.client }),
                'linkedin': new auth_1.LinkedInAuth({ 'config': this.config, 'client': this.client })
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "auth", {
        get: function () {
            return new auth_1.Auth({
                'config': this.config,
                'emitter': this.eventEmitter,
                'authModules': this.authModules,
                'tokenContext': this.authTokenContext,
                'userService': this.singleUserService,
                'storage': new storage_1.Storage({ 'strategy': this.localStorageStrategy })
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "push", {
        get: function () {
            var config = this.config;
            var c = {};
            if (typeof config.settings !== 'undefined' && typeof config.settings.push !== 'undefined') {
                c = config.settings.push;
            }
            return new push_1.Push({
                'config': config,
                'auth': this.auth,
                'userService': this.singleUserService,
                'device': this.device,
                'client': this.client,
                'emitter': this.eventEmitter,
                'storage': new storage_1.Storage({ 'strategy': this.localStorageStrategy }),
                'logger': this.logger
            }, c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "deploy", {
        get: function () {
            return new deploy_1.Deploy({
                'config': this.config,
                'emitter': this.eventEmitter,
                'logger': this.logger
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "appStatus", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "config", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "eventEmitter", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "logger", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "localStorageStrategy", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "sessionStorageStrategy", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "authTokenContext", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "client", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "insights", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "core", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "device", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "cordova", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "userContext", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "singleUserService", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "authModules", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "auth", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "push", null);
    __decorate([
        cache, 
        __metadata('design:type', Object)
    ], Container.prototype, "deploy", null);
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=di.js.map