  // Toggle mobile menu
document.getElementById("menu-btn").addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
});

  //   load categories function
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())//promise of json
    .then(json => displayCategories(json.categories));
};
loadCategories();

  //function for display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = '';

  for (let categorie of categories) {
    const categoriesDiv = document.createElement('div');
    categoriesDiv.innerHTML = `
       <button id="categorie-btn-" 
        onclick="loadPlantsbycategories('${categorie.id}')" 
        class="text-xl mt-2 w-full bg-[#e9fdf0] text-left active shadow-none border-none text-black font-semibold p-1 rounded-none focus:outline-none">
  ${categorie.category_name}
 </button>


    `;
    categoriesContainer.appendChild(categoriesDiv);
  }
};

// displayCategories();

const loadAllPlants = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(json => displayAllPlants(json.plants))
}
loadAllPlants();

const displayAllPlants = (plants) => {
    const plantsContainer = document.getElementById("plants-container");
    plantsContainer.innerHTML = "";
    
    for(let plant of plants){
        const plantsDiv = document.createElement('div');
    plantsDiv.innerHTML = `
        <div class="max-h-[800px] rounded-sm p-3 bg-white " >
                <div class="h-fit rounded-xl">
                    <img class="h-1/2 w-full max-h-[300px] rounded-sm " src="${plant.image}" alt="">
                </div>
                <div>
                    <h3 class="mt-3 text-xl font-bold">${plant.name}</h3>
                    <p class="h-[80px] overflow-y-auto font-semibold mt-3">${plant.description}</p>

                    <div class="flex justify-between mt-3">
                        <button class=" btn  rounded-4xl bg-[#DCFCE7] 
                        text-green-600 font-bold">${plant.category}</button>
                        
                        <h3 class="text-xl font-bold">$ <span id="cart-price-${plant.id}">${plant.price}</span></h3>

                    </div>
                    <div class="mt-3">
                        <button id="cartBtn-${plant.id}" onclick="addToCart(${plant.id})" class="btn active rounded-4xl w-full text-white font-bold">Add to Cart</button>

                    </div>
                </div>
            </div> 
    
    `
   
    plantsContainer.append(plantsDiv);
    }
    cartTotal
}

function cartTotal(){
    const plantPrice = document.getElementById(`cart-price`)
}

const addToCart = async (id) => {
  // Fetch plant data from API
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  const plant = data.plants;

  // Select cart container
  const cartContainer = document.getElementById("cart-container");

  // Create a new cart item div
  const cartItem = document.createElement("div");
  cartItem.classList = "p-3 rounded-sm shadow-sm mb-3";

  cartItem.innerHTML = `
    <div class="flex justify-between items-center bg-gray-200 p-1 rounded-sm ">
        <div class="flex-col justify-between items-center">
              <h3 class="text-sm font-bold">${plant.name}</h3>
              <p class="font-normal text-gray-500">$ <span id="cart-container-total">${plant.price}</span> x <span>1</span></p>
        </div>
        <div>
            <button class="text-red-700 text-xl font-bold mr-2">X</button>
        </div>
    </div>
  `;

  // Append the new item to the cart
  cartContainer.appendChild(cartItem);

  // Update total
//   cartTotal();
};

// const cartTotal = (price, id) => {
//   const plantPrice = document.getElementById(`cart-price-${id}`);
//   console.log(plantPrice); // should never be null now
// };




const loadPlantsbycategories = async(id) =>{

    //console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const categories = await res.json();
    displayAllPlants(categories.plants);
    
}