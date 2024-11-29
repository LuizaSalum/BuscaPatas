document.addEventListener("DOMContentLoaded", () => {
    const shelterFilter = document.getElementById("shelterFilter");
    const shelterList = document.getElementById("shelterList");

    // Show dropdown on input focus
    shelterFilter.addEventListener("focus", () => {
        shelterList.classList.remove("d-none");
    });

    // Hide dropdown on click outside
    document.addEventListener("click", (event) => {
        if (!shelterFilter.contains(event.target) && !shelterList.contains(event.target)) {
            shelterList.classList.add("d-none");
        }
    });

    // Populate input field with selected item
    shelterList.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            shelterFilter.value = event.target.textContent;
            shelterList.classList.add("d-none");
        }
    });

    // Filter the dropdown items
    shelterFilter.addEventListener("input", () => {
        const filter = shelterFilter.value.toLowerCase();
        const items = shelterList.getElementsByTagName("li");
        Array.from(items).forEach((item) => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? "" : "none";
        });
    });
});
