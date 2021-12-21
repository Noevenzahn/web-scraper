const feedDisplay = document.querySelector("#feed")

fetch("http://localhost:8000/results")
    .then(res => res.json())
    .then(data => {
        data.forEach(article => {
            const articleItem = `<h3><a href="${article.link}">${article.title}</a><h3>`
            feedDisplay.insertAdjacentHTML("beforeend", articleItem)
        });
    }).catch(err => console.log(err))