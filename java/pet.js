class Tamagotchi {
    #hunger;
    #happiness;
    #hungerid;
    #happinessid;
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.#hunger = 10;
        this.#happiness = 10;
        this.updateHapiness();
    }

    feed() {
        this.#hunger += 1;
        if (this.#hunger > 10) {
            this.#hunger = 10;
        }
        this.updateHapiness();
    }

    play() {


        this.#happiness += 1;
        if (this.#happiness > 10) {
            this.#happiness = 10;
        }
        this.updateHapiness();
    }

    updateHapiness() {

        const happiness = document.querySelector(`#${this.name}-happiness span`);
        if (happiness) {
            happiness.innerText = this.#happiness;
            console.log('happiness: ' + this.#happiness);
        }

    }

    updateHunger() {

        const hunger = document.querySelector(`#${this.name}-hunger span`);
        if (hunger) {
            hunger.innerText = this.#hunger;
            console.log('hunger: ' + this.#hunger);
        }


    }
    startTimer() {
        this.#hungerid = setInterval(() => {
            const pointsDecreased = this.decreasePoints(1);
            if (pointsDecreased) {
                this.updateHapiness();
            }
        }, 1000);


        this.#happinessid = setInterval(() => {
            const hungerPointsDecreased = this.decreaseHungerPoints(1);
            if (hungerPointsDecreased) {
                this.updateHunger();
            }
        }, 2000)
    }

    stop() {
        clearInterval(this.#hungerid);
        clearInterval(this.#happinessid);
        const petDiv = document.getElementById(this.name + 'pet');
        petDiv.style.backgroundColor = "grey"
        petDiv.innerText = 'Your pet passed away!';
    }

    decreaseHungerPoints(hungerPoints) {
        let hungerPointsDecreased = false;
        if (this.#hunger > 0) {
            this.#hunger -= hungerPoints;
            if (this.#hunger < 0) {
                this.#hunger = 0;
            }
            hungerPointsDecreased = true;
            const hungerLevelEl = document.querySelector(`#${this.name}-hunger span`);
            if (hungerLevelEl) {
                hungerLevelEl.innerText = this.#hunger;
            }
        }

        if (this.#hunger === 0 || this.#happiness === 0) {
            this.stop();
            return;
        }
        return hungerPointsDecreased
    }

    decreasePoints(points) {
        let pointsDecreased = false;
        if (this.#happiness > 0) {
            this.#happiness -= points;
            if (this.#happiness < 0) {
                this.#happiness = 0;
            }
            pointsDecreased = true;
        }
        if (this.#hunger === 0 || this.#happiness === 0) {
            this.stop();
            return;
        }
        return pointsDecreased;
    }
    createPet() {
        const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF", "#FFC0CB"];

        const petContainer = document.getElementById('container')
        const petDiv = document.createElement('div');
        petDiv.setAttribute('id', this.name + 'pet');
        petDiv.classList.add('pet');
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        petDiv.style.backgroundColor = randomColor;




        const petName = document.createElement('h3');
        petName.innerText = `${this.name} ${this.type}`;
        petDiv.appendChild(petName);


        const hunger = document.createElement('p');
        hunger.innerHTML = `Hunger: <span>${this.#hunger}</span>`;
        hunger.setAttribute('id', this.name + '-hunger');
        petDiv.appendChild(hunger);

        const happiness = document.createElement('p');
        happiness.innerHTML = `Happiness: <span>${this.#happiness}</span>`;
        happiness.setAttribute('id', this.name + '-happiness');
        petDiv.appendChild(happiness);


        const feedBtn = document.createElement('button')
        feedBtn.classList.add('feed-Btn');
        feedBtn.innerText = 'Feed'
        feedBtn.addEventListener('click', () => {
            this.feed();
            hunger.querySelector('span').innerText = this.#hunger;
        });
        petDiv.appendChild(feedBtn);

        const playBtn = document.createElement('button');
        playBtn.classList.add('play-Btn');
        playBtn.innerText = 'Play';
        playBtn.addEventListener('click', () => {
            this.play();
            happiness.querySelector('span').innerText = this.#happiness;
        });

        petDiv.appendChild(playBtn);
        petContainer.appendChild(petDiv);
        this.startTimer();
    }



}

export { Tamagotchi }
