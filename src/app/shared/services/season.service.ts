import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Season } from 'src/app/shared/models/season.model';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

    private static ALL_SEASONS_URL = environment.url + '/allSeasons';
    private static SEASON_URL = environment.url + '/season';

  constructor(private http: HttpClient) { }

  getAllSeasons(): Observable<any> {
    return this.http.get(SeasonService.ALL_SEASONS_URL);
  }

  getSeason(seasonId: number): Observable<any> {
    return this.http.get(`${SeasonService.SEASON_URL}/${seasonId}`);
  }

}
