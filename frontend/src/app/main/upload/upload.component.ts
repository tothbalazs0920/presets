import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Preset } from './../preset/preset';
import { AuthService } from './../user/auth.service'
import { PresetService } from './../preset/preset.service';


@Component({
    selector: 'simple-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {
    preset: Preset;
    private URL = 'http://localhost:3001/api/upload';
    public uploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    constructor(
        private authService: AuthService,
        private presetService: PresetService) {

    }

    ngOnInit(): void {
        this.preset = new Preset();
        this.uploader = new FileUploader({ url: this.URL });
        this.uploader.onAfterAddingFile = () => this.onUploaderAfterAddingFile();
        this.uploader.onWhenAddingFileFailed = () => this.onUploaderWhenAddingFileFailed();
    }

    onUploaderAfterAddingFile(): void {
        this.uploader.queue[0].upload();
    }

    onUploaderWhenAddingFileFailed(): void {

    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    save(): void {
        this.preset.email = localStorage.getItem('preset_profile');
        this.presetService.savePreset(this.preset)
            .then(fiename => this.preset.audioFileId);
    }
}
