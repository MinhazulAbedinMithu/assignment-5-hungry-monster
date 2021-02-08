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
            mealList.map(n => {
                createDiv(n);
            });
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
            <h4>${item.strMeal}</h4>
            
            <h4><i class="fas fa-heartbeat"></i> Ingredients</h4>
            <ul class="">
                <li><i class="fas fa-check-square"></i> ${item.strMeasure1}, ${item.strIngredient1}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure2}, ${item.strIngredient2}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure3}, ${item.strIngredient3}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure4}, ${item.strIngredient4}</li>
                <li><i class="fas fa-check-square"></i> ${item.strMeasure5}, ${item.strIngredient5}</li>
            </ul>
            
            
        `;
        const showedItem = document.getElementById('showedItem');
        showedItem.style.display="block";
        showedItem.style.height = "100%";
    };
    
    function foodItemHide(){
        const showedItem = document.getElementById('showedItem');
        showedItem.style.display="none";
    }