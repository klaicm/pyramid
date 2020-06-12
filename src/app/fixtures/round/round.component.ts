import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Season } from 'src/app/shared/models/season.model';
import { SeasonService } from 'src/app/shared/services/season.service';
import { Router } from '@angular/router';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';
import { OnInit } from '@angular/core';
import { Round } from 'src/app/fixtures/round.model';
import { MatchService } from 'src/app/fixtures/match.service';



@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.css', '../../app.component.css']
})
export class RoundComponent implements OnInit {

    allSeasons: Array<Season>;
    roundFormGroup: FormGroup;
    spinnerOn = false;

    constructor(private seasonService: SeasonService, private router: Router, private snackMessageService: SnackMessageService,
        private matchService: MatchService) {

        this.roundFormGroup = new FormGroup({
            seasonFormControl: new FormControl('', Validators.required),
            roundNumberFormControl: new FormControl('', Validators.required),
            matchDateFromFormControl: new FormControl('', Validators.required),
            matchDateToFormControl: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.seasonService.getAllSeasons().subscribe(seasons => {
            this.allSeasons = seasons;
        });
    }

    addNewRound() {

        this.spinnerOn = true;

        const round = new Round();

        round.roundNumber = this.roundFormGroup.get('roundNumberFormControl').value;
        round.dateFrom = this.roundFormGroup.get('matchDateFromFormControl').value;
        round.dateTo = this.roundFormGroup.get('matchDateToFormControl').value;
        round.season = this.roundFormGroup.get('seasonFormControl').value;
        round.roundDescription =
            round.roundNumber + '. kolo (' + round.dateFrom.toLocaleDateString().substring(0, 5).replace('/', '.') + '. - '
            + round.dateTo.toLocaleDateString().substring(0, 5).replace('/', '.') + '.) - ' + round.season.seasonName;

        this.matchService.addNewRound(round).subscribe(() => {
            this.spinnerOn = false;
            this.snackMessageService.showSuccess('Dodano novo kolo: ' +
                round.roundNumber + '. kolo (' + round.dateFrom.toLocaleDateString().substring(0, 5).replace('/', '.') + '. - '
                + round.dateTo.toLocaleDateString().substring(0, 5).replace('/', '.') + '.) - ' + round.season.seasonName);

            this.roundFormGroup.get('roundNumberFormControl').reset();
            this.roundFormGroup.get('matchDateFromFormControl').reset();
            this.roundFormGroup.get('matchDateToFormControl').reset();
            this.backToHome();
        }, err => {
            this.snackMessageService.showError('Neuspješno dodavanje!');
        });
    }

    backToHome() {
        this.router.navigate(['/']);
    }

}
