/**
 * this file is highly inaccurate, check the docs at electronjs.org
 */

declare module 'electron' {
	declare export var app: App;
	declare export var remote: any;
	declare export var webFrame: WebFrame;
	declare export var ipcRenderer: any;
	declare export var ipcMain: any;
	declare export var nativeImage: {
		// https://electronjs.org/docs/api/native-image
		createEmpty(): NativeImage;
		createFromPath(String): NativeImage;
		createFromBuffer(Buffer, opts?: {width: Number, height: Number, scaleFactor: Number}): NativeImage;
	};
	declare export var shell: {
		// Open the given external protocol URL in the desktop's default manner.
		// (For example, mailto: URLs in the user's default mail agent).
		openExternal(url: string): void;
		// Open the given file in the desktop's default manner.
		openItem(fullPath: string): boolean;
	};

	declare export type NativeImage = {};

	declare export class Menu {
		// https://electronjs.org/docs/api/menu
		constructor(): Menu;
		popup(opts?: {window: BrowserWindow, x: Number, y: Number, positioningItem: Number, callback: Function}): void;
		append(MenuItem): void;
		static setApplicationMenu(Menu | null): void;
		static getApplicationMenu(): Menu | null;
	}

	declare export class App {
		on(AppEvent, (Event, ...Array<any>) => void): App,
		requestSingleInstanceLock(): void,
		quit(): void,
		exit(code: Number): void,
		getVersion(): string,
		getName(): string,
		setPath(name: string, path: string): void;
		setAppUserModelId(string): void,
		isDefaultProtocolClient(protocol: string, path?: string, args?: [string]): boolean,
		setAsDefaultProtocolClient(protocol: string, path?: string, args?: [string]): boolean,
		removeAsDefaultProtocolClient(protocol: string, path?: string, args?: [string]): boolean,
		dock: Dock,
	}

	declare export type Dock = {
		setMenu(Menu): void,
		bounce(): void,
		hide(): void,
		show(): void,
	}

	declare export class MenuItem {
		// https://electronjs.org/docs/api/menu-item
		constructor(opts: {
			click?: Function,
			menuItem?: MenuItem,
			browserWindow?: BrowserWindow,
			event?: Event,
			role?: String,
			type?: String,
			label?: String,
			sublabel?: String,
			accelerator?: String,
			icon?: NativeImage | String,
			enabled?: Boolean,
			visible?: Boolean,
			checked?: Boolean,
			registerAccelerator?: Boolean,
			id?: String,
			before?: String,
			after?: String,
			beforeGroupContaining?: String,
			afterGroupContaining?: String,
		}): MenuItem;
	}

	declare export class BrowserWindow {
		// https://github.com/electron/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions
		constructor(any): BrowserWindow;
		on(BrowserWindowEvent, (Event, ...Array<any>) => void): BrowserWindow;
		once(BrowserWindowEvent, (Event, ...Array<any>) => void): BrowserWindow;
		focus(): void;
		hide(): void;
		restore(): void;
		show(): void;
		maximize(): void;
		unmaximize(): void;
		isMaximized(): boolean;
		loadFile(string): void;
		loadURL(string): void;
		isMinimized(): boolean;
		openDevTools(): void;
		getTitle(): string;
		webContents: WebContents;
		id: Number;

		static fromId(number): BrowserWindow;
	}

	declare export class Tray {
		// https://electronjs.org/docs/api/tray
		constructor(string | NativeImage): Tray;
		destroy(): void;
		setImage(string | NativeImage): void;
		setPressedImage(string | NativeImage): void;
		setTooltip(string): void;
		setTitle(string): void;
		setContextMenu(Menu | null): void;
		on(TrayEvent, (Event, ...Array<any>) => void): Tray;
	}

	declare export class Notification {
		constructor({|
			            title: string,
			            subtitle?: string,
			            body: string,
			            silent?: boolean,
			            icon?: string,
			            hasReply?: boolean,
			            replyPlaceholder?: string,
			            sound?: string,
			            actions?: [NotificationAction],
			            closeButtonText?: string
		            |}): Notification;
		on(DesktopNotificationEvent, (Event, ...Array<any>) => void): Notification;
		show(): void;
		static isSupported(): boolean;
	}

	declare export class WebContents {
		on(WebContentsEvent, (Event, ...Array<any>) => void): WebContents;
		send(string, any): void;
		session: ElectronSession;
		getURL(): string;
		getZoomFactor((factor: number) => void): void;
		setZoomFactor(factor: number): void;
		openDevTools(opts?: {|mode: string|}): void;
		isDevToolsOpened(): boolean;
		closeDevTools(): void;
		print(): void;
		toggleDevTools(): void;
		reloadIgnoringCache(): void;
		findInPage(searchString: string, opts: {forward: boolean, matchCase: boolean}): void;
		stopFindInPage(action: "clearSelection" | "keepSelection" | "activateSelection"): void;
	}

	declare export class WebFrame {
		getZoomFactor(): number;
		setZoomFactor(factor: number): void;
	}

	declare export class ElectronSession {
		setPermissionRequestHandler: (PermissionRequestHandler | null) => void;
	}

	declare export type PermissionRequestHandler = (WebContents, ElectronPermission, (boolean) => void) => void;
	declare export type ElectronPermission
		= 'media'
		| 'geolocation'
		| 'notifications'
		| 'midiSysex'
		| 'pointerLock'
		| 'fullscreen'
		| 'openExternal';
}

declare module 'electron-updater' {
	declare export var autoUpdater: AutoUpdater
}

