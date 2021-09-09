import { Street } from "./street.js";
import { User } from "./user.js";

export class City {
    constructor(name) {
        this.id = 0;
        this.name = name;
        this.container = null;
        this.streets = [];
    }

    addStreet(street) {
        this.streets.push(street);
    }

    drawCity(host) {
        if(!host) 
            throw new Exception("No host found [city.js]");
        //Main wrapper
        const inCenter = document.createElement("div");
        inCenter.className = "inCenter";
        host.insertBefore(inCenter, document.body.querySelector(".center"));
        //Three main windows
        let left = document.createElement("div");
        left.className = "sideForm";
        inCenter.appendChild(left);

        let middle = document.createElement("div");
        middle.className = "parkingForm";
        inCenter.appendChild(middle);

        let right = document.createElement("div");
        right.className = "parkingSpotList";
        inCenter.appendChild(right);
        /////////- Left window - options -/////////
        let helper = document.createElement("div");
        helper.className = "fixedSideForm";
        left.appendChild(helper);
        addTitle("Options", helper);
        let helperLabel;
        let helperButton;
        let helperDiv;

        //Street input - Add Street, Add Code, Zones
        helperDiv = document.createElement("div");
        helperDiv.className = "leftForm"
        helper.appendChild(helperDiv);
        //Add street
        helperLabel = document.createElement("label");
        helperLabel.innerHTML = "Add a street";
        helperDiv.appendChild(helperLabel);
        let name = document.createElement("input");
        helperDiv.appendChild(name);
        //Add Code
        helperLabel = document.createElement("label");
        helperLabel.innerHTML = "Add code";
        helperDiv.appendChild(helperLabel);
        let code = document.createElement("input");
        helperDiv.appendChild(code);
        //Zones
        let div = document.createElement("div");
        helperDiv.appendChild(div);
        addRadioButtons("Zone:", "zone", div);    
        //Button "Add"       
        helperButton = document.createElement("button");
        helperButton.innerHTML = "Add";
        helperDiv.appendChild(helperButton);
        //Button function - add street in database and in streets array
        helperButton.onclick = () => {  
            let zone = host.querySelector('input[name="zone"]:checked').value;                 
            fetch("https://localhost:5001/Parking/AddStreet/"+ this.id , {
                    headers:{ 
                        "Content-Type":"application/json"
                        },
                method:"POST",
                body:JSON.stringify({
                        "name": name.value,
                        "code": code.value,
                        "zone": zone
                    }
                )
            }).then( res => res.json().then(el => {
                //Creates and adds street in the streets array            
                let street = new Street(name.value, code.value, zone)
                street.id = el.id;
                this.addStreet(street);
                let parkingSpot = this.container.querySelector(".parkingSpots");
                this.container.appendChild(parkingSpot);
                while (parkingSpot.hasChildNodes()) {
                    parkingSpot.removeChild(parkingSpot.lastChild);
                }    
                this.streets.forEach((element) => element.drawStreets(parkingSpot, right));
            }));
        }
        
        //User input - Add code, plate number and hours
        helperDiv = document.createElement("div");
        helperDiv.className = "leftForm"
        helper.appendChild(helperDiv);
        //Add code
        helperLabel = document.createElement("label");
        helperLabel.innerHTML = "Street Code";
        helperDiv.appendChild(helperLabel);
        let streetCode = document.createElement("input");
        helperDiv.appendChild(streetCode);
        //Add plates
        helperLabel = document.createElement("label");
        helperLabel.innerHTML = "Plate Number";
        helperDiv.appendChild(helperLabel);
        let plateNumber = document.createElement("input");
        helperDiv.appendChild(plateNumber);
        //Hours
        div = document.createElement("div");
        helperDiv.appendChild(div);
        addRadioButtons("Hours:", "hours", div);    
        //Button "Send"  
        helperButton = document.createElement("button");
        helperButton.innerHTML = "Send";
        helperDiv.appendChild(helperButton);
        //Button function - add user in database and in city array
        helperButton.onclick = () => {
            let hours = host.querySelector('input[name="hours"]:checked').value;
            //Flag if user exists: 0 - doesn't exist; 1 - exists
            let bool = 0;
            this.streets.forEach( street => {
                street.users.forEach( user => {
                    //Check if user exists - update
                    if (user.plate === plateNumber.value) {
                        user.updateStats(street.zone, hours);
                        bool = 1;
                        fetch("https://localhost:5001/Parking/UpdateUser", {
                            headers:{ 
                                "Content-Type":"application/json"
                                },
                            method:"PUT",
                            body:JSON.stringify({
                                    "id": user.id,
                                    "plate": plateNumber.value,
                                    "date": user.date.toJSON(),
                                    "money": user.money
                                }
                            )
                        }).then( res => street.drawStreet(right));                          
                    }
                })
            });
            //Add user if they don't exist    
            if (bool == 0) {
                this.streets.forEach( street => {
                    if (street.code === streetCode.value) {
                        let user = new User(plateNumber.value);
                        user.updateStats(street.zone, hours);    
                        fetch("https://localhost:5001/Parking/AddUser/"+ street.id, {
                            headers:{ 
                                "Content-Type":"application/json"
                                },
                            method:"POST",
                            body:JSON.stringify({
                                    "plate": plateNumber.value,
                                    "date": user.date.toJSON(),
                                    "money": user.money
                                }
                            )
                        }).then( res => res.json().then( el => {
                            user.id = el.id;
                            street.addUser(user);
                            street.drawStreet(right);    
                        }));                        
                    }
                });    
            }
        }
        /////////- Middle window - list of streets -/////////   
        //Container - parent of everything in the middle view   
        this.container = document.createElement("div");
        this.container.className = "city";
        middle.appendChild(this.container);
        //Title
        helper = document.createElement("div");
        helper.className = "titles";
        this.container.appendChild(helper);
        let helperH2 = document.createElement("h2");
        helperH2.innerHTML = this.name;
        helper.appendChild(helperH2);
        //View of parking spots
        helper = document.createElement("div");
        helper.className = "parkingSpots";
        this.container.appendChild(helper);
        //Draw each street
        this.streets.forEach((element) => element.drawStreets(helper, right));         
        /////////-Right window - options-/////////
        //Placeholder "Parking Name" on page load
        if (right.querySelector(".fixedParkingSpot") == null) {
            helper = document.createElement("div");
            helper.className = "fixedParkingSpot";
            right.appendChild(helper);
            addTitle("Parking Name", helper);
        }
        /////////- Helper function -/////////
        //Creates titles
        function addTitle(title, element) {
            let helper = document.createElement("div");
            helper.className = "titles";
            element.appendChild(helper);
            
            let helperH2 = document.createElement("h2");
            helperH2.innerHTML = title;
            helper.appendChild(helperH2);
        }
        //2x3 radio buttons function (zone & hours)
        function addRadioButtons(title, name, host) {
            let theTitle = document.createElement("label");
            theTitle.innerHTML = title;
            host.appendChild(theTitle);
            let input;
            let label;
            for (let i = 1; i < 4; i++) {
                input = document.createElement("input");
                input.type = "radio";
                input.value = i;
                input.name = name;
                
                label = document.createElement("label");
                label.innerHTML = i;
                host.appendChild(input);
                host.appendChild(label);
            }
        }
    }
}