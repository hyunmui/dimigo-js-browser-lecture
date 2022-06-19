document.addEventListener("DOMContentLoaded", function () {
    fetch("/menu.html")
        .then((response) => response.text())
        .then((html) => {
            let postListEl = document.querySelector(".post-list");
            postListEl.innerHTML += html;
        });
});
