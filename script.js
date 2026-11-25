class Property {

    constructor(address) {
        this.address = address;
    }
}

class Apartment extends Property {

    #price;

    constructor(
        address,
        area,
        rooms,
        floor,
        price
    ) {

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

        alert("Заповніть поля правильно");

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

    const body =
        document.getElementById("tableBody");

    body.innerHTML = "";

    for (let i = 0; i < list.length; i++) {

        body.innerHTML += `
        <tr>
            <td>${list[i].address}</td>
            <td>${list[i].area}</td>
            <td>${list[i].rooms}</td>
            <td>${list[i].floor}</td>
            <td>${list[i].getPrice()} $</td>

            <td>
                <button
                class="deleteBtn"
                onclick="deleteApartment(${i})">

                    Видалити

                </button>
            </td>

        </tr>
        `;
    }
}

function deleteApartment(index) {

    apartments.splice(index, 1);

    showApartments(apartments);

    findCheapest();
}

function filterApartments() {

    const maxPrice =
        Number(
            document.getElementById(
                "maxPrice"
            ).value
        );

    const result = [];

    for (let apartment of apartments) {

        if (
            apartment.getPrice()
            <=
            maxPrice
        ) {

            result.push(apartment);
        }
    }

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

    for (let apartment of apartments) {

        if (
            apartment.getPrice()
            <
            cheapest.getPrice()
        ) {

            cheapest = apartment;
        }
    }

    document.getElementById(
        "bestApartment"
    ).innerHTML =
        "Найдешевша квартира: "
        +
        cheapest.address
        +
        " | "
        +
        cheapest.getPrice()
        +
        " $";
}