import { Round } from "src/app/fixtures/round.model";


export class Season {

    id: number;
    seasonName: string;
    seasonTier: string;
    currentSeason: boolean;
    rounds: Array<Round>;
}
