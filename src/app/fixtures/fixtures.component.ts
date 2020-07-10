import { Component } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { OnInit } from '@angular/core';
import { Player } from 'src/app/player/player.model';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/fixtures/match.service';
import { Match } from 'src/app/fixtures/match.model';
import { Round } from 'src/app/fixtures/round.model';
import { SnackMessageService } from '../shared/services/snackbar-message.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'app-fixtures',
    templateUrl: './fixtures.component.html',
    styleUrls: ['./fixtures.component.css', '../app.component.css']
})
export class FixturesComponent implements OnInit {

    players: Array<any>;
    matches: Array<any>;
    roundMatches: Array<any>;
    allRounds: Array<Round>;
    currentRound: Round;
    spinnerOn = false;

    constructor(private matchService: MatchService, private router: Router, private snackbarMessageService: SnackMessageService,
        private authService: AuthService) { }

    ngOnInit() {

        this.matchService.getAllRounds().subscribe(response => {
            this.allRounds = response;
            this.allRounds.splice(this.allRounds.findIndex(a => a.roundNumber === 0), 1);
            this.allRounds.sort((a, b) => a.roundNumber > b.roundNumber ? -1 : 1);
            this.currentRound = this.allRounds[0];

            this.getRoundMatches(this.currentRound);
        });

        this.matchService.getAllMatches().subscribe(response => {
            this.matches = response;
            this.matches.sort((a, b) => (a.playerRowChallengerId > b.playerRowChallengerId) ? 1 : -1);
        });

    }

    getRoundMatches(round: Round) {
        this.spinnerOn = true;
        this.matchService.getRoundMatches(round.id).subscribe(response => {
            if (response) {
                this.spinnerOn = false;
                this.roundMatches = response;
                this.roundMatches.sort((a: Match, b: Match) => a.challengerRow > b.challengerRow ? 1 : -1);
            } else {
                this.snackbarMessageService.showError('Neuspješan dohvat podataka');
            }
        });
    }

    navigateToPlayer(playerId: number) {
        this.router.navigate(['/player', playerId]);
    }

    stylePlayerWinner(playerId: number, match: Match): Object {
        if (match.playerWinner !== null) {
            if ((playerId === match.playerWinner.id) && match.matchPlayed) {
                return { 'font-weight': '600' };
            }
            return { 'font-weight': '400' };
        }
    }

    matchEditButton(matchPlayed: boolean) {
        if (!matchPlayed) {
            return {
                'background': '#3f51b5',
                'color': 'white'
            };
        }
        return {
            'background': 'white',
            'color': 'black'
        };
    }

    get isUserLoggedIn() {
        return this.authService.isUserLoggedIn();
    }

    compareObjects(o1: any, o2: any): boolean {
        return o1.id === o2.id;
    }

    navigateToMatchInput(match: Match) {
        this.router.navigate(['/match-input', match.id]);
    }

}
