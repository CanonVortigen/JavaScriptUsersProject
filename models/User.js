class User {

    constructor (name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }    

    get id() {
        return this._id;         
    }

    get name() {
        return this._name;         
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }

    set photo(value){
        this._photo = value;
    }

    loadFromJSON(json) {

        for (let name in json) {

            switch(name) {

                case '_register':
                    this[name] = new Date(json[name]);
                break;

                default:
                    this[name] = json[name];

            }
           

        }

    }

    getNewId() {

        let usersID = parseInt(localStorage.getItem("usersID"));

        if (!usersID > 0) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);

        return usersID;

    }

    save() {

        let users = User.getUserStorage();

        if (this.id > 0) {

            users.map(user => {

                if (user._id == this.id) {

                   Object.assign(user, this);

                }

                return user;

            });

        } else {

            this._id = this.getNewId();

            users.push(this);

        }

        //sessionStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("users", JSON.stringify(users));    

    }

    static getUserStorage() {

        let users = [];

        if (localStorage.getItem("users")) {

            users = JSON.parse(localStorage.getItem("users"));

        }

        return users;

    }

    deleteUser() {

        let users = User.getUserStorage();

        users.forEach((userData, index)=>{

            if(this._id == userData._id) {
                // Remove one Item of Array
                users.splice(index, 1);

            }

        });

        localStorage.setItem("users", JSON.stringify(users)); 

    }

}