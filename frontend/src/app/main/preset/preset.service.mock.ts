import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { AuthHttp } from './../auth-http/auth-http';
import { Observable } from 'rxjs/Observable'
import { PresetList } from './../preset-list/preset-list.interface'
import { PresetService } from './preset.service'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Preset } from './preset';

@Injectable()
class PresetServiceMock extends PresetService {

    presets = [
        {
            "_id": "58c70140cf35d3cb6f3dbf3a",
            "id": 12231,
            "name": "Pantera - Walk",
            "technology": "Axe-Fx II",
            "presetAuthor": "Balazs",
            "lead": true,
            "clean": false,
            "rythm": false,
            "author": "Pantera",
            "album": "VulgarDisplayofPower",
            "songTitle": "Walk",
            "preset": "",
            "img": "",
            "currency": "USD",
            "price": 299.99,
            "description": "The Playstation 4 is the next gen console toown.With the best games and online experience.",
            "audioFileId": "Pantera_Walk.mp3",
            "email": "tothbalazs0920@gmail.com",
            "michrophones": [
                "sm57"
            ],
            "cabinet": [
                "Randall"
            ],
            "amp": [
                "Randall"
            ],
            "genre": [
                "metal"
            ]
        },
        {
            "_id": "58c70140cf35d3cb6f3dbf3b",
            "id": 12234,
            "name": "Iron Maiden - Somewhere in time",
            "technology": "Axe-Fx II",
            "presetAuthor": "Balazs",
            "lead": false,
            "clean": true,
            "rythm": false,
            "author": "Pantera",
            "album": "Pieceofmind",
            "songTitle": "Trooper",
            "preset": "",
            "img": "",
            "currency": "USD",
            "description": "The Note7 has been fixed and will no longer explode.Getitan amazing price!",
            "price": 899.99,
            "audioFileId": "Somwhere_in_time.mp3",
            "email": "tothbalazs0920@gmail.com",
            "michrophones": [
                "sm57"
            ],
            "cabinet": [
                "Marshall"
            ],
            "amp": [
                "Marshall"
            ],
            "genre": [
                "metal"
            ]
        }];

    constructor() {
        super(null, null);
    }

    getPresets() {
        return Observable.of(this.presets);
    }

    getPersonalPresets() {
        return Observable.of(this.presets);
    }

    savePreset(preset: Preset) {
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    }

    getSearchResult(search: string = null, page: number = 1, limit: number = 6): Observable<PresetList<Preset>> {
        return Observable.of();
    }

    downloadPreset(presetId: string) {
        return "";
    }

    deletePreset(presetId: string) {
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    }

}
