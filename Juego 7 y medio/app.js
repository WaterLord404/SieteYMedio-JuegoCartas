//CARTAS
let cards = [
    { name: "1Bastos", points: 1, img: "./img/1Bastos.jpg" },
    { name: "2Bastos", points: 2, img: "./img/2Bastos.jpg" },
    { name: "3Bastos", points: 3, img: "./img/3Bastos.jpg" },
    { name: "4Bastos", points: 4, img: "./img/4Bastos.jpg" },
    { name: "5Bastos", points: 5, img: "./img/5Bastos.jpg" },
    { name: "6Bastos", points: 6, img: "./img/6Bastos.jpg" },
    { name: "7Bastos", points: 7, img: "./img/7Bastos.jpg" },
    { name: "8Bastos", points: 0.5, img: "./img/8Bastos.jpg" },
    { name: "9Bastos", points: 0.5, img: "./img/9Bastos.jpg" },
    { name: "10Bastos", points: 0.5, img: "./img/10Bastos.jpg" },

    { name: "1Copas", points: 1, img: "./img/1Copas.jpg" },
    { name: "2Copas", points: 2, img: "./img/2Copas.jpg" },
    { name: "3Copas", points: 3, img: "./img/3Copas.jpg" },
    { name: "4Copas", points: 4, img: "./img/4Copas.jpg" },
    { name: "5Copas", points: 5, img: "./img/5Copas.jpg" },
    { name: "6Copas", points: 6, img: "./img/6Copas.jpg" },
    { name: "7Copas", points: 7, img: "./img/7Copas.jpg" },
    { name: "8Copas", points: 0.5, img: "./img/8Copas.jpg" },
    { name: "9Copas", points: 0.5, img: "./img/9Copas.jpg" },
    { name: "10Copas", points: 0.5, img: "./img/10Copas.jpg" },

    { name: "1Oros", points: 1, img: "./img/1Oros.jpg" },
    { name: "2Oros", points: 2, img: "./img/2Oros.jpg" },
    { name: "3Oros", points: 3, img: "./img/3Oros.jpg" },
    { name: "4Oros", points: 4, img: "./img/4Oros.jpg" },
    { name: "5Oros", points: 5, img: "./img/5Oros.jpg" },
    { name: "6Oros", points: 6, img: "./img/6Oros.jpg" },
    { name: "7Oros", points: 7, img: "./img/7Oros.jpg" },
    { name: "8Oros", points: 0.5, img: "./img/8Oros.jpg" },
    { name: "9Oros", points: 0.5, img: "./img/9Oros.jpg" },
    { name: "10Oros", points: 0.5, img: "./img/10Oros.jpg" },

    { name: "1Espadas", points: 1, img: "./img/1Espadas.jpg" },
    { name: "2Espadas", points: 2, img: "./img/2Espadas.jpg" },
    { name: "3Espadas", points: 3, img: "./img/3Espadas.jpg" },
    { name: "4Espadas", points: 4, img: "./img/4Espadas.jpg" },
    { name: "5Espadas", points: 5, img: "./img/5Espadas.jpg" },
    { name: "6Espadas", points: 6, img: "./img/6Espadas.jpg" },
    { name: "7Espadas", points: 7, img: "./img/7Espadas.jpg" },
    { name: "8Espadas", points: 0.5, img: "./img/8Espadas.jpg" },
    { name: "9Espadas", points: 0.5, img: "./img/9Espadas.jpg" },
    { name: "10Espadas", points: 0.5, img: "./img/10Espadas.jpg" }
];
//CLASE
class player {
    constructor(name) {
        this.nombre = name;
        this.puntos = 0;

    }

    get name() {
        return this.nombre;
    }

    get points() {
        return this.puntos;
    }

    addPoints = (points) => {
        this.puntos += points;
    };

    checkLose = (points) => {
        let lostGame = false;

        if ((this.puntos + points) > 7.5) {
            lostGame = true
        }

        return lostGame;
    };


}
//Jugadores
let player0 = new player('Human');
let player1 = new player('CPU');

