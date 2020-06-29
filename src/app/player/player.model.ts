import { Match } from 'src/app/fixtures/match.model';
import { Achievement } from 'src/app/shared/models/achievement.model';
import { PlayerStats } from 'src/app/player/player-stats/player-stats.model';

export class Player {

    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: number;
    phoneNumber: string;
    userMail: string;
    password: string;
    isActive: boolean;
    active: boolean;
    playerWins: Array<Match>;
    playerLoses: Array<Match>;
    playerStats: PlayerStats;
    playerAchievements: Array<Achievement>;

}


