import { Component, OnInit } from '@angular/core';
import { AuthService } from './../user/auth.service';

import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AudioService } from './../audio-player/audio.service'
import { PresetListComponent } from './preset-list.component';

@Component({
    selector: 'private-preset-list',
    templateUrl: 'private-preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PrivatePresetListComponent extends PresetListComponent implements OnInit {
    presets: Preset[];

    constructor(
        private presetService: PresetService,
        private authService: AuthService,
        private AudioService: AudioService) {
            super(AudioService);
    }

    ngOnInit(): void {
        this.presetService.getPersonalPresets()
            .then(presets => this.presets = presets);
    }
}
