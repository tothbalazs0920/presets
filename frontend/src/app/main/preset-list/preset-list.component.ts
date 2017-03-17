import { Component, OnInit } from '@angular/core';
import { Preset } from './../preset';
import { AudioService } from './../services/audio.service'

@Component({
  selector: 'preset-list'
})
export class PresetListComponent {
  playing = false;
  current?: string;

  constructor(
    protected audioService: AudioService) {
  }

  handlePlay(id: string, audioFileId: number) {
    this.current = id;
    this.audioService.play(audioFileId);
    this.playing = true;
  }

  handlePause(id: string) {
    this.current = id;
    this.audioService.audio.pause();
    this.playing = false;
  }

  showPause(id: string) {
    if (this.current != id) {
      return false;
    }
    if (this.current === id && this.playing) {
      return true;
    }
    return false;
  }

  showPlay(id: string) {
    if (this.current != id) {
      return true;
    }
    if (this.current === id && !this.playing) {
      return true;
    }
    return false;
  }

}
