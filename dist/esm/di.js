var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Device as NativeDevice } from 'ionic-native';
import { Auth, BasicAuth, CombinedAuthTokenContext, CustomAuth, FacebookAuth, GithubAuth, GoogleAuth, InstagramAuth, LinkedInAuth, TwitterAuth } from './auth';
import { Client } from './client';
import { Config } from './config';
import { Cordova } from './cordova';
import { Core } from './core';
import { Deploy } from './deploy/deploy';
import { Device } from './device';
import { EventEmitter } from './events';
import { Insights } from './insights';
import { Logger } from './logger';
import { Push } from './push/push';
import { Storage, LocalStorageStrategy, SessionStorageStrategy } from './storage';
import { UserContext, SingleUserService } from './user/user';
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
export var Container = (function () {
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
            return new Config();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "eventEmitter", {
        get: function () {
            return new EventEmitter();
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
            return new Logger(c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "localStorageStrategy", {
        get: function () {
            return new LocalStorageStrategy();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "sessionStorageStrategy", {
        get: function () {
            return new SessionStorageStrategy();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "authTokenContext", {
        get: function () {
            var label = 'auth_' + this.config.get('app_id');
            return new CombinedAuthTokenContext({
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
                'tempStorage': new Storage({ 'strategy': this.sessionStorageStrategy })
            }, label);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "client", {
        get: function () {
            return new Client(this.authTokenContext, this.config.getURL('api'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "insights", {
        get: function () {
            return new Insights({
                'appStatus': this.appStatus,
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
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
            return new Core({
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
            return new Device({ 'nativeDevice': NativeDevice, 'emitter': this.eventEmitter });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "cordova", {
        get: function () {
            return new Cordova({
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
            return new UserContext({ 'storage': new Storage({ 'strategy': this.localStorageStrategy }), 'config': this.config });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "singleUserService", {
        get: function () {
            return new SingleUserService({ 'client': this.client, 'context': this.userContext });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "authModules", {
        get: function () {
            return {
                'basic': new BasicAuth({ 'config': this.config, 'client': this.client }),
                'custom': new CustomAuth({ 'config': this.config, 'client': this.client }),
                'twitter': new TwitterAuth({ 'config': this.config, 'client': this.client }),
                'facebook': new FacebookAuth({ 'config': this.config, 'client': this.client }),
                'github': new GithubAuth({ 'config': this.config, 'client': this.client }),
                'google': new GoogleAuth({ 'config': this.config, 'client': this.client }),
                'instagram': new InstagramAuth({ 'config': this.config, 'client': this.client }),
                'linkedin': new LinkedInAuth({ 'config': this.config, 'client': this.client })
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "auth", {
        get: function () {
            return new Auth({
                'config': this.config,
                'emitter': this.eventEmitter,
                'authModules': this.authModules,
                'tokenContext': this.authTokenContext,
                'userService': this.singleUserService,
                'storage': new Storage({ 'strategy': this.localStorageStrategy })
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
            return new Push({
                'config': config,
                'auth': this.auth,
                'userService': this.singleUserService,
                'device': this.device,
                'client': this.client,
                'emitter': this.eventEmitter,
                'storage': new Storage({ 'strategy': this.localStorageStrategy }),
                'logger': this.logger
            }, c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "deploy", {
        get: function () {
            return new Deploy({
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
