
let resultTimer;

let clearTextTimer;


const button = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    button.textContent = "☀️";
} else {
    button.textContent = "🌙";
}

button.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        button.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        button.textContent = "🌙";
    }
});


const popup = document.getElementById("overlay");
const dismissBtn = document.getElementById("dismiss-btn");

if (popup && dismissBtn) {
    if (localStorage.getItem("noticeAccepted")) {
        popup.style.display = "none";
    }

    dismissBtn.addEventListener("click", () => {
        localStorage.setItem("noticeAccepted", "true");
        popup.style.display = "none";
    });
}















function hideResultAfterDelay(result) {

    result.classList.remove("fade-out");

    setTimeout(() => {

        result.classList.add("fade-out");

    }, 5000);

    setTimeout(() => {

        result.textContent = "";

        result.classList.remove("fade-out");

    }, 5600);

}


function showResult(message, color) {

    const result = document.getElementById("result");

    clearTimeout(resultTimer);

    clearTimeout(clearTextTimer);

    result.textContent = message;

    result.style.color = color;

    result.classList.remove("show");

    setTimeout(() => {

        result.classList.add("show");

    }, 10);

    resultTimer = setTimeout(() => {

        result.classList.remove("show");

        clearTextTimer = setTimeout(() => {

            result.textContent = "";

        }, 500);

    }, 5000);

}


function calculateAverage() {

    const g1 = Number(document.getElementById("grade1").value);

    const g2 = Number(document.getElementById("grade2").value);

    const g3 = Number(document.getElementById("grade3").value);

    const g4 = Number(document.getElementById("grade4").value);

    const g5 = Number(document.getElementById("grade5").value);

    if (

        g1 < 4 || g1 > 10 ||

        g2 < 4 || g2 > 10 ||

        g3 < 4 || g3 > 10 ||

        g4 < 4 || g4 > 10 ||

        g5 < 4 || g5 > 10

    ) {

        showResult(

            "Jo vlerë e saktë! Notat duhet të jenë nga 4 deri në 10.",

            "red"

        );

        return;

    }

    const average = (g1 + g2 + g3 + g4 + g5) / 5;

    showResult(

        "Mesatarja juaj është: " + average.toFixed(2),

        "green"

    );

}



const searchInput = document.getElementById("searchInput");

const noResults = document.getElementById("noResults");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const query = searchInput.value.toLowerCase().trim();

        const cards = document.querySelectorAll(".card");

        let found = false;

        cards.forEach(card => {

            const text = card.textContent.toLowerCase();

            if (query === "" || text.includes(query)) {

                card.style.display = "block";

                if (query !== "") {

                    found = true;

                }

            } else {

                card.style.display = "none";

            }

        });

        if (query !== "" && !found) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    });

}