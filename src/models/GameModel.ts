export interface GameModel {
    place: string
    professions: ProfessionModel[]
}

export interface ProfessionModel {
    username: string,
    isImpostor: boolean,
    playerId: string,
    profession: string | null,
}