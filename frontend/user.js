export class User {
    constructor(plate) {
        this.id = 0;
        this.plate = plate;
        this.date = new Date;
        this.money = 0;    
    }

    updateStats(zone, hours) {
        this.money = this.money + ((6 / zone) * hours);
        this.date.setHours(this.date.getHours() + parseInt(hours));
    }

    drawUser(host) {
        //Container that will be called to remove the user visually
        let fakeContainer;
        fakeContainer = document.createElement("div");
        fakeContainer.className = "list";
        host.appendChild(fakeContainer);
        //Plate number
        let helper = document.createElement("a");
        helper.innerHTML = this.plate;
        fakeContainer.appendChild(helper);
        //Date HH:MM
        helper = document.createElement("time");
        helper.innerHTML = this.date.getHours() + ":" + this.date.getMinutes();
        fakeContainer.appendChild(helper);
        //Money
        helper = document.createElement("a");
        helper.innerHTML = this.money + "$";
        fakeContainer.appendChild(helper);
        //Button "Delete"
        helper = document.createElement("button");
        helper.className = "delete";
        helper.innerHTML = "Delete";
        fakeContainer.appendChild(helper);
        //Delete user from view and in the database
        helper.onclick = (ev) => {
            fakeContainer.remove();
            console.log(this);
            
            fetch("https://localhost:5001/Parking/DeleteUser/"+ this.id, 
            {
                method: "DELETE"
            })
            .then( res => console.log(res))
            .catch( res => console.log(res));
        }
    }

}