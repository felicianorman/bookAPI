let books = [];

// const graphQlQuery = async (query, variables = {}) => {
//   const response = await fetch('https://sheetdb.io/api/v1/olpxpsoqeyjnk', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const res = await response.json();
//   return res.data;
// };

// const getAllBooksQuery = `query Query {
//     getAllBooks {
//       id
//       title
//       rating
//       author
//       genre
//       url
//     }
//   }`;

let getAllBtn = document.getElementById("displayBtn");

getAllBtn.addEventListener("click", async () => {
  const getAllBooksQuery = `query Query {
    getAllBooks {
      id
      title
      rating
      author
      genre
      url
    }
  }`;
// Sort results by id in descending order, take two
// and return the age as an integer.

fetch('https://sheetdb.io/api/v1/58f61be4dda40?sort_by=id&sort_order=desc&limit=2&cast_numbers=age')
  .then((response) => response.json())
  .then((data) => console.log(data));


  books = await response.getAllBooks;
  createHTML(books);
});

function createHTML(books) {
    let mainContainer = document.getElementById("bookContainer");
    mainContainer.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        console.log(books[i]);

        let container = document.createElement("div");
        container.classList.add("book");

        let h3 = document.createElement("h3");
        h3.innerHTML = books[i].title;
        h3.classList.add("book--title");

        let img = document.createElement("img");
        img.src = books[i].url;
        img.classList.add("book--img");

        let author = document.createElement("p");
        author.innerHTML = `Författare: ${books[i].author}`;
        author.classList.add("book--author")

        let genre = document.createElement("p");
        genre.innerHTML = `Genre: ${books[i].genre}`;
        genre.classList.add("book--genre");

        let rating = document.createElement("p");
        rating.innerHTML = `Betyg: ${books[i].rating}`
        rating.classList.add("book--rating");

        mainContainer.appendChild(container);
        container.appendChild(h3);
        container.appendChild(img);
        container.appendChild(author);
        container.appendChild(genre);
        container.appendChild(rating);
    }

}