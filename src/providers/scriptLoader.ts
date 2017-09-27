import { Inject, Injectable } from '@angular/core';
import { nullCheck } from '../helpers/validate';

type LOADING_STATE = 'NON' | 'LOADED' | 'LOADING';

export class ScriptLoaderConfig {
    public ak: String = '';
}

@Injectable()
export class ScriptLoader {
    private _scriptLoadState: LOADING_STATE = 'NON';
    private _loadingCallbacks: Array<Function> = [];
    private _config: ScriptLoaderConfig;

    constructor( @Inject(ScriptLoaderConfig) config: ScriptLoaderConfig) {
        nullCheck(config.ak, 'ak must be provided');

        this._config = config;
    }

    public load(cb: Function): void {
        if (this._scriptLoadState === 'LOADED') {
            return cb();
        }
        if (this._scriptLoadState === 'LOADING') {
            this._loadingCallbacks.push(cb);
            return;
        }
        this._scriptLoadState = 'LOADING';
        this._loadingCallbacks.push(cb);
        const MAP_URL = `//api.map.baidu.com/api?v=2.0&ak=${this._config.ak}&callback=baidumapinit&s=${window.location.protocol === 'https:' ? 1 : 0}`;

        window['baidumapinit'] = () => {
            this._scriptLoadState = 'LOADED';
            switchDisplay('baidu-map .baidu-map-instance', 'block');
            switchDisplay('baidu-map .baidu-map-offline', 'none');
            this._loadingCallbacks.forEach(c => {
                c();
            });
        };
        appendScriptTag(MAP_URL);
    }
}

function appendScriptTag(url: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = () => {
        switchDisplay('baidu-map .baidu-map-offline', 'block');
        switchDisplay('baidu-map .baidu-map-instance', 'none');
        document.body.removeChild(script);

        setTimeout(() => {
            appendScriptTag(url);
        }, 30000);
    };
    document.body.appendChild(script);
}

function switchDisplay(selector: string, state: string) {
    Array.prototype
        .slice
        .call(document.querySelectorAll(selector))
        .forEach((node: HTMLElement) => {
            node.style.display = state;
        });
}
