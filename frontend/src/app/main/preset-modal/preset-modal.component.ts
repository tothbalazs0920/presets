import { Component, OnInit, Input } from '@angular/core';
import { Preset } from './../preset';
import { PresetService } from './../services/preset.service';
import { AuthService } from './../services/auth.service';

@Component({
    selector: 'preset-modal',
    templateUrl: 'preset-modal.component.html'

})
export class PresetModal implements OnInit {
    preset: Preset;
    @Input() presets: Preset[];

    constructor(private authService: AuthService,
        private presetService: PresetService) {
    }

    ngOnInit(): void {
        this.preset = new Preset();
        this.preset.email = "bat@trustpilot.com";
    }

    save(): void {
        this.presetService.savePreset(this.preset)
            .then(result => this.presets.push(this.preset));
    }
}