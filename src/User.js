export class User {
    name;
    email;

    constructor(name, email, sobre) {
        this.name = name
        this.email = email
    }

    getFullName() {
        return `${this.name} Boni`
    }
}