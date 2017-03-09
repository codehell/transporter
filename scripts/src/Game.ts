namespace Transporter {
    export class Game implements GameData{
        character: CharacterData;
        regions: Region[];
        ships: Ship[];
        printer;

        public constructor(data, printer) {
            this.character = data.character;
            this.regions = <Region[]> [];
            this.ships = data.ships;
            this.setRegion(data.region);
            this.printer = printer;
        }

        public setRegion(region: Region) {
            this.regions.push(region);
        }

        public init() {
            // Obtengo la posicion del personaje
            let loc: Location = new Location(this);
            let iAmIn: Place;
            let whereAmI: number[] = loc.getIAmIn;
            // Obtiene los datos del lugar donde se encuentra el personaje.
            // Todo: Meter este valor en la clase Location ?
            iAmIn = this.regions[loc.getIAmIn[2]].bodies[loc.getIAmIn[1]].places[loc.getIAmIn[0]];
            this.printer.printStage(iAmIn, whereAmI, this);
            loc = null;
        }
    }
}