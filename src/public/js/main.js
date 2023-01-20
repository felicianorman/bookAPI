let books = [];

const graphQlQuery = async (url, query, variables = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const res = await response.json();
  return res.data;
};

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

let getAllBtn = document.getElementById("displayBtn");

getAllBtn.addEventListener("click", async () => {
  const response = await graphQlQuery(
    "http://localhost:4000/graphql",
    getAllBooksQuery
  );

  console.log(response);

  books = await response.getAllBooks;
  createHTML(books);
});

function createHTML(books) {
    let mainContainer = document.getElementById("bookContainer");
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