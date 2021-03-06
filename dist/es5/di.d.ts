import { AppStatus, IAuth, IAuthModules, IClient, ICombinedTokenContext, IConfig, ICordova, ICore, IDeploy, IDevice, IEventEmitter, IInsights, ILogger, IPush, ISingleUserService, IStorageStrategy, IUserContext } from './definitions';
/**
 * @hidden
 */
export declare class Container {
    readonly appStatus: AppStatus;
    readonly config: IConfig;
    readonly eventEmitter: IEventEmitter;
    readonly logger: ILogger;
    readonly localStorageStrategy: IStorageStrategy;
    readonly sessionStorageStrategy: IStorageStrategy;
    readonly authTokenContext: ICombinedTokenContext;
    readonly client: IClient;
    readonly insights: IInsights;
    readonly core: ICore;
    readonly device: IDevice;
    readonly cordova: ICordova;
    readonly userContext: IUserContext;
    readonly singleUserService: ISingleUserService;
    readonly authModules: IAuthModules;
    readonly auth: IAuth;
    readonly push: IPush;
    readonly deploy: IDeploy;
}
