import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { PlayerComponent } from 'src/app/player/player.component';
import { Player } from 'src/app/player/player.model';
import { Match } from 'src/app/fixtures/match.model';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/fixtures/match.service';
import { SeasonService } from 'src/app/shared/services/season.service';
import { Season } from 'src/app/shared/models/season.model';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  @Input() player: Player;
  @Input() playerMatches: Array<Match>;
  @Input() allSeasons: Array<Season>;
  currentMatch: Match;
  status: string;
  opponent: Player;
  currentRow: number;
  currentSeason: Season;
  playerSeasonMatches: Array<Match> = [];

  constructor(private router: Router, private matchService: MatchService, private playerService: PlayerService,
    private seasonService: SeasonService) {

  }

  ngOnInit() {

    this.currentSeason = this.allSeasons.find((a: Season) => a.currentSeason === true);
    this.showMatchesForSeason(this.currentSeason);
    this.currentMatch = this.playerMatches.find((match: Match) => match.matchPlayed === false);
    if (this.currentMatch) {
      if (this.currentMatch.playerRowAttacker.id === this.player.id) {
        this.status = 'Izazivač';
        this.opponent = this.currentMatch.playerRowDefender;
        this.currentRow = this.currentMatch.playerRowAttacker.playerStats.currentRow;
      } else {
        this.status = 'Izazvani';
        this.opponent = this.currentMatch.playerRowAttacker;
        this.currentRow = this.currentMatch.playerRowDefender.playerStats.currentRow;
      }
    } else {
      this.currentRow = this.player.playerStats.currentRow;
      this.status = 'Odigrano';
    }

  }

  showMatchesForSeason(season: Season) {
    const seasonRounds = season.rounds;

    this.playerSeasonMatches = [];
    for (let i = 0; i < this.playerMatches.length; i++) {
      const roundMatch = this.playerMatches[i].round;

      for (let j = 0; j < seasonRounds.length; j++) {
        const currSeasonRound = seasonRounds[j];

        if (currSeasonRound.id === roundMatch.id) {
          this.playerSeasonMatches.push(this.playerMatches[i]);
          this.playerSeasonMatches.sort((a, b) => a.round.roundNumber > b.round.roundNumber ? -1 : 1);
          if (season.seasonTier === 'friendly') {
            this.playerSeasonMatches.sort((a, b) => a.matchDate > b.matchDate ? -1 : 1);
          }
        }
      }
    }
  }

  friendlyMatchInput() {
    this.playerService.setCurrentPlayer(this.player);
    this.router.navigate(['/friendly-match']);
  }

  navigateToPlayer(playerId: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/player', playerId]);
    });
  }

  styleMatch(playerId: number, match: Match): Object {
    if (match.matchPlayed) {
      if (playerId === match.playerWinner.id) {
        return { 'background-color': 'rgb(10, 236, 10, 0.1)', 'border-radius': '4px', 'margin-bottom': '8px' };
      }
      return { 'background-color': 'rgb(231, 12, 12, 0.1)', 'border-radius': '4px', 'margin-bottom': '8px' };
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

}
