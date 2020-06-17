import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { Player } from 'src/app/player/player.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Match } from 'src/app/fixtures/match.model';
import { MatchService } from 'src/app/fixtures/match.service';
import { Round } from 'src/app/fixtures/round.model';
import { Location } from '@angular/common';
import { SnackMessageService } from 'src/app/shared/services/snackbar-message.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-friendly-match',
    templateUrl: './friendly-match.component.html',
    styleUrls: ['./friendly-match.component.css', '../../app.component.css']
})
export class FriendlyMatchComponent implements OnInit {

    allResults: Array<string> = ['6:0', '6:1', '6:2', '6:3', '6:4', '7:5', '7:6', '6:7', '5:7', '4:6', '3:6', '2:6', '1:6', '0:6'];
    matchFormGroup: FormGroup;
    friendlyRound: Round;
    allPlayers: Array<Player>;
    spinnerOn = false;

    constructor(private playerService: PlayerService, private matchService: MatchService, private location: Location,
        private snackMessageService: SnackMessageService, private router: Router) {

        this.matchFormGroup = new FormGroup({
            playerWinnerFormControl: new FormControl('', Validators.required),
            playerDefeatedFormControl: new FormControl('', Validators.required),
            firstSetFormControl: new FormControl('', Validators.required),
            secondSetFormControl: new FormControl('', Validators.required),
            thirdSet1FormControl: new FormControl(''),
            thirdSet2FormControl: new FormControl(''),
            matchDateFormControl: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {

        this.matchService.getAllRounds().subscribe((response: Array<Round>) => {
            this.friendlyRound = response.find(a => a.roundNumber === 0);
        });

        this.playerService.getAllPlayers().subscribe(response => {
            this.allPlayers = response;
        });
    }

    saveFriendlyMatch() {
        this.spinnerOn = true;
        const newFriendlyMatch = new Match;

        newFriendlyMatch.playerWinner = this.matchFormGroup.get('playerWinnerFormControl').value;
        newFriendlyMatch.playerDefeated = this.matchFormGroup.get('playerDefeatedFormControl').value;
        newFriendlyMatch.matchDate = this.matchFormGroup.get('matchDateFormControl').value;
        newFriendlyMatch.setFirst = this.matchFormGroup.get('firstSetFormControl').value;
        newFriendlyMatch.setSecond = this.matchFormGroup.get('secondSetFormControl').value;

        if (this.matchFormGroup.get('thirdSet1FormControl').value && this.matchFormGroup.get('thirdSet1FormControl').value) {
            newFriendlyMatch.setThird =
                this.matchFormGroup.get('thirdSet1FormControl').value + ':' + this.matchFormGroup.get('thirdSet2FormControl').value;
        }

        newFriendlyMatch.matchPlayed = true;

        newFriendlyMatch.matchDate = this.matchFormGroup.get('matchDateFormControl').value;

        newFriendlyMatch.round = this.friendlyRound;

        this.matchService.saveMatch(newFriendlyMatch).subscribe(() => {
            this.spinnerOn = false;
            this.snackMessageService.showSuccess('Spremljeno!');
            this.matchFormGroup.reset();
            this.backToHome();
        }, err => {
            this.spinnerOn = false;
            console.error('Nije uspješno spremljeno.');
        }
        );

    }

    backToHome() {
        this.router.navigate(['/']);
    }

}
