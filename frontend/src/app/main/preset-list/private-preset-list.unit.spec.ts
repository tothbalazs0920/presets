import { PrivatePresetListComponent } from './private-preset-list.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { PresetService } from '../preset/preset.service';
import { AudioService } from '../audio-player/audio.service';
import { AuthService } from '../user/auth.service';
import { PresetList } from './preset-list.interface';
import { Preset } from './../preset/preset';
import 'rxjs/add/operator/map';

describe('Private preset list unit test', () => {
    let privatePresetListComponent: PrivatePresetListComponent;
    let presetService: PresetService;
    let authService: AuthService;
    let audioService: AudioService;

    beforeEach(() => {
        presetService = new PresetServiceMock();
        authService = new AuthServiceMock();
        audioService = new AudioServiceMock();
        privatePresetListComponent = new PrivatePresetListComponent(presetService, authService, audioService);
    });

    it('populates presets on ngOninit', () => {
        privatePresetListComponent.ngOnInit();
        expect(privatePresetListComponent.presets.length).toBe(2);
    });
});

class PresetServiceMock extends PresetService {

    presets = [
        {
            '_id': '58c70140cf35d3cb6f3dbf3a',
            'id': 12231,
            'name': 'Pantera - Walk',
            'technology': 'Axe-Fx II',
            'presetAuthor': 'Balazs',
            'lead': true,
            'clean': false,
            'rythm': false,
            'author': 'Pantera',
            'album': 'VulgarDisplayofPower',
            'songTitle': 'Walk',
            'preset': '',
            'img': '',
            'currency': 'USD',
            'price': 299.99,
            'description': 'The Playstation 4 is the next gen console toown.With the best games and online experience.',
            'audioFileId': 'Pantera_Walk.mp3',
            'email': 'tothbalazs0920@gmail.com',
            'michrophones': [
                'sm57'
            ],
            'cabinet': [
                'Randall'
            ],
            'amp': [
                'Randall'
            ],
            'genre': [
                'metal'
            ]
        },
        {
            '_id': '58c70140cf35d3cb6f3dbf3b',
            'id': 12234,
            'name': 'Iron Maiden - Somewhere in time',
            'technology': 'Axe-Fx II',
            'presetAuthor': 'Balazs',
            'lead': false,
            'clean': true,
            'rythm': false,
            'author': 'Pantera',
            'album': 'Pieceofmind',
            'songTitle': 'Trooper',
            'preset': '',
            'img': '',
            'currency': 'USD',
            'description': 'The Note7 has been fixed and will no longer explode.Getitan amazing price!',
            'price': 899.99,
            'audioFileId': 'Somwhere_in_time.mp3',
            'email': 'tothbalazs0920@gmail.com',
            'michrophones': [
                'sm57'
            ],
            'cabinet': [
                'Marshall'
            ],
            'amp': [
                'Marshall'
            ],
            'genre': [
                'metal'
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

    getSearchResult(search: string = null, page = 1, limit = 6): Observable<PresetList<Preset>> {
        return Observable.of();
    }

    downloadPreset(presetId: string) {
        return '';
    }

    deletePreset(presetId: string) {
        return new Promise((resolve, reject) => {
            resolve('ok');
        });
    }

}

export class AuthServiceMock extends AuthService {

    constructor() {
        super(null);
    }

    logout() {}

    loggedIn() {
        return true;
    }
}

export class AudioServiceMock extends AudioService {

  constructor() {
    super(null);
  }

  load(audioFileId) {
  }

  play(audioFileId) {
  }
}
