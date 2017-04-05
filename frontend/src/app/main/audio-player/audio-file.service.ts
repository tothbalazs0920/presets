import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AudioFileService {

    constructor(
      private http: Http
    ) {}

    getAudioFile(audioFileId: string) { 
      return './uploads/' + audioFileId;
    }
}