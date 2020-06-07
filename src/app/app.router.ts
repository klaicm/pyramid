import { FixturesComponent } from 'src/app/fixtures/fixtures.component';
import { PlayerComponent } from 'src/app/player/player.component';
import { PlayerStatsComponent } from 'src/app/player/player-stats/player-stats.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementsComponent } from 'src/app/player/achievements/achievements.component';
import { MatchInputComponent } from 'src/app/match-input/match-input.component';
import { ScheduleMatchComponent } from 'src/app/match-input/schedule-match/schedule-match.component';

/**
 * Main app router and routes
 * @type {Routes}
 */
export const routing: Routes = [
    { path: '', component: FixturesComponent, },
    {
        path: 'player/:id', component: PlayerComponent,
        children: [
            { path: 'player-stats', component: PlayerStatsComponent },
            { path: 'achievements', component: AchievementsComponent }
        ]
    },
    { path: 'match-input', component: MatchInputComponent },
    { path: 'schedule-match', component: ScheduleMatchComponent }
];
