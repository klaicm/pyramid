import { Component } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/player/player.model';
import { OnDestroy } from '@angular/core';
import { MatchService } from 'src/app/fixtures/match.service';
import { Match } from 'src/app/fixtures/match.model';
import { SeasonService } from 'src/app/shared/services/season.service';
import { Season } from 'src/app/shared/models/season.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css', '../app.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  player: Player;
  showPlayerDetails = false;
  showPlayerStats = true;
  showAchievements = false;
  showContact = false;
  private sub: Subscription;
  playerLoaded = false;
  playerMatches: Array<Match>;
  allSeasons: Array<Season>;

  constructor(private playerService: PlayerService, private matchService: MatchService, private activatedRoute: ActivatedRoute,
    private seasonService: SeasonService, private router: Router) { }

  ngOnInit(): void {
    this.getPlayerId();

    this.seasonService.getAllSeasons().subscribe(seasons => {
      this.allSeasons = seasons;
    });
  }

  getPlayerId(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getPlayer(+params['id']);
    });
  }

  getPlayer(playerId: number): void {
    this.playerService.getPlayer(playerId).subscribe((response: Player) => {
      if (response) {
        this.player = response;
        this.playerService.setCurrentPlayer(this.player);
        this.getPlayerMatches(playerId);
        this.playerLoaded = true;
      } else {
        console.error('Greška kod poziva servisa za dohvat igrača. Player Component');
      }
    });
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  getPlayerMatches(playerId: number) {
    this.matchService.getPlayerMatches(playerId).subscribe(response => {
      this.playerMatches = response;
      // this.playerMatches.sort((a, b) => a.matchDate > b.matchDate ? -1 : 1);
    });
  }

  showComponent(componentName: string) {
    if (componentName === 'info') {
      this.showPlayerDetails = true;
      this.showPlayerStats = false;
      this.showAchievements = false;
      this.showContact = false;
    } else if (componentName === 'stats') {
      this.showPlayerDetails = false;
      this.showPlayerStats = true;
      this.showAchievements = false;
      this.showContact = false;
    } else if (componentName === 'achievements') {
      this.showPlayerDetails = false;
      this.showPlayerStats = false;
      this.showAchievements = true;
      this.showContact = false;
    } else if (componentName === 'contact') {
      this.showPlayerDetails = false;
      this.showPlayerStats = false;
      this.showAchievements = false;
      this.showContact = true;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
