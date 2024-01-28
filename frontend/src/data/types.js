export class Echo {
    constructor(id, text, date, imageSrc, location = '') {
        this.id = id;
        this.text = text;
        this.date = date;
        this.imageSrc = imageSrc;
        this.location = location;
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