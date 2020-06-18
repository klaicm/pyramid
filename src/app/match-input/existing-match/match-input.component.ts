import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchService } from 'src/app/fixtures/match.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Match } from 'src/app/fixtures/match.model';
import { PlayerService } from 'src/app/player/player.service';
import { Player } from 'src/app/player/player.model';
import { Round } from 'src/app/fixtures/round.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';
import { AuthService } from 'src/app/shared/auth/auth.service';


@Component({
    selector: 'app-match-input',
    templateUrl: './match-input.component.html',
    styleUrls: ['./match-input.component.css', '../../app.component.css']
})
export class MatchInputComponent implements OnInit, OnDestroy {

    allResults: Array<string> = ['6:0', '6:1', '6:2', '6:3', '6:4', '7:5', '7:6', '6:7', '5:7', '4:6', '3:6', '2:6', '1:6', '0:6'];

    matchFormGroup: FormGroup;
    currentMatch: Match;
    private currentMatchSub: Subscription;
    responseListener = false;
    isNewMatch = true;
    allPlayers: Array<Player>;
    spinnerOn = true;

    constructor(private matchService: MatchService, private playerService: PlayerService, private location: Location,
        private router: Router, private snackMessageService: SnackMessageService, private activatedRoute: ActivatedRoute,
        private authService: AuthService) {
        this.matchFormGroup = new FormGroup({
            playerWinnerFormControl: new FormControl('', Validators.required),
            firstSetFormControl: new FormControl('', Validators.required),
            secondSetFormControl: new FormControl('', Validators.required),
            thirdSet1FormControl: new FormControl('', [
                Validators.pattern('^[0-9]*$'), Validators.maxLength(2)
            ]),
            thirdSet2FormControl: new FormControl('', [
                Validators.pattern('^[0-9]*$'), Validators.maxLength(2)
            ]),
            matchDateFormControl: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.currentMatchSub = this.activatedRoute.params.subscribe(params => {
            this.getMatch(+params['id']);
        });
    }

    getMatch(id: number) {
        this.matchService.getMatch(id).subscribe(response => {
            this.spinnerOn = false;
            this.currentMatch = response;
        });
    }

    saveSeasonMatch() {
        this.spinnerOn = true;
        this.currentMatch.playerWinner = this.matchFormGroup.get('playerWinnerFormControl').value;
        if (this.currentMatch.playerWinner === this.currentMatch.playerRowAttacker) {
            this.currentMatch.playerDefeated = this.currentMatch.playerRowDefender;
        } else {
            this.currentMatch.playerDefeated = this.currentMatch.playerRowAttacker;
        }

        this.currentMatch.setFirst = this.matchFormGroup.get('firstSetFormControl').value;
        this.currentMatch.setSecond = this.matchFormGroup.get('secondSetFormControl').value;

        if (this.matchFormGroup.get('thirdSet1FormControl').value && this.matchFormGroup.get('thirdSet1FormControl').value) {
            this.currentMatch.setThird =
                this.matchFormGroup.get('thirdSet1FormControl').value + ':' + this.matchFormGroup.get('thirdSet2FormControl').value;
        }

        this.currentMatch.matchPlayed = true;

        this.currentMatch.matchDate = this.matchFormGroup.get('matchDateFormControl').value;

        setTimeout(() => {
            this.matchService.saveMatch(this.currentMatch).subscribe(() => {
                this.spinnerOn = false;
                this.snackMessageService.showSuccess('Spremljeno!');
                this.backToHome();
            }, err => {
                this.snackMessageService.showError('Greška prilikom spremanja!');
            }
            );
        }, 2000);

    }

    deleteMatch() {
        this.spinnerOn = true;
        this.matchService.deleteMatch(this.currentMatch).subscribe(() => {
            this.spinnerOn = false;
            this.snackMessageService.showError('Meč obrisan');
            this.backToHome();
        }, err => {
            this.snackMessageService.showError('Greška prilikom spremanja!');
        }
        );
    }

    backToHome() {
        this.router.navigate(['/']);
    }

    ngOnDestroy() {
        this.currentMatchSub.unsubscribe();
    }

}
