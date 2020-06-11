import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/player/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private static PLAYER_URL = environment.url + '/player';
    private static ALL_PLAYERS_URL = environment.url + '/allPlayers';
    private static SAVE_MATCH_URL = environment.url + '/saveMatch';
    private static ADD_NEW_PLAYER_URL = environment.url + '/addNewPlayer';
    private static SAVE_PLAYER_URL = environment.url + '/savePlayer';

  private player = new BehaviorSubject<Player>(new Player());

  currentPlayer = this.player.asObservable();

  constructor(private http: HttpClient) { }

  setCurrentPlayer(player: Player) {
    this.player.next(player);
  }

  addNewPlayer(player: Player): Observable<any> {
    return this.http.post(PlayerService.ADD_NEW_PLAYER_URL, player);
  }

  savePlayer(player: Player): Observable<any> {
    return this.http.post(PlayerService.SAVE_PLAYER_URL, player);
  }

  getAllPlayers(): Observable<any> {
    return this.http.get(PlayerService.ALL_PLAYERS_URL);
  }

  getPlayer(playerId: number): Observable<any> {
    return this.http.get(`${PlayerService.PLAYER_URL}/${playerId}`);
  }

}
