namespace Transporter {
    export class Location {
        private characterRegionLocation: number[];
        private characterBodyLocation: number[];
        private characterPlaceLocation: number[];
        private characterLocation: number[];
        private region: number;
        private body: number;
        private place: number;
        private iAmIn: number[];

        public constructor(game: GameData) {
            this.characterLocation = game.character.location.split(',').map(value => parseInt(value, 10));
            this.characterRegionLocation = this.characterLocation.slice(4);
            this.characterBodyLocation = this.characterLocation.slice(2,4);
            this.characterPlaceLocation = this.characterLocation.slice(0,2);
            this.setIAmIn(game);
        }

        private setIAmIn(gameData) {
            let i = 0;
            let match: boolean = false;
            let location: number[];
            //Busca la región actual del personaje y establece su posicion dentro del array
            while (i < gameData.regions.length && ! match) {
                location = gameData.regions[i].properties.location;
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
            while (i < gameData.regions[this.region].bodies.length && ! match) {
                location = gameData.regions[this.region].bodies[i].properties.location;
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
            while (i < gameData.regions[this.region].bodies[this.body].places.length && ! match) {
                location = gameData.regions[this.region].bodies[this.body].places[i].properties.location;
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

        public getIAmIn() {
            return this.iAmIn;
        }
    }
}