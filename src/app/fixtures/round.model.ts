import { Season } from "src/app/shared/models/season.model";

export class Round {

    id: number;
    roundDescription: string;
    round: number;
    dateFrom: Date;
    dateTo: Date;
    season: Season;

}
