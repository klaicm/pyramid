import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/player/player.model';
import { Season } from 'src/app/shared/models/season.model';
import { Match } from 'src/app/fixtures/match.model';
import { Round } from 'src/app/fixtures/round.model';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  @Input() player: Player;
  @Input() allSeasons: Array<Season>;
  @Input() playerMatches: Array<Match>;
  playerWins: number;
  playerLoses: number;
  percentage: number;
  winPercentage: Object;
  rowsColumn: Object;
  currentSeason: Season;

  constructor() { }

  ngOnInit() {

    this.currentSeason = this.allSeasons.find((a: Season) => a.currentSeason === true);

    this.calculateStatsForSeason(this.currentSeason);

  }

  calculateStatsForSeason(season: Season) {

    const playerAllPlayedMatches = this.playerMatches.filter((match: Match) => match.matchPlayed);
    const seasonRounds = season.rounds;

    const playerSeasonMatches = [];

    for (let i = 0; i < playerAllPlayedMatches.length; i++) {
      const roundMatch = playerAllPlayedMatches[i].round;

      for (let j = 0; j < seasonRounds.length; j++) {
        const currSeasonRound = seasonRounds[j];

        if (currSeasonRound.id === roundMatch.id) {
          playerSeasonMatches.push(playerAllPlayedMatches[i]);
        }
      }
    }

    this.playerWins = playerSeasonMatches.filter((match: Match) => match.playerWinner.id === this.player.id).length;
    this.playerLoses = playerSeasonMatches.filter((match: Match) => match.playerDefeated.id === this.player.id).length;

    const playerRowsThroughSeason = [];
    if (this.currentSeason.seasonTier === 'pyramid') {
      playerSeasonMatches.sort((a: Match, b: Match) => a.round.roundNumber > b.round.roundNumber ? 1 : -1);
      seasonRounds.sort((a: Round, b: Round) => a.roundNumber > b.roundNumber ? 1 : -1);
      for (let k = 0; k < seasonRounds.length; k++) {
        if (playerSeasonMatches.findIndex((a: Match) => a.round.id === seasonRounds[k].id) !== -1) {
          for (let z = 0; z < playerSeasonMatches.length; z++) {
            if (seasonRounds[k].roundNumber === playerSeasonMatches[z].round.roundNumber) {
              if (playerSeasonMatches[z].playerRowAttacker.id === this.player.id) {
                playerRowsThroughSeason.push(playerSeasonMatches[z].challengerRow);
              } else {
                playerRowsThroughSeason.push(playerSeasonMatches[z].defenderRow);
              }
            }
          }
        } else {
          playerRowsThroughSeason.push(0);
        }
      }
    }

    this.percentage = (this.playerWins / (this.playerWins + this.playerLoses)) * 100;
    this.winPercentagePieChart(playerRowsThroughSeason);
  }

  winPercentagePieChart(playerRoundsThroughSeason: number[]): void {
    this.winPercentage = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 200
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<br>{point.percentage:.1f} %',
            distance: -50,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 4
            }
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%'
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      reflow: true,
      series: [{
        name: 'Ishod',
        colorByPoint: true,
        innerSize: '50%',
        data: [{
          name: 'Pobjede',
          y: this.percentage,
          color: '#00FF7F'
        }, {
          name: 'Porazi',
          y: 100 - this.percentage,
          color: '#483D8B'
        }]
      }]
    };

    this.rowsColumn = {
      chart: {
        height: 200
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      reflow: true,
      yAxis: {
        title: false,
        allowDecimals: false,
        labels: {
          enabled: false,
        }
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true
          }
        }
      },
      xAxis: {
        allowDecimals: false,
        min: 1,
        title: {
          text: 'Kolo'
        }
      },
      series: [{
        name: 'Red',
        type: 'column',
        color: '#483D8B',
        data: playerRoundsThroughSeason,
        pointStart: 1
      }]
    };
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

}
