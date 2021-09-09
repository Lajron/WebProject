export class Street {
    constructor(name, code, zone) {
        this.id = 0;
        this.name = name;
        this.code = code;
        this.zone = zone;
        this.container = null;
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }
    //Draws little blocks with name, code and zone in the middle
    drawStreets(host, rightSide) {
        let color = [ "#CD212A", "#EFC050", "#45B8AC"]
        this.container = document.createElement("div");
        this.container.className = "spot";
        this.container.style.backgroundColor = color[this.zone-1];
        host.appendChild(this.container);
        //Calls a function to display users on the right side
        this.container.onclick = (ev) => {
            this.drawStreet(rightSide);
        }

        let helper = document.createElement("div");
        helper.className = "content";
        this.container.appendChild(helper);

        let info = document.createElement("div");
        info.className = "streetName";
        info.innerHTML = this.name;
        helper.appendChild(info);

        info = document.createElement("div");
        info.className = "streetCode";
        info.innerHTML = this.code;
        helper.appendChild(info);

        info = document.createElement("div");
        info.className = "streetZone";
        info.innerHTML = "Zone: " + this.zone;
        helper.appendChild(info);
    }

    //Draws parking on the right
    drawStreet(host) {
        if(!host) 
            throw new Exception("No host found [street.js]");
        //Clears all children of the right side
        while (host.hasChildNodes()) {
            host.removeChild(host.lastChild);
        }

        this.container = document.createElement("div");
        this.container.className = "fixedParkingSpot";
        host.appendChild(this.container);
        //Title
        let helper = document.createElement("div");
        helper.className = "titles";
        this.container.appendChild(helper);
        //Name
        let helperH2 = document.createElement("h2");
        helperH2.innerHTML = this.name;
        helper.appendChild(helperH2);

        helper = document.createElement("div");
        helper.className = "spotList";
        this.container.appendChild(helper);
        //Calls function to draw users for each user in the list
        this.users.forEach((element) => element.drawUser(helper));  
    }
}