import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from './../auth-http/auth-http';
import { Observable } from 'rxjs/Observable';
import { PresetList } from './../preset-list/preset-list.interface';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Preset } from './preset';

@Injectable()
export class PresetService {
  private presetListUrl = 'http://localhost:3001/api/presets';
  private presetUpdateUrl = 'http://localhost:3001/api/preset';
  private personalPresetListUrl = 'http://localhost:3001/api/preset/profile';
  private downloadPresetUrl = 'http://localhost:3001/api/presetfile/';

  constructor(private http: Http, private authHttp: AuthHttp) { }
  getPresets(): Observable<any> {
    return this.http
      .get(this.presetListUrl)
      .map((res: Response) => {
        return res.json() as Preset[];
      });
  }


  getPersonalPresets(): Observable<any> {
    return this.authHttp
      .get(this.personalPresetListUrl)
      .map((res: Response) => {
        return res.json() as Preset[];
      });
  }

  savePreset(preset: Preset) {
    return this.authHttp
      .post(this.presetUpdateUrl, preset)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  getSearchResult(search: string = null, page = 1, limit = 6): Observable<PresetList<Preset>> {
    let params: URLSearchParams = new URLSearchParams();
    if (search) {
      params.set('search', search);
    }
    if (page) {
      params.set('page', String(page));
    }
    if (limit) {
      params.set('limit', String(limit));
    }

    return this.http.get('http://localhost:3001/api/presetList', { search: params }).map(res => res.json());
  }

  downloadPreset(presetId: string) {
    return this.downloadPresetUrl + presetId;
  }

  deletePreset(presetId: string) {
    return this.authHttp
      .delete(this.presetUpdateUrl + '/' + presetId)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
