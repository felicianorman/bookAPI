let title = document.getElementById("bookTitle");
let author = document.getElementById("bookAuthor");
let genre = document.getElementById("bookGenre");
let rating = document.getElementById("bookRating");
let url = document.getElementById("bookUrl");
let inputBtn = document.getElementById("inputBtn");


inputBtn?.addEventListener("click", (e) => {
  console.log("Skickad");
  e.preventDefault();
  console.log(title.value);

  const addBookMutationVars = {
    input: {
      id: crypto.randomUUID(),
      title: title.value,
      author: author.value,
      genre: genre.value,
      rating: rating.value,
      url: url.value,
    },
  };

  fetch("https://sheetdb.io/api/v1/olpxpsoqeyjnk", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addBookMutationVars),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));

  document.location.href = "/submitBook.html"

});
