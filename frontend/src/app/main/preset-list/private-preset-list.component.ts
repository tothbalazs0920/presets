import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

import { Preset } from './../preset';
import { PresetService } from './../services/preset.service';
import { AudioService } from './../services/audio.service'
import { PresetModal } from './../preset-modal/preset-modal.component'
import { PresetListComponent } from './preset-list.component';

@Component({
    selector: 'private-preset-list',
    templateUrl: 'preset-list.component.html',
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
        this.presetService.getPersonalPresets('bat@trustpilot.com')
            .then(presets => this.presets = presets);
    }
}