//Botones
let next_card_button = document.getElementById("next_card");
let end_turn_button = document.getElementById("end_turn");

///////////////////////
//SIGUIENTE CARTA/////////
next_card_button.addEventListener("click", () => {

    //Desoculto el boton de terminar turno
    end_turn_button.classList.remove("hidden");
    //carta aleatoria
    let card = random_card();
    //dibuja la carta
    drawCardUser(card)

    //si el jugador no pierde con los puntos que le da la carta entra en el if
    if (!player0.checkLose(card.points)) {

        //se suman puntos
        player0.addPoints(card.points);

        //dibuja puntos
        drawPointsUser(player0);

    } else {

        //se suman puntos
        player0.addPoints(card.points);

        //dibuja puntos
        drawPointsUser(player0);;

        //si se pasa de puntos mostrara la ventana final
        mostrarResul();
    }
});
///////////////////////////////
//ACABAR TURNO/////////////////
end_turn_button.addEventListener("click", () => {
    let loseCPU = false;

    //Mientras no haya perdido, y los puntos de cpu sean menores que los del user
    //y menor de 7.5
    while (!loseCPU && player0.points > player1.points && player1.points < 7.5) {

        //carta aleatoria
        let card = random_card();
        //dibuja carta
        drawCardCpu(card);

        //si la cpu no pierde con los puntos que le da la carta entra en el if
        if (!player1.checkLose(card.points)) {
            //añadir puntos
            player1.addPoints(card.points);
            //dibujar puntos
            drawPointsCpu(player1);

        } else {
            //añadir puntos
            player1.addPoints(card.points);
            //dibujar puntos
            drawPointsCpu(player1);
            loseCPU = true;
        }
    }

    //mostrar ventana fianl
    mostrarResulCpu(loseCPU);
});
///////////////
const mostrarResul = () => {
    let div_resul = document.getElementById("resul");
    div_resul.textContent = "HAS PERDIDO :(";
    ocultarBotones();
    div_resul.classList.remove("hidden");
};

const mostrarResulCpu = (loseCpu) => {
    let div_resul = document.getElementById("resul");
    if (loseCpu == false) {
        div_resul.textContent = "HAS PERDIDO :(";
    } else {
        div_resul.textContent = "HAS GANADO :D";
    }
    ocultarBotones();
    div_resul.classList.remove("hidden");
};
//////////////////
const random_card = () => {
    if (cards.length > 0) {
        let rand = Math.floor(Math.random() * cards.length);
        let resul = cards[rand];
        cards.splice(rand, 1);

        return resul;
    }
};
/////////////////
const drawCardUser = (card) => {
    let nuevaCarta = document.getElementById("CartaCentroUser");
    nuevaCarta.setAttribute("src", card.img);

    let lista_cartas = document.getElementById("cartas_list_user");
    let cartaPequeña = document.createElement("img");
    cartaPequeña.setAttribute("src", card.img);
    lista_cartas.appendChild(cartaPequeña);
}

const drawCardCpu = (card) => {
    let nuevaCarta = document.getElementById("CartaCentroCpu");
    nuevaCarta.setAttribute("src", card.img);

    let lista_cartas = document.getElementById("cartas_list_cpu");
    let cartaPequeña = document.createElement("img");
    cartaPequeña.setAttribute("src", card.img);
    lista_cartas.appendChild(cartaPequeña);
}
/////////////
const ocultarBotones = () => {
    let boton1 = document.getElementById("next_card");
    let boton2 = document.getElementById("end_turn");
    let boton3 = document.getElementById("reset")

    boton1.classList.add("hidden");
    boton2.classList.add("hidden");

    //jugar de nuevo
    boton3.classList.remove("hidden");
}


///////////
const drawPointsUser = (user) => {
    let div = document.getElementById("puntosUser");
    div.textContent = "Puntos: " + user.points;
}


const drawPointsCpu = (user) => {
    let div = document.getElementById("puntosCpu");
    div.textContent = "Puntos: " + user.points;
}
///////////////