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
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log(JSON.parse(response).filename);
            this.preset.audioFileId = JSON.parse(response).filename;
            console.log("");
        };
    }

    onUploaderAfterAddingFile(): void {
        this.uploader.queue[0].upload();
        console.log('');
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
        this.presetService.savePreset(this.preset)
            .then();
    }
}
