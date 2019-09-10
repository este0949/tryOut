
fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(function (data) {
        data.forEach(buildCategory)
        getProducts();
    })

const modal = document.querySelector(".modal-background");
console.log(modal)
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});

function buildCategory(data) {
    const section = document.createElement("section");
    const header = document.createElement("h1");
    header.textContent = data;
    section.setAttribute("id", data)
    section.appendChild(header);
    document.querySelector("main").appendChild(section);
    //console.log(data)

    const link = document.createElement("a");
    link.href = "#" + data;
    link.textContent = data;
    document.querySelector("nav").appendChild(link)
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            data.forEach(showDish)
        })
}

function showDish(dish) {
    //console.log(` I am a ${dish.category}and I need to go to #${dish.category}`)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".title").textContent = dish.name;
    copy.querySelector(".dishImg").src = `imgs/small/${dish.image}-sm.jpg`;
    copy.querySelector(".dishImg").alt = `image-of-${dish.image}`;
    copy.querySelector(".description").textContent = dish.shortdescription;
    copy.querySelector(".price").textContent = `${dish.price} dkk`;
    copy.querySelector(".vegetarian").textContent = "vegetarian";
    copy.querySelector(".alcohol").textContent = `Contains ${dish.alcohol} % of alcohol`;

    copy.querySelector("button").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });

    if (dish.discount) {
        copy.querySelector(".price").classList.add("onsale");
        copy.querySelector(".discount").textContent =
            Math.round(dish.price - dish.discount / 100 * dish.price) + " dkk"
    } else {
        copy.querySelector(".discount").remove();
    }
    if (dish.vegetarian == true) {

    } else {
        copy.querySelector(".vegetarian").remove();
    }

    if (dish.alcohol) {
        copy.querySelector(".alcohol").classList.add("alcohol");
    } else {
        copy.querySelector(".alcohol").remove();
    }

    if (!dish.soldout) {
        copy.querySelector("article").classList.remove("soldOut")
    }



    document.querySelector(` #${dish.category}`).appendChild(copy);
}

function showDetails(data) {
    console.log(data)
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.classList.remove("hide");
}
