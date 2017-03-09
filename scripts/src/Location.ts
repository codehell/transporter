namespace Transporter {
    // Gestiona la localización del personaje.
    export class Location {
        private gameData: GameData;
        private characterRegionLocation: number[];
        private characterBodyLocation: number[];
        private characterPlaceLocation: number[];
        private characterLocation: number[];
        private region: number;
        private body: number;
        private place: number;
        private iAmIn: number[];

        public constructor(game: GameData) {
            this.gameData = game;
            this.characterLocation = game.character.location.split(',').map(value => parseInt(value, 10));
            this.characterRegionLocation = this.characterLocation.slice(4);
            this.characterBodyLocation = this.characterLocation.slice(2,4);
            this.characterPlaceLocation = this.characterLocation.slice(0,2);
            this.setIAmIn();
        }
        // Establece la propiedad iAmIn, fuera del constructor por organización.
        private setIAmIn() {
            let i = 0;
            let match: boolean = false;
            let location: number[];
            //Busca la región actual del personaje y establece su posicion dentro del array
            while (i < this.gameData.regions.length && ! match) {
                location = this.gameData.regions[i].properties.location;
                if (
                    this.characterRegionLocation.length === location.length &&
                    this.characterRegionLocation.every( (v,i) => v === location[i])
                ) {
                    this.region = i;
                    match = true;
                }
                i++;
            }

            i = 0;
            match = false;
            //Busca el cuerpo actual del personaje y establece su posicion dentro del array
            while (i < this.gameData.regions[this.region].bodies.length && ! match) {
                location = this.gameData.regions[this.region].bodies[i].properties.location;
                if (
                    this.characterBodyLocation[0] === location[0] &&
                    this.characterBodyLocation[1] === location[1]
                ) {
                    this.body = i;
                    match = true;
                }
                i++;
            }

            i = 0;
            match = false;
            //Busca el lugar (place) actual del personaje y establece su posicion dentro del array
            while (i < this.gameData.regions[this.region].bodies[this.body].places.length && ! match) {
                location = this.gameData.regions[this.region].bodies[this.body].places[i].properties.location;
                if (
                    this.characterPlaceLocation[0] == location[0] &&
                    this.characterPlaceLocation[1] == location[1]
                ) {
                    this.place = i;
                    match = true;
                }
                i++;
            }

            this.iAmIn = [this.place, this.body, this.region];
        }

        // Obtiene los datos de la posición del personaje.
        get getIAmIn() {
            return this.iAmIn;
        }

        // Obtener los lugares donde puedo ir

        public static whereCanIGo(){
            let coordinates: number[] = [10, 100];
            let maxRange = [100, 0, 0];
            return maxRange[0] > Math.sqrt(coordinates[0] * coordinates[0] + coordinates[1] * coordinates[1]);
        }
    }
}