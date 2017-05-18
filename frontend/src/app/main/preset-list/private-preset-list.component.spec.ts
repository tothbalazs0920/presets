/*
import { PrivatePresetListComponent } from "./private-preset-list.component";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { PresetService } from "../preset/preset.service";
import { AudioService } from "../audio-player/audio.service";
import { AuthService } from "../user/auth.service";
import { PresetList } from './preset-list.interface';
import { Preset } from './../preset/preset';
import { AudioPlayer } from './../audio-player/audio-player.component';

describe('PrivatePresetListComponent', () => {

    let comp: PrivatePresetListComponent;
    let fixture: ComponentFixture<PrivatePresetListComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let spy;

    beforeEach(async(() => {
        debugger;
        TestBed.configureTestingModule({
            declarations: [
                AudioPlayer, 
                PrivatePresetListComponent
                ], // declare the test component
            providers: [
                PresetService,
                AuthService,
                AudioService
            ]
        });
        try {
        fixture = TestBed.createComponent(PrivatePresetListComponent);
        comp = fixture.componentInstance;

        let presetService = fixture.debugElement.injector.get(PresetService);

        let presetList: PresetList<Preset>;
        let preset1 = new Preset();
        preset1.name = "Preset 1";
        presetList.presets.push(preset1);

        spy = spyOn(presetService, 'getPresonalPresets')
            .and.returnValue(Promise.resolve(presetList));
        } catch(e) {
            console.log(e);
        }

        // query for the title <h1> by CSS element selector
       // de = fixture.debugElement.query(By.css('h1'));
      //  el = de.nativeElement;
    }));

    it('should not show quote before OnInit', () => {
        debugger;
        expect(el.textContent).toBe('', 'nothing displayed');
        expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
    });
});
*/
