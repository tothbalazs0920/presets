import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Preset } from './../preset/preset';
import { PresetService } from './../preset/preset.service';
import { AuthService } from './../user/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'preset-modal',
    templateUrl: 'preset-modal.component.html'
})
export class PresetModal implements OnInit {
    preset: Preset
    @Input() presets: Preset[];
    URL = 'http://localhost:3001/upload';
    public uploader: FileUploader;

    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    };

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    };

    constructor(
        private authService: AuthService,
        private presetService: PresetService) {
            
    }

    ngOnInit(): void {
        this.preset = new Preset();
        this.uploader = new FileUploader({ url: this.URL });
        this.uploader.onAfterAddingFile = () => this.onUploaderAfterAddingFile();
    }


    onUploaderAfterAddingFile(): void {
        this.uploader.queue[0].upload();
    }

    save(): void {
        this.preset.email = this.authService.user.email;
        this.presetService.savePreset(this.preset)
            .then(result => this.presets.push(this.preset));
    }
}
