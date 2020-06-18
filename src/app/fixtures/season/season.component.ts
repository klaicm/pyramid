import { Component } from '@angular/core';
import { Season } from 'src/app/shared/models/season.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SeasonService } from 'src/app/shared/services/season.service';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-season',
    templateUrl: './season.component.html',
    styleUrls: ['./season.component.css', '../../app.component.css']
})

export class SeasonComponent {

    tiers: Array<{tierName: string, tierType: string}> = [
        {tierName: 'Piramida', tierType: 'pyramid'},
        {tierName: 'Masters', tierType: 'masters'}
    ];

    periods: Array<string> = ['Ljeto', 'Zima'];

    season: Season;
    seasonFormGroup: FormGroup;
    spinnerOn = false;

    constructor(private seasonService: SeasonService, private snackMessageService: SnackMessageService, private router: Router) {
        this.seasonFormGroup = new FormGroup({
            periodFormControl: new FormControl('', Validators.required),
            seasonTierFormControl: new FormControl('', Validators.required),
            yearFormControl: new FormControl('', [Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(4), Validators.maxLength(4)]),
            isCurrentSeasonFormControl: new FormControl('', Validators.required)
        });
    }

    addNewSeason() {
        this.spinnerOn = true;

        const season = new Season();

        season.seasonTier = this.seasonFormGroup.get('seasonTierFormControl').value.tierType;
        season.seasonName =
            this.seasonFormGroup.get('seasonTierFormControl').value.tierName + ' ' +
            this.seasonFormGroup.get('periodFormControl').value + ' ' +
            this.seasonFormGroup.get('yearFormControl').value + '.';
        season.currentSeason = this.seasonFormGroup.get('isCurrentSeasonFormControl').value;

        this.seasonService.saveSeason(season).subscribe(() => {
            this.spinnerOn = false;
            this.snackMessageService.showSuccess('Dodana nova sezona: ' +
                season.seasonName);

            this.seasonFormGroup.reset();
            this.backToHome();
        }, err => {
            this.snackMessageService.showError('Neuspješno dodavanje!');
        });
    }

    backToHome() {
        this.router.navigate(['/']);
    }
}
