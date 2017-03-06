namespace Transporter {

    export interface GameData {
        character: CharacterData;
        regions: Region[];
    }

    export interface CharacterData {
        id: string;
        name: string;
        purse: string;
        location: string;
        token: string;
    }

    export interface Region {
        bodies: Body[];
        properties: {
            name: string;
            location: number[];
        };
    }

    export interface Body {
        properties: {
            name: string;
            type: string;
            location: number[];
        };
        places: Place[];
    }

    export interface Place {
        properties: {
            name: string;
            location: number[];
            description: string[];
        };
    }
}