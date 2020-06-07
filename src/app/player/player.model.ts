import { Match } from "src/app/fixtures/match.model";
import { Achievement } from "src/app/shared/models/achievement.model";

export class Player {

    id: number;
    firstName: String;
    lastName: String;
    dateOfBirth: number;
    userMail: number;
    password: number;
    isActive: number;
    playerWins: Array<Match>;
    playerLoses: Array<Match>;
    playerStats: {
        playerStatsId: number;
        bestRow: number;
        bestStreak: number;
        currentRow: number;
        currentStreak: number;
    };
    playerAchievements: Array<Achievement>;

}


