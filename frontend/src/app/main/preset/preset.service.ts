import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable'
import { PresetList } from './../preset-list/preset-list.interface'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Preset } from './preset';

@Injectable()
export class PresetService {
  private presetListUrl = 'http://localhost:3001/api/presets';
  private presetUpdateUrl = 'http://localhost:3001/api/preset';
  private personalPresetListUrl = 'http://localhost:3001/api/preset/user/';

  constructor(private http: Http, private authHttp: AuthHttp) { }
  getPresets(): Promise<Preset[]> {
    return this.http
      .get(this.presetListUrl)
      .toPromise()
      .then(response => response.json() as Preset[])
      .catch(this.handleError);
  }

  getPersonalPresets(email: string) {
    return this.authHttp
      .get(this.personalPresetListUrl + email)
      .toPromise()
      .then(response => response.json() as Preset[])
      .catch(this.handleError);
  }

  savePreset(preset: Preset): Promise<string> {
    return this.http
      .post(this.presetUpdateUrl, preset)
      .toPromise()
      .then(response => response.json().filename as string)
      .catch(this.handleError);
  }

  getSearchResult(search: string = null, page: number = 1, limit: number = 6): Observable<PresetList<Preset>> {
    let params: URLSearchParams = new URLSearchParams();
    if (search) params.set('search', search)
    if (page) params.set('page', String(page))
    if (limit) params.set('limit', String(limit))

    return this.http.get('http://localhost:3001/api/presetList', { search: params }).map(res => res.json());
  }

    private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
