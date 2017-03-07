namespace Transporter {
    export class Game implements GameData{
        character: CharacterData;
        regions: Region[];

        public constructor(data) {
            this.character = data.character;
            this.regions = <Region[]> [];
            this.regions.push(data.region);
        }

        public setRegion(region: Region) {
            this.regions.push(region);
        }
    }
}