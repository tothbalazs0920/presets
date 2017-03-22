import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

import { Preset } from './../preset';
import { PresetService } from './../services/preset.service';
import { AudioService } from './../services/audio.service';
import { PresetListComponent } from './preset-list.component';
import { Pagination } from '../pagination/pagination.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'preset-list',
    templateUrl: 'preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PublicPresetListComponent extends PresetListComponent implements OnInit {
    presets: Preset[];
    total: number;
    terms: string = "";
    errorMessage: string;
    queryObject: any = {
        pageNumber: 0,
        searchTerm: '',
        previouslySearchedTerm: '',
    };
    private _queryParamsSubscription;
    pages: any[] = [];

    constructor(
        private AudioService: AudioService,
        private presetService: PresetService,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        super(AudioService);
    }

    ngOnInit(): void {
        this._queryParamsSubscription = this.activatedRoute
            .queryParams
            .subscribe(
            params => {
                if (Object.keys(params).length === 0) {
                    this.queryObject.pageNumber = 1;
                } else {
                this.queryObject.pageNumber = +params['pageNumber'];
                this.queryObject.searchTerm = params['searchTerm'] || '';
                this.queryObject.previouslySearchedTerm = params['previouslySearchedTerm'] || '';
                }
                this.getSearchResult(this.queryObject.pageNumber);
            }
            );
    }

    getSearchResult(page: number) {
        this.presetService
            .getSearchResult(this.terms, page)
            .subscribe(
            presets => {
                this.total = presets.total;
                this.pages.length = Math.ceil(presets.total / 6);
                return this.presets = presets.presets;
            },
            error => this.errorMessage = <any>error);
    }

    getPageWithSearchResult(pageNumber: number): void {
        if (this.queryObject.pageNumber < 1 || this.queryObject.pageNumber > this.pages.length) {
            return;
        }

        this.queryObject.pageNumber = pageNumber;
        this.router.navigate(['/presets'], { queryParams: this.queryObject });
    }
}
