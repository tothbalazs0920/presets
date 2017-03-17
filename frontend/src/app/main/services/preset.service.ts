import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Preset } from './../preset';

@Injectable()
export class PresetService {
  private presetListUrl = 'http://localhost:3001/api/presets';
  private presetUpdateUrl = 'http://localhost:3001/api/preset';
  private personalPresetListUrl = 'http://localhost:3001/api/preset/user/';

  constructor(private http: Http, private authHttp: AuthHttp) { }
  getPresets() {
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

  savePreset(preset: Preset) {
    return this.http
      .post(this.presetUpdateUrl, preset)
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
