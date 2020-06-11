import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/player/player.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Match } from 'src/app/fixtures/match.model';
import { Season } from 'src/app/shared/models/season.model';
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
export class FriendlyMatchComponent implements OnInit, OnDestroy {

    allResults: Array<string> = ['6:0', '6:1', '6:2', '6:3', '6:4', '7:5', '7:6', '6:7', '5:7', '4:6', '3:6', '2:6', '1:6', '0:6'];
    sub: Subscription;
    currentPlayer: Player;
    matchFormGroup: FormGroup;
    friendlyRound: Round;
    allPlayers: Array<Player>;

    constructor(private playerService: PlayerService, private matchService: MatchService, private location: Location,
        private snackMessageService: SnackMessageService, private router: Router) {

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
        this.sub = this.playerService.currentPlayer.subscribe(response => {
            this.currentPlayer = response;
        });

        this.matchService.getAllRounds().subscribe((response: Array<Round>) => {
            this.friendlyRound = response.find(a => a.roundNumber === 0);
        });

        this.playerService.getAllPlayers().subscribe(response => {
            this.allPlayers = response;
        });
    }

    saveFriendlyMatch() {
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

        this.matchService.saveMatch(newFriendlyMatch).subscribe(response => {
            setTimeout(() => {
                const listen = response;
                if (response) {
                } else {
                    console.error('Nije uspješno spremljeno.');
                }

            }, 1000);

            this.snackMessageService.showSuccess('Spremljeno!');
            this.location.back();
        });

    }

    backToHome() {
        this.router.navigate(['/']);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
