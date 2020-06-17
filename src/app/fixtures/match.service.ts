import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Match } from 'src/app/fixtures/match.model';
import { Round } from 'src/app/fixtures/round.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

    // private static ROUND_MATCHES_URL = environment.url + '/roundMatches';
    private static ALL_MATCHES_URL = environment.url + '/allMatches';
    private static SAVE_MATCH_URL = environment.url + '/saveMatch';
    private static SCHEDULE_MATCH_URL = environment.url + '/scheduleMatch';
    private static PLAYER_MATCHES_URL = environment.url + '/playerMatches';
    private static ALL_ROUNDS_URL = environment.url + '/allRounds';
    private static ROUND_MATCHES_URL = environment.url + '/roundMatches';
    private static ADD_ROUND_URL = environment.url + '/addRound';
    private static DELETE_MATCH_URL = environment.url + '/deleteMatch';
    private static MATCH_URL = environment.url + '/match';

    private match = new BehaviorSubject<Match>(new Match());

    currentMatch = this.match.asObservable();

    constructor(private http: HttpClient) { }

  getAllMatches(): Observable<any> {
    return this.http.get(MatchService.ALL_MATCHES_URL);
  }

  getMatch(matchId: number): Observable<any> {
    return this.http.get(`${MatchService.MATCH_URL}/${matchId}`);
  }

  getPlayerMatches(playerId: number): Observable<any> {
    return this.http.get(`${MatchService.PLAYER_MATCHES_URL}/${playerId}`);
  }

  getAllRounds(): Observable<any> {
    return this.http.get(`${MatchService.ALL_ROUNDS_URL}`);
  }

  getRoundMatches(roundId: number): Observable<any> {
    return this.http.get(`${MatchService.ROUND_MATCHES_URL}/${roundId}`);
  }

  saveMatch(match: Match): Observable<any> {
    return this.http.post(MatchService.SAVE_MATCH_URL, match);
  }

  scheduleMatch(match: Match): Observable<any> {
    return this.http.post(MatchService.SCHEDULE_MATCH_URL, match);
  }

  deleteMatch(match: Match): Observable<any> {
    return this.http.post(MatchService.DELETE_MATCH_URL, match);
  }

  setCurrentMatch(match: Match) {
    this.match.next(match);
  }

  addNewRound(round: Round): Observable<any> {
    return this.http.post(MatchService.ADD_ROUND_URL, round);
  }

}
