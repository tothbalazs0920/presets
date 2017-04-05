import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { AudioPlayer } from './audio-player/audio-player.component';

import { PresetService } from './preset/preset.service';
import { AuthService } from './user/auth.service';
import { AuthGuard } from './user/auth-guard.service';
import { AudioService } from './audio-player/audio.service';
import { AudioFileService } from './audio-player/audio-file.service';
import { UserService } from './user/user.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { PresetModal } from './preset-modal/preset-modal.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    Ng2Bs3ModalModule,
    FileUploadModule,
  ],
  declarations: [
    AppComponent,
    routedComponents,
    AudioPlayer,
    PresetModal
  ],
  providers: [
    PresetService,
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard,
    AudioService,
    AudioFileService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
