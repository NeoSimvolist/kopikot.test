import 'rxjs/observable/of';
import {Component, OnInit} from '@angular/core';

import {extractHostname} from "../classes/functions";

import {ApiService, DataItem} from "../api.service";

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

    static readonly maxClickCount = 10;

    totalClickCount = 0;
    rows: DataItem[] = [];

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        chrome.tabs.onActivated.addListener(this.onActivatedTab);
        chrome.runtime.onConnect.addListener(port => {
            port.onMessage.addListener(this.onMessage);
            if (this.rows.length) {
                port.postMessage({msg: 'update', data: this.rows});
            } else {
                this.apiService
                    .fetch()
                    .subscribe(data => {
                        this.rows = data;
                        port.postMessage({msg: 'update', data: this.rows});
                    });
            }
        });
    }

    private onMessage = (msg, port: chrome.runtime.Port) => {
        switch (msg) {
            case "fetch": {
                this.apiService
                    .fetch()
                    .subscribe(data => {
                        this.rows = data;
                        port.postMessage({msg: 'update', data: this.rows});
                    });
                break;
            }
            case "fetchMore": {
                this.apiService
                    .fetch()
                    .subscribe(data => {
                        this.rows.push(...data);
                        port.postMessage({msg: 'update', data: this.rows});
                    });
                break;
            }
            case "newTab": {
                if (this.totalClickCount >= EventPageComponent.maxClickCount) {
                    port.postMessage({msg, data: false});
                    break;
                }
                this.totalClickCount += 1;
                chrome.tabs.create({url: 'https://kopikot.ru'});
                port.postMessage({msg, data: true});
                break;
            }
        }
    }

    private onActivatedTab = info => {
        chrome.tabs.get(info.tabId, change => {
            const isTarget = ['kopikot.ru', 'www.kopikot.ru'].indexOf(extractHostname(change.url)) !== -1;
            const path = isTarget ? 'assets/active.png' : 'assets/default.png';
            chrome.browserAction.setIcon({path});
        });
    }
}
