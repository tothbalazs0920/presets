import { Component, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Preset } from './../preset/preset';
import { AuthService } from './../user/auth.service'
import { PresetService } from './../preset/preset.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'simple-upload',
    templateUrl: './upload.component.html'
})
export class UploadComponent {
    preset: Preset;
    private URL = 'http://localhost:3001/api/upload';
    private presetUploadUrl = 'http://localhost:3001/api/presetfile/upload';
    public uploader: FileUploader;
    public presetUploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    @ViewChild('myModal')
    modal: ModalComponent;

    constructor(
        private authService: AuthService,
        private presetService: PresetService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute
            .params
            .flatMap(
            params => {
                return this.presetService.getPreset(params['id']);
            }).subscribe(result => {
                if (result) {
                    this.preset = result;
                } else {
                    this.preset = new Preset();
                }
            });

        this.uploader = new FileUploader({ url: this.URL });
        this.uploader.onAfterAddingFile = () => this.onUploaderAfterAddingFile();
        this.uploader.onWhenAddingFileFailed = () => this.onUploaderWhenAddingFileFailed();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.preset.audioFileId = JSON.parse(response).filename;
        };

        this.presetUploader = new FileUploader({ url: this.presetUploadUrl });
        this.presetUploader.onAfterAddingFile = () => {
            this.presetUploader.queue[0].alias = 'presetFile';
            this.presetUploader.queue[0].upload();
        };
        this.presetUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log(JSON.parse(response).filename);
            this.preset.presetId = JSON.parse(response).filename;
        };
    }

    onUploaderAfterAddingFile(): void {
        this.uploader.queue[0].upload();
    }

    onUploaderWhenAddingFileFailed(): void {}

    save(): void {
        this.presetService.savePreset(this.preset)
            .then(x => {
                this.modal.open();
                setTimeout(() => this.modal.close(), 700)
            });
    }
}
