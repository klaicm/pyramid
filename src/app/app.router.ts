import { FixturesComponent } from 'src/app/fixtures/fixtures.component';
import { PlayerComponent } from 'src/app/player/player.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleMatchComponent } from 'src/app/match-input/schedule-match/schedule-match.component';
import { AddPlayerComponent } from './player/add-player/add-player.component';
import { RoundComponent } from 'src/app/fixtures/round/round.component';
import { PlayerContactComponent } from 'src/app/player/player-contact/player-contact.component';
import { ModifyPlayerComponent } from 'src/app/player/modify-player/modify-player.component';
import { MatchInputComponent } from 'src/app/match-input/existing-match/match-input.component';
import { FriendlyMatchComponent } from 'src/app/match-input/friendly-match/friendly-match.component';

/**
 * Main app router and routes
 * @type {Routes}
 */
export const routing: Routes = [
    { path: '', component: FixturesComponent, },
    { path: 'player/:id', component: PlayerComponent },
    { path: 'match-input/:id', component: MatchInputComponent },
    { path: 'schedule-match', component: ScheduleMatchComponent },
    { path: 'add-player', component: AddPlayerComponent },
    { path: 'round-input', component: RoundComponent },
    { path: 'modify-player', component: ModifyPlayerComponent },
    { path: 'friendly-match', component: FriendlyMatchComponent }
];
