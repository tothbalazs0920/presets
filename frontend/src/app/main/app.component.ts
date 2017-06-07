import { Component, ViewChild } from '@angular/core';
import { AuthService } from './user/auth.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'presets',
  templateUrl: 'app.html',
  styles: ['.navbar-right { margin-right: 0px !important}']
})
export class AppComponent {

  @ViewChild('loginModal')
  modal: ModalComponent;

  title = 'Presets';

  constructor(private authService: AuthService) { }
}