declare module 'electron-localshortcut' {
	declare module .exports: {
		register(win?: BrowserWindow, shortcut: string, cb: Function): void;
		unregister(shortcut: string): void;
		isRegistered(shortcut: string): boolean;
		unregisterAll(): void;
		enableAll(win?: BrowserWindow): void;
		disableAll(win?: BrowserWindow): void;
	}
;
}

declare module 'fs-extra' {
	declare export default any;
	//declare export var fs: any;
}

declare module 'bluebird' {
	declare export default any;
}

declare module 'request' {
	declare export default any;
}

declare module 'node-forge' {
	declare export default any;
}

declare class AutoUpdater {
	on: (AutoUpdaterEvent, (Event, ...Array<any>) => void) => void;
	logger: {
		info: (string) => void,
		debug: (string) => void,
		verbose: (string) => void,
		error: (string) => void,
		warn: (string) => void,
		silly: (string) => void
	};
	checkForUpdatesAndNotify(): Promise<any>;
	checkForUpdates(): Promise<UpdateCheckResult>;
	getUpdateInfo(): Promise<UpdateInfo>;
	downloadUpdate(): Promise<any>;
	quitAndInstall(isSilent?: boolean, isForceRunAfter?: boolean): void;
	autoInstallOnAppQuit: boolean;
	downloadedUpdateHelper: any;
	currentVersion: SemVer;
	autoDownload: boolean;
}

// https://electronjs.org/docs/api/structures/notification-action
export type NotificationAction = {|
	type: string,
	text?: string
|}

export type UpdateCheckResult = {
	updateInfo: UpdateInfo,
	downloadPromise: Promise<Array<String>>,
	cancellationToken: CancellationToken
}

export type UpdateInfo = {
	version: string,
	files: Array<UpdateFileInfo>,
	path: string,
	sha512: string,
	releaseName: string,
	releaseNotes: string,
	releaseDate: string,
	stagingPercentage: Number,
	signature: string
}

export type SemVer = {
	raw: string,
	major: Number,
	minor: Number,
	patch: Number,
	version: string
}

export type CancellationToken = {
	cancel(): void,
	onCancel(Function): void
}

export type UpdateFileInfo = {
	url: string
}

// https://github.com/electron/electron/blob/master/docs/api/app.md#events
export type AppEvent
	= 'will-finish-launching'
	| 'ready'
	| 'second-instance'
	| 'activate'
	| 'window-all-closed'
	| 'before-quit'
	| 'will-quit'
	| 'open-file'
	| 'open-url'
	| 'continue-activity'
	| 'will-continue-activity'
	| 'continue-activity-error'
	| 'activity-was-continued'
	| 'update-activity-state'
	| 'new-window-for-tab'
	| 'browser-window-blur'
	| 'browser-window-focus'
	| 'browser-window-created'
	| 'web-contents-created'
	| 'certificate-error'
	| 'select-client-certificate'
	| 'login'
	| 'gpu-process-crashed'
	| 'accessibility-support-changed'
	| 'session-created'


// https://github.com/electron/electron/blob/master/docs/api/browser-window.md#instance-events
export type BrowserWindowEvent
	= 'page-title-updated'
	| 'close'
	| 'closed'
	| 'session-end'
	| 'unresponsive'
	| 'responsive'
	| 'blur'
	| 'focus'
	| 'show'
	| 'hide'
	| 'ready-to-show'
	| 'maximize'
	| 'unmaximize'
	| 'minimize'
	| 'restore'
	| 'will-resize'
	| 'resize'
	| 'will-move'
	| 'move'
	| 'moved'
	| 'enter-full-screen'
	| 'leave-full-screen'
	| 'enter-html-full-screen'
	| 'leave-html-full-screen'
	| 'always-on-top-changed'
	| 'app-command'
	| 'scroll-touch-begin'
	| 'scroll-touch-end'
	| 'scroll-touch-edge'
	| 'swipe'
	| 'sheet-begin'
	| 'sheet-end'
	| 'new-window-for-tab'

// https://github.com/electron/electron/blob/master/docs/api/web-contents.md#instance-events
export type WebContentsEvent
	= 'did-finish-load'
	| 'did-fail-load'
	| 'did-frame-finish-load'
	| 'did-start-loading'
	| 'did-stop-loading'
	| 'dom-ready'
	| 'page-favicon-updated'
	| 'new-window'
	| 'will-navigate'
	| 'did-start-navigation'
	| 'will-redirect'
	| 'did-redirect-navigation'
	| 'did-navigate'
	| 'did-frame-navigate'
	| 'did-navigate-in-page'
	| 'will-prevent-unload'
	| 'crashed'
	| 'unresponsive'
	| 'responsive'
	| 'plugin-crashed'
	| 'destroyed'
	| 'before-input-event'
	| 'devtools-opened'
	| 'devtools-closed'
	| 'devtools-focused'
	| 'certificate-error'
	| 'select-client-certificate'
	| 'login'
	| 'found-in-page'
	| 'media-started-playing'
	| 'media-paused'
	| 'did-change-theme-color'
	| 'update-target-url'
	| 'cursor-changed'
	| 'context-menu'
	| 'select-bluetooth-device'
	| 'paint'
	| 'devtools-reload-page'
	| 'will-attach-webview'
	| 'did-attach-webview'
	| 'console-message'

export type AutoUpdaterEvent
	= 'error'
	| 'checking-for-update'
	| 'update-available'
	| 'update-not-available'
	| 'download-progress'
	| 'update-downloaded'

export type TrayEvent
	= 'click'
