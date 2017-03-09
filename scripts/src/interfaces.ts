namespace Transporter {

    export interface GameData {
        character: CharacterData;
        regions: Region[];
        ships: Ship[];
        init();
        setRegion(region: Region);
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
            scope: number;
        };
    }

    export interface Body {
        properties: {
            name: string;
            type: string;
            location: number[];
            scope: number;
        };
        places: Place[];
    }

    export interface Place {
        properties: {
            name: string;
            location: number[];
            scope: number;
            description: string[];
        };
        people: People[];
    }

    export interface People {
        name: string;
        description: string[];
        presentation: string[];
        comments: {reference: string; answer: string[]}[];
    }

    export interface Ship {
        id: number;
        name: string;
        capacity: number;
        speed: number;
        ambit: ShipType;
        scope: number;
        attack: number;
        defense: number;
    }

    enum ShipType {
        local,
        body,
        region,
    }
}