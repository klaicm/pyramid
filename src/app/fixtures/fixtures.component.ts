import { Component } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { OnInit } from '@angular/core';
import { Player } from 'src/app/player/player.model';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/fixtures/match.service';
import { Match } from 'src/app/fixtures/match.model';
import { Round } from 'src/app/fixtures/round.model';

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

    constructor(private playerService: PlayerService, private matchService: MatchService, private router: Router) { }

    ngOnInit() {

        this.matchService.getAllRounds().subscribe(response => {
            this.allRounds = response;
            this.allRounds.sort((a, b) => a.round > b.round ? -1 : 1);
            this.currentRound = this.allRounds[0];

            this.getRoundMatches(this.currentRound);
        });

        // unneccessary here
        this.playerService.getAllPlayers().subscribe(response => {
            this.players = response;
        });

        this.matchService.getAllMatches().subscribe(response => {
            this.matches = response;
            this.matches.sort((a, b) => (a.playerRowChallengerId > b.playerRowChallengerId) ? 1 : -1);
        });

    }

    getRoundMatches(round: Round) {
        this.matchService.getRoundMatches(round.id).subscribe(response => {
            this.roundMatches = response;
            this.roundMatches.sort((a: Match, b: Match) => a.challengerRow > b.challengerRow ? 1 : -1);
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

    compareObjects(o1: any, o2: any): boolean {
        return o1.id === o2.id;
    }

    navigateToMatchInput(match: Match) {
        this.matchService.setCurrentMatch(match);
        this.router.navigate(['/match-input']);
    }

    addNewPlayer() {
        this.router.navigate(['/add-player']);
    }

    navigateToScheduleMatch() {
        this.router.navigate(['/schedule-match']);
    }
}
