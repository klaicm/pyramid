import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { PlayerComponent } from './player/player.component';
import { PlayerStatsComponent } from './player/player-stats/player-stats.component';
import { AchievementsComponent } from './player/achievements/achievements.component';
import { routing } from 'src/app/app.router';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetailsComponent } from './player/player-details/player-details.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatchInputComponent } from 'src/app/match-input/match-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ScheduleMatchComponent } from 'src/app/match-input/schedule-match/schedule-match.component';
import { MatDividerModule } from '@angular/material/divider';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartModule } from 'angular2-highcharts';
import 'hammerjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddPlayerComponent } from './player/add-player/add-player.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

export function highchartsFactory() {
  const hc = require('highcharts');
  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    FixturesComponent,
    PlayerComponent,
    PlayerStatsComponent,
    AchievementsComponent,
    PlayerDetailsComponent,
    MatchInputComponent,
    ScheduleMatchComponent,
    AddPlayerComponent
  ],
  imports: [
    RouterModule.forRoot(routing),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    ChartModule,
    MatMenuModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
