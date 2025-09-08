  // Toggle mobile menu
document.getElementById("menu-btn").addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
});



  //   load categories function
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())//promise of json
    .then(json => {
        

        displayCategories(json.categories)
    });
};
loadCategories();

  //function for display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = '';

for (let categorie of categories) {
  const categoriesDiv = document.createElement('div');
  categoriesDiv.innerHTML = `
    <button 
      id="categorie-btn-${categorie.id}" 
      onclick="loadPlantsbycategories('${categorie.id}'); toggleActive('${categorie.id}')"
      class="category-btn text-xl mt-2 w-full bg-[#e9fdf0] text-left hover:bg-green-500 shadow-none border-none text-black font-semibold p-1 rounded-sm focus:outline-none ">
      ${categorie.category_name}
    </button>
  `;
  categoriesContainer.appendChild(categoriesDiv);
}
    categoriesContainer.appendChild(categoriesDiv);
    classToggle();
  }
const toggleActive = (id) => {
 
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove("active"));
  const clickedBtn = document.getElementById(`categorie-btn-${id}`);
  if (clickedBtn) {
    clickedBtn.classList.add("active");
  }
};

const loadAllPlants = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(json => {
         displayAllPlants(json.plants)
    })
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
                    <h3 onclick="loadPlantDetail(${plant.id})" class="mt-3 text-xl font-bold ">${plant.name}</h3>
                    <p class="h-[80px] overflow-y-auto font-semibold mt-3">${plant.description}</p>

                    <div class="flex justify-between mt-3">
                        <button id="category-btn" class=" btn  rounded-4xl bg-[#DCFCE7] 
                        text-green-600 font-bold">${plant.category}</button>
                        
                        <h3 class="text-xl font-bold">$ <span id="cart-price-${plant.id}">${plant.price}</span></h3>

                    </div>
                    <div class="mt-3">
                        <button id="cartBtn-${plant.id}" onclick="addToCart(${plant.id}, ${plant.price})" class="btn active rounded-4xl w-full text-white font-bold">Add to Cart</button>

                    </div>
                </div>
            </div> 
    
    `
   
    plantsContainer.append(plantsDiv);

    }

};
const loadPlantDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res =await fetch(url);
    const details = await res.json();
    displayModal(details.plants)

}

const displayModal = (plants)=>{
    console.log(plants)
    const detailsModal = document.getElementById('details-container');
    
    detailsModal.innerHTML=`
       <div class="flex gap-2">
             <div>
                <h2 class="text-black text-3xl font-bold">${plants.name}</h2>
                <img class="mt-3 h-[300px] rounded-sm " src="${plants.image}" alt="">
                <h2 class="text-black text-xl font-bold mt-3">${plants.category}</h2>
             </div>
             <br>
             <div class="w-1/2 justify-center items-center">
                <h2 class="text-black text-3xl font-bold">Description</h2>
                <p class="mt-3 font-semibold">${plants.description}</p>

                <h4 class="bg-green-300 text-center w-full rounded-xl mt-3 font-bold text-black">${plants.price}</h4>
                <h4 class="h-[70px]  bg-green-300 text-center w-full rounded-xl mt-3 font-bold text-black">গাছ লাগান পরিবেশ বাচান</h4>
             </div>
             
       </div>
    `;
    

    document.getElementById("plant_modal").showModal();
}

function cartTotal(id,price){
    const plantPrice = document.getElementById(`cart-price-${price}`).innerHTML
    console.log(plantPrice)
}

const addToCart = async (id) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  const plant = data.plants;
  const cartContainer = document.getElementById("cart-container");
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

  cartContainer.appendChild(cartItem);

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