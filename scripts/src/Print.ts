namespace Transporter {
    export class Print {

        public static printStage(iAmIn: Place, whereAmI: number[], gameData: GameData) {

            let historyPanel = document.getElementById('stage'),
                charInfo: HTMLDivElement = document.createElement('div'),
                name = document.createElement('p'),
                location = document.createElement('p'),
                purse = document.createElement('p'),
                historyParagraph;

            charInfo.className = "char_info";
            name.textContent = gameData.character.name;
            location.textContent = iAmIn.properties.name +
                ' (' + gameData.regions[whereAmI[2]].bodies[whereAmI[1]].properties.name + ')';
            purse.textContent = gameData.character.purse;

            charInfo.appendChild(name);
            charInfo.appendChild(location);
            charInfo.appendChild(purse);
            historyPanel.appendChild(charInfo);

            for (let p of iAmIn.properties.description) {
                historyParagraph = document.createElement('p');
                historyParagraph.textContent = p;
                historyPanel.appendChild(historyParagraph);
            }

            gameData.regions.forEach((value) => {
                console.log(value);
            });
            //console.log(Location.whereCanIGo());
            console.log(gameData);
        }

    }
}
