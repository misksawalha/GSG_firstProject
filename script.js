let characterList = document.getElementById("characterList");
let dataArr = [];

async function getData() {
    try {
        let response = await fetch("https://rickandmortyapi.com/api/character");
        let data = await response.json();

        for (const item of data.results) {
            dataArr.push(item);
        }

        console.log(dataArr);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function displayData() {
    try {
        await getData();

        dataArr = dataArr.filter(item => item.status === "Alive");

        console.log(dataArr);
    } catch (error) {
        console.error("Error displaying data:", error);
    }
}

async function displayList() {
    try {
        await displayData();

        let res = "";
        if (dataArr.length > 50) {
            let displayArr = dataArr.slice(0, 50)

            for (let i = 0; i < displayArr.length; i++) {
                res += `
            <li>${displayArr[i].id}</li>
            `;
            }
        }
        else {
            for (let i = 0; i < dataArr.length; i++) {
                res += `
                <div class="row ">
                <div class="card d-flex my-2 mx-3 " style="width: 22rem;">
  <img src=${dataArr[i].image} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Name: ${dataArr[i].name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Location: ${dataArr[i].location.name}</li>
    <li class="list-group-item">Species: ${dataArr[i].species}</li>
    <li class="list-group-item">Gender: ${dataArr[i].gender}</li>
  </ul>
</div></div>
            
            `;
            }
        }
        characterList.innerHTML = res;
    } catch (error) {
        console.error("Error displaying list:", error);
    }
}

displayList();
