// https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}
    // https://www.themealdb.com/api/json/v1/1/filter.php?c=Side

    document.getElementById("searchBtn").addEventListener("click", function(event){
        const foodName = document.getElementById("foodName").value;
        foodsQuery(foodName);
    });

    function foodsQuery(foodName){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(response => response.json())
        .then(data => {
            const mealList = data.meals;
            let searchResult = document.getElementById('searchResult');
            searchResult.innerHTML = '';
            if(mealList != null) {
               
                mealList.map(n => {
                    createDiv(n);
                });
                
            }else{
                const warning = document.createElement('div');
                warning.setAttribute('class', 'warning-area');
                warning.innerHTML =`
                    <h2><i class="fas fa-frown"></i> Search Not Found <i class="fas fa-heart-broken"></i></h2>
                    <p>Wrong Keyword or It's finished.</p>
                    <h4>Please search again</h4>
                `;
                searchResult.appendChild(warning);
                searchResult.style.display = 'block';
                
            }
        });
    }

    function createDiv(item){
        const foodLink = document.createElement('div');
        foodLink.setAttribute("class", "food-link");

        foodLink.innerHTML = `
            <div class="foodItem" onclick="foodItemLink('${item.idMeal}')">
                <img src="${item.strMealThumb}" alt="">
                <br>
                <h3>${item.strMeal}</h3>
                <br>
            </div>
        `;
        searchResult.appendChild(foodLink);
        searchResult.style.display = 'grid';
    }
    
    function foodItemLink(foodId){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(response => response.json())
        .then(data => {
            ingredientFood(data.meals[0]);
            console.log(data.meals[0]);
            
        });
    }


    const ingredientFood = item => {
        const foodDetails = document.getElementById('food-details');

        foodDetails.innerHTML = `
            <img src="${item.strMealThumb}" alt="">
            <h2>${item.strMeal}</h2>
            
            <h4><i class="fas fa-heartbeat"></i> Ingredients</h4>
            <ul class="">
                <li><i class="fas fa-check-square"></i> ${item.strMeasure1} ${item.strIngredient1}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure2} ${item.strIngredient2}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure3} ${item.strIngredient3}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure4} ${item.strIngredient4}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure5} ${item.strIngredient5}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure6} ${item.strIngredient6}</li>
            </ul>
            
            
        `;
        // const img = document.createElement('img');
        // img.src = `${item.strMealThumb}`;
        // foodDetails.appendChild(img);

        // const itemTitle =  document.createElement('h4');
        // itemTitle.innerText = item.strMeal;
        // foodDetails.appendChild(itemTitle);

        // const ul = document.createElement('ul');
        // foodDetails.appendChild(ul);
        // let i = 1;
        // while(item.strMeasure`${i}` === "" || item.strIngredienti === "") {
        //     if(item.strMeasure`${i}` != "" || item.strIngredient`${i}` != ""){
        //         const li = document.createElement('li');
        //         const checkMark = document.createElement('i');
        //         checkMark.setAttribute('class', 'fas fa-check-square');
        //         li.innerText = `${checkMark} ${item.strMeasure`${i}`} ${item.strIngredient`${i}`}`;
        //         console.log(li);
        //         ul.appendChild(li);
        //         i+=1;
        //     }
        // }

        const showedItem = document.getElementById('showedItem');
        showedItem.style.display="block";
        const screenHeight = screen.height; 
        const screenWidth = screen.width;
        showedItem.style.height = screenHeight + "px";
        showedItem.style.height = screenWidth + "px";
    };
    
    function foodItemHide(){
        const showedItem = document.getElementById('showedItem');
        showedItem.style.display="none";
    }