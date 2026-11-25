class Property {
    constructor(address) {
        this.address = address;
    }
}

class Apartment extends Property {

    #price;

    constructor(address, area, rooms, floor, price) {

        super(address);

        this.area = area;
        this.rooms = rooms;
        this.floor = floor;

        this.setPrice(price);
    }

    setPrice(price) {

        if (price > 0) {
            this.#price = price;
        }

    }

    getPrice() {
        return this.#price;
    }
}

let apartments = [];

loadApartments();

function addApartment() {

    const address =
        document.getElementById("address").value;

    const area =
        Number(document.getElementById("area").value);

    const rooms =
        Number(document.getElementById("rooms").value);

    const floor =
        Number(document.getElementById("floor").value);

    const price =
        Number(document.getElementById("price").value);

    if (
        address === "" ||
        area <= 0 ||
        rooms <= 0 ||
        floor < 0 ||
        price <= 0
    ) {

        alert("Заповніть усі поля правильно");

        return;
    }

    const apartment =
        new Apartment(
            address,
            area,
            rooms,
            floor,
            price
        );

    apartments.push(apartment);

    saveApartments();

    showApartments(apartments);

    findCheapest();

    clearForm();
}

function clearForm() {

    document.getElementById("address").value = "";
    document.getElementById("area").value = "";
    document.getElementById("rooms").value = "";
    document.getElementById("floor").value = "";
    document.getElementById("price").value = "";
}

function showApartments(list) {

    const cards =
        document.getElementById("cards");

    cards.innerHTML = "";

    list.forEach((apartment, index) => {

        cards.innerHTML += `
        
        <div class="card">

            <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
            alt="Квартира">

            <h3>${apartment.address}</h3>

            <p>📐 ${apartment.area} м²</p>

            <p>🛏 ${apartment.rooms} кімнат</p>

            <p>🏢 ${apartment.floor} поверх</p>

            <p class="price">
                ${apartment.price || apartment._price || apartment.getPrice?.() || ""}
                $
            </p>

            <button
            onclick="deleteApartment(${index})">

                Видалити

            </button>

        </div>
        `;
    });
}

function deleteApartment(index) {

    apartments.splice(index, 1);

    saveApartments();

    showApartments(apartments);

    findCheapest();
}

function filterApartments() {

    const maxPrice =
        Number(
            document.getElementById("maxPrice").value
        );

    const result = [];

    apartments.forEach(apartment => {

        const price =
            apartment.price ||
            apartment._price ||
            apartment.getPrice?.();

        if (price <= maxPrice) {
            result.push(apartment);
        }
    });

    showApartments(result);
}

function findCheapest() {

    if (apartments.length === 0) {

        document.getElementById(
            "bestApartment"
        ).innerHTML = "";

        return;
    }

    let cheapest = apartments[0];

    apartments.forEach(apartment => {

        const currentPrice =
            apartment.price ||
            apartment._price ||
            apartment.getPrice?.();

        const cheapPrice =
            cheapest.price ||
            cheapest._price ||
            cheapest.getPrice?.();

        if (currentPrice < cheapPrice) {
            cheapest = apartment;
        }
    });

    document.getElementById(
        "bestApartment"
    ).innerHTML =
        `
        🏆 Найдешевша квартира:
        <br>
        ${cheapest.address}
        <br>
        ${cheapest.price || cheapest._price || cheapest.getPrice?.()} $
        `;
}

function saveApartments() {

    const data = apartments.map(a => ({
        address: a.address,
        area: a.area,
        rooms: a.rooms,
        floor: a.floor,
        price: a.getPrice()
    }));

    localStorage.setItem(
        "apartments",
        JSON.stringify(data)
    );
}

function loadApartments() {

    const saved =
        localStorage.getItem("apartments");

    if (saved) {

        const data =
            JSON.parse(saved);

        apartments = [];

        data.forEach(a => {

            apartments.push(
                new Apartment(
                    a.address,
                    a.area,
                    a.rooms,
                    a.floor,
                    a.price
                )
            );
        });

        setTimeout(() => {

            showApartments(apartments);

            findCheapest();

        }, 100);
    }
}
