import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { AudioPlayer } from './audio-player/audio-player.component';

import { PresetService } from './services/preset.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AudioService } from './services/audio.service';
import { AudioFileService } from './services/audio-file.service';
import { UserService } from './services/user.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { PresetModal } from './preset-modal/preset-modal.component';
import { Pagination } from './pagination/pagination.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    AppComponent,
    routedComponents,
    AudioPlayer,
    PresetModal,
    Pagination
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
