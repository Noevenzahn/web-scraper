const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const cors = require("cors")

const PORT = 8000
const url = "https://www.theguardian.com/uk"

const app = express()
app.use(cors())

app.get("/", function (req, res) {
    res.json("This is my webscraper")
})
app.get("/results", (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
    
            $(".fc-item__title", html).each(function () {
                const title = $(this).text()
                const link = $(this).find("a").attr("href")
                articles.push({ title, link })
            })
            res.json(articles)
        }).catch(error => console.log(error))
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))