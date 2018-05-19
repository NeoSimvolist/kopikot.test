import "rxjs/add/observable/of";
import {Observable} from "rxjs/Observable";
import {delay} from "rxjs/operators";

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class DataItem {
    title: string;
    url: string;
}

@Injectable()
export class ApiService {

    private data: DataItem[];

    constructor(private httpClient: HttpClient) {
        this.data = Array.from(Array(10).keys()).map(value => {
            return {
                title: 'just item #' + (value + 1),
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWzHLRQWUvlyTimW7ux_NICk2-BM1NPYSK1Sy1laSEG-ecTnuZUg',
            };
        });
    }

    fetch() {
        // i do it because your URL doesn't work
        return Observable.of(this.data).pipe(delay(1000));
        // return this.httpClient.get<DataItem[]>('​https://api.bonusway.com/campaigns?limit=10&offset=0');
    }
}
