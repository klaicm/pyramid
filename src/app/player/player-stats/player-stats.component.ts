import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Player } from 'src/app/player/player.model';
import { Season } from 'src/app/shared/models/season.model';
import { Match } from 'src/app/fixtures/match.model';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit, AfterViewInit {

  @Input() player: Player;
  @Input() allSeasons: Array<Season>;
  @Input() playerMatches: Array<Match>;
  playerWins: number;
  playerLoses: number;
  percentage: number;
  winPercentage: Object;
  rowsColumn: Object;

  constructor() { }

  ngOnInit() {

    const playedMatches = this.playerMatches.filter((match: Match) => match.matchPlayed);
    this.playerWins = playedMatches.filter((match: Match) => match.playerWinner.id === this.player.id).length;
    this.playerLoses = playedMatches.filter((match: Match) => match.playerDefeated.id === this.player.id).length;

    this.percentage = (this.playerWins / (this.playerWins + this.playerLoses)) * 100;
  }

  ngAfterViewInit() {
    this.winPercentagePieChart(this.player);
  }

  winPercentagePieChart(player: Player): void {
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
          showInLegend: true
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
        min: 1
      },
      series: [{
        name: 'Red',
        type: 'column',
        color: '#483D8B',
        data: [2, 1, 2, 3, 4, 3],
      }]
    };
  }

}
