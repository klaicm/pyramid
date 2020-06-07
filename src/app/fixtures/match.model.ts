import { Player } from 'src/app/player/player.model';
import { Round } from 'src/app/fixtures/round.model';

export class Match {

    id: number;
    playerWinner: Player;
    playerDefeated: Player;
    playerRowAttacker: Player;
    playerRowDefender: Player;
    challengerRow: number;
    defenderRow: number;
    setFirst: string;
    setSecond: string;
    setThird: string;
    matchDate: Date;
    round: Round;
    matchPlayed: boolean;

}
