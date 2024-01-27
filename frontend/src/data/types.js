export class Echo {
    constructor(id, text, date, imageSrc) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.imageSrc = imageSrc;
    }

}

export class Profile {
    constructor(id, name, profilePicture, echoes, position = [0, 0, 0], connectedTo = []) {
        this.id = id;
        this.name = name;
        this.profilePicture = profilePicture;
        this.echoes = echoes;
        this.position = position;
        this.connectedTo = connectedTo;
    }
}