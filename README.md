angular2-baidu-map
=====================

[![NPM version][npm-image]][npm-url]
![][david-url]
![][dt-url]
![][license-url]

Angular2 component for Baidu map

## Install via npm ##

```bash
npm install angular2-baidu-map
```

## Usage ##

```javascript
import {Component, OnInit} from 'angular2/core';
import {BaiduMap} from 'angular2-baidu-map';

@Component({
    selector: 'map-presentation',
    template: `
        <h1>Test Baidu-Map<h1>
        <baidu-map mapKey="put your ak here" [options]="opts"></baidu-map>
    `,
    styles: `
        baidu-map{
            width: 500px;
            height: 400px;
            display: block;
        }
    `,
    directives: [BaiduMap]
})
export class MainApp implements OnInit {

    opts: any;

    ngOnInit{
        this.opts = {
            center: {
                longitude: 121.506191,
                latitude: 31.245554
            },
            zoom: 17,
            markers: [{
                longitude: 121.506191,
                latitude: 31.245554,
                title: 'Where',
                content: 'Put description here'
            }]
        };
    }

}
```

For more information, see [documentation](http://leftstick.github.io/angular2-baidu-map/)


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular2-baidu-map/master/LICENSE)


[npm-url]: https://npmjs.org/package/angular2-baidu-map
[npm-image]: https://badge.fury.io/js/angular2-baidu-map.png
[david-url]: https://david-dm.org/leftstick/angular2-baidu-map.png
[dt-url]:https://img.shields.io/npm/dt/angular2-baidu-map.svg
[license-url]:https://img.shields.io/npm/l/angular2-baidu-map.svg
