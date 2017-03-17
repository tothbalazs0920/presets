import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'presets',
  templateUrl:'app.html',
  styles : ['.navbar-right { margin-right: 0px !important}']
})
export class AppComponent {

  title = 'Presets';

  constructor(private authService: AuthService) {}
}
