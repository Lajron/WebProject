import { City } from "./city.js";
import { Street } from "./street.js";
import { User } from "./user.js";

let cities = [];
fetch("https://localhost:5001/Parking/GetCities").then(p => {
    p.json().then(data => {
        cities = data.map( el => {
            let cityHelp = new City(el.name);
            cityHelp.id = el.id;
            cityHelp.streets = el.streets.map(street => {
                let streetHelp = new Street(street.name, street.code, street.zone);
                streetHelp.id = street.id;                
                streetHelp.users = street.users.map( user => {
                    let userHelp = new User(user.plate);
                    userHelp.id = user.id;
                    userHelp.date = new Date(user.date);
                    userHelp.date.setHours(userHelp.date.getHours() + 2);
                    userHelp.money = user.money;
                    return userHelp;
                });                
                return streetHelp;
            });
            return cityHelp;
        });

        let wrap = document.createElement("div");
        wrap.className = "center";
        document.body.appendChild(wrap);
        let addCityForm = document.createElement("div");
        addCityForm.className = "addCity";
        wrap.append(addCityForm);

        let label = document.createElement("label");
        label.innerHTML = "Add a city";
        addCityForm.appendChild(label);

        let input = document.createElement("input");
        addCityForm.appendChild(input);

        let button = document.createElement("button");
        button.innerHTML = "Add";
        addCityForm.appendChild(button);

        button.onclick = () => {  
            fetch("https://localhost:5001/Parking/AddCity", {
                headers:{ 
                    "Content-Type":"application/json"
                    },
                method:"POST",
                body:JSON.stringify({ 
                    "name": input.value
                    }
                )
            }).then( res => res.json().then( nc => {
                const city = new City(input.value);
                city.id = nc.id;
                cities.push(city);
                city.drawCity(document.body);    
            }));
        }
        cities.forEach( city => city.drawCity(document.body));    
    });
});



