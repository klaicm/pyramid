import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { Player } from 'src/app/player/player.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-search-player',
    templateUrl: './search-player.component.html',
    styleUrls: ['./search-player.component.css', '../../app.component.css']
})
export class SearchPlayerComponent implements OnInit {

    allPlayers: Array<Player>;
    playerFormControl = new FormControl();
    filteredOptions: Observable<string[]>;

    constructor(private playerService: PlayerService, private router: Router) {

    }

    ngOnInit() {
        this.playerService.getAllPlayers().subscribe(response => {
            this.allPlayers = response;
        });

        this.filteredOptions = this.playerFormControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value)));
    }

    private _filter(value: any): any[] {
        const filterValue = value;
        return this.allPlayers.filter(option =>
            (option.firstName.includes(filterValue) || option.lastName.includes(filterValue))
        );
    }

    displayFn(val: Player) {
        return val ? val.firstName + ' ' + val.lastName : val;
    }


    navigateToPlayer(player: Player) {
        this.router.navigate(['/player', player.id]).then(() => {
            window.location.reload();
        });
        this.playerFormControl.reset();
    }
}
