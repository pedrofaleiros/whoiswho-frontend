export interface PlaceModel {
    id: string
    name: string
    professions: PlaceProfessionModel[]
}

export interface PlaceProfessionModel {
    id: string
    name: string
}