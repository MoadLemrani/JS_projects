const api_url = "https://dummyjson.com/quotes/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getQuote(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    quote.innerHTML = data.quote;
    author.innerHTML = data.author;
}

function tweet() {
    window.open("https://x.com/intent/post?text=" + quote.innerHTML + "--By " + author.innerHTML,
        "Tweet Window", "width=600, height=300");
}

getQuote(api_url);
