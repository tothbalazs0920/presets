import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AudioFileService {
  private URL = 'http://localhost:3001/api/audio/';
  constructor(
    private http: Http
  ) { }

  getAudioFile(audioFileId: string) {
    return this.URL + audioFileId;
  }
}
