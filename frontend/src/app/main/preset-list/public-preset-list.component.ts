import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

import { Preset } from './../preset';
import { PresetService } from './../services/preset.service';
import { AudioService } from './../services/audio.service';
import { PresetListComponent } from './preset-list.component';
import { Pagination } from '../pagination/pagination.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';

@Component({
    selector: 'preset-list',
    templateUrl: 'preset-list.component.html',
    styleUrls: ['preset-list.component.css']
})
export class PublicPresetListComponent extends PresetListComponent implements OnInit {
    presets: Observable<Preset[]>;
    total: Observable<number>;

    page: number = 1;
    terms: string = "";

    private searchTermStream = new Subject<string>();
    private pageStream = new Subject<number>();

    constructor(
        private AudioService: AudioService,
        private presetService: PresetService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) {
        super(AudioService);
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.page = params['page'];
        });

        const pageSource = this.pageStream.map(pageNumber => {
            this.page = pageNumber
            return { search: this.terms, page: pageNumber }
        });

        const searchSource = this.searchTermStream
            .debounceTime(1000)
            .distinctUntilChanged()
            .map(searchTerm => {
                this.terms = searchTerm
                return { search: searchTerm, page: 1 }
            });

        const source = pageSource
            .merge(searchSource)
            .startWith({ search: this.terms, page: this.page })
            .mergeMap((params: { search: string, page: number }) => {
                return this.presetService.getSearchResult(params.search, params.page)
            })
            .share();

        this.total = source.pluck('total');
        this.presets = source.pluck('presets')
    }

    search(terms: string) {
        this.searchTermStream.next(terms);
    }

    goToPage(page: number) {
        this.pageStream.next(page);
    }

}
