import { Inject, Injectable, OpaqueToken } from '@angular/core';

export const LAZY_MAP_API_CONFIG = new OpaqueToken('angular2-baidu-map LAZY_MAP_API_CONFIG');


export interface LazyMapAPILoaderConfig {
    ak?: string;
}

@Injectable()
export class LazyMapAPILoader {
    private _scriptLoadingPromise: Promise<void>;
    private _config: LazyMapAPILoaderConfig;

    constructor( @Inject(LAZY_MAP_API_CONFIG) config: LazyMapAPILoaderConfig) {
        if (!config.ak) {
            throw new Error('ak must be provided');
        }
        this._config = config;
    }

    load(): Promise<void> {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        const MAP_URL = `//api.map.baidu.com/api?v=2.0&ak=${this._config.ak}&callback=baidumapinit&s=${location.protocol === 'https:' ? 1 : 0}`;

        return this._scriptLoadingPromise = new Promise<void>((resolve, reject) => {
            window['baidumapinit'] = resolve;
            appendScriptTag(MAP_URL);
        });
    }
}

function appendScriptTag(url: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onerror = function () {

        Array.prototype
            .slice
            .call(document.querySelectorAll('baidu-map .baidu-map-offline'))
            .forEach(function (node: HTMLElement) {
                node.style.display = 'block';
            });
        document.body.removeChild(script);

        setTimeout(() => {
            appendScriptTag(url);
        }, 30000);
    };
    document.body.appendChild(script);
}
