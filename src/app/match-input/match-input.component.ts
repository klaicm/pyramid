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
import { SnackMessageService } from '../shared/services/snackbar-message.service';


@Component({
    selector: 'app-match-input',
    templateUrl: './match-input.component.html',
    styleUrls: ['./match-input.component.css', '../app.component.css']
})
export class MatchInputComponent implements OnInit, OnDestroy {

    allResults: Array<string> = [
        '6:0',
        '6:1',
        '6:2',
        '6:3',
        '6:4',
        '7:5',
        '7:6',
        '6:7',
        '5:7',
        '4:6',
        '3:6',
        '2:6',
        '1:6',
        '0:6'
    ];

    matchFormGroup: FormGroup;
    currentMatch: Match;
    currentMatchSub: Subscription;
    responseListener = false;
    isNewMatch = true;
    allPlayers: Array<Player>;

    constructor(private matchService: MatchService, private playerService: PlayerService, private location: Location,
        private router: Router, private snackMessageService: SnackMessageService) {
        this.matchFormGroup = new FormGroup({
            playerWinnerFormControl: new FormControl('', Validators.required),
            playerDefeatedFormControl: new FormControl('', Validators.required),
            firstSetFormControl: new FormControl('', Validators.required),
            secondSetFormControl: new FormControl('', Validators.required),
            thirdSet1FormControl: new FormControl('', Validators.required),
            thirdSet2FormControl: new FormControl('', Validators.required),
            matchDateFormControl: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.currentMatchSub = this.matchService.currentMatch.subscribe(response => {
            this.currentMatch = response;

            if (this.currentMatch.id) {
                this.isNewMatch = false;
            } else {
                this.currentMatch = new Match;
                this.playerService.getAllPlayers().subscribe(players => {
                    this.allPlayers = players;
                });

                this.isNewMatch = true;
            }
        });
    }

    // zasada samo piramida
    saveSeasonMatch() {
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

        this.matchService.saveMatch(this.currentMatch).subscribe(response => {
            this.responseListener = true;
            setTimeout(() => {
                const listen = response;
                if (response) {
                    this.responseListener = false;
                } else {
                    console.error('Nije uspješno spremljeno.');
                    console.log(this.currentMatch);
                }

                this.snackMessageService.showSuccess('Spremljeno!');
                this.location.back();
            }, 1000);
        });
    }

    saveFriendlyMatch() {
        this.currentMatch.playerWinner = this.matchFormGroup.get('playerWinnerFormControl').value;
        this.currentMatch.playerDefeated = this.matchFormGroup.get('playerDefeatedFormControl').value;
        this.currentMatch.matchDate = this.matchFormGroup.get('matchDateFormControl').value;
        this.currentMatch.setFirst = this.matchFormGroup.get('firstSetFormControl').value;
        this.currentMatch.setSecond = this.matchFormGroup.get('secondSetFormControl').value;

        if (this.matchFormGroup.get('thirdSet1FormControl').value && this.matchFormGroup.get('thirdSet1FormControl').value) {
            this.currentMatch.setThird =
                this.matchFormGroup.get('thirdSet1FormControl').value + ':' + this.matchFormGroup.get('thirdSet2FormControl').value;
        }

        this.currentMatch.matchPlayed = true;

        this.currentMatch.matchDate = this.matchFormGroup.get('matchDateFormControl').value;

        const round: Round = {
            id: 1,
            dateFrom: null,
            dateTo: null,
            round: 0,
            roundDescription: 'Prijateljska',
            season: {
                id: 1,
                seasonName: 'Prijateljska',
                seasonTier: 'friendly'
            }
        };

        this.currentMatch.round = round;

        this.matchService.saveMatch(this.currentMatch).subscribe(response => {
            this.responseListener = true;
            setTimeout(() => {
                const listen = response;
                if (response) {
                    this.responseListener = false;
                } else {
                    console.error('Nije uspješno spremljeno.');
                    console.log(this.currentMatch);
                }
                this.location.back();
            }, 3000);
        });

    }

    backToHome() {
        this.router.navigate(['/']);
      }

    ngOnDestroy() {
        this.currentMatchSub.unsubscribe();
    }

}
