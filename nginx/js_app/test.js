const ul = document.createElement("ul");

function afficherLeResultat(data) {
  const li = document.createElement("li");
  li.innerText = data;
  li.classList.add("item");
  ul.append(li);
  document.querySelector("#app").append(ul);
}

const button = document.querySelector("button");

button.onclick = () => {
  ul.innerHTML = "";
  const requete = new XMLHttpRequest();
  requete.open("GET", "https://localhost:5000/api/todos/");
  requete.responseType = "json";
  requete.send();
  requete.onload = () => {
    if (requete.status !== 200) {
      console.error(`Erreur ${requete.status}: ${requete.statusText}`);
    } else {
      afficherLeResultat(`Terminée, reçu : ${requete.response.length} octets.`);
      requete.response.map(todo => afficherLeResultat(todo.title));
      requete.response.map(todo => afficherLeResultat(todo.description));
    }
  };

  requete.onprogress = progress => {
    if (progress.lengthComputable) {
      console.log(
        `Reçu ${progress.loaded} octets sur ${progress.total} octets.`
      );
    } else {
      console.log(`Reçu ${progress.loaded} octets.`);
    }
  };

  requete.onerror = () => console.error("Erreur requête !");
};


// fetch('http://localhost:8000/api/todos/', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
// })
// .then(data => {
//     console.log('Data received:', data);
// })
// .catch(error => {
//     console.error('Error:', error);
// });
