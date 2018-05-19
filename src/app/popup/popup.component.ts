import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {DataItem} from "../api.service";

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

    rows: DataItem[] = [];
    loading = false;
    port: chrome.runtime.Port;
    warning: string = '';

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.port = chrome.runtime.connect();
        this.port.onMessage.addListener(this.onMessage);
    }

    openClick(event: Event) {
        this.port.postMessage("newTab");
    }

    fetchMore(event: Event) {
        this.loading = true;
        this.port.postMessage("fetchMore");
    }

    private throwWarning(warning: string) {
        this.warning = warning;
        setTimeout(() => {
            this.warning = '';
            this.changeDetectorRef.detectChanges();
        }, 1000);
    }

    private onMessage = response => {
        switch (response.msg) {
            case "update": {
                this.rows = response.data;
                this.loading = false;
                this.changeDetectorRef.detectChanges();
            }
            case "newTab": {
                if (response.data === false) {
                    this.throwWarning(chrome.i18n.getMessage('youCant'));
                    this.changeDetectorRef.detectChanges();
                }
            }
        }
    }
}
