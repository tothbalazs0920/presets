import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

import { Preset } from './../preset';
import { PresetService } from './../services/preset.service';
import { AudioService } from './../services/audio.service'
import { PresetListComponent } from './preset-list.component';

@Component({
    selector: 'preset-list',
    templateUrl: 'preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PublicPresetListComponent extends PresetListComponent implements OnInit {
    presets: Preset[];

    constructor(
        private AudioService: AudioService,
        private presetService: PresetService,
        private authService: AuthService
    ) {
        super(AudioService);
    }

    ngOnInit(): void {
        this.presetService.getPresets()
            .then(presets => this.presets = presets);
    }

}
