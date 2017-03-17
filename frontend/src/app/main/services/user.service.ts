import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { User } from './../user';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {
    private addUserUrl = 'http://localhost:3001/api/user';

    constructor(private http: Http, private authHttp: AuthHttp) { }

    addUserIfDoesNotExist(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.addUserUrl, JSON.stringify(user), options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body.data || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}