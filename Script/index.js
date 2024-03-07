console.log('Astaghfirullah');

const loadPhones = async (inputText='13',isShowAll)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
   const data = await res.json();
  const phones = data.data ;
  if(phones.length>0){
    notMatchSearch(false);
   }else{
     notMatchSearch(true);
   }
  displayPhones(phones,isShowAll)

}

const notMatchSearch =(isNotMatch)=>{
    const notMatchSearchAlert = document.getElementById('search-not-match');
    if(isNotMatch){
      notMatchSearchAlert.classList.remove('hidden');
    }else{
      notMatchSearchAlert.classList.add('hidden');
    }
}







const displayPhones = (phones,isShowAll)=>{
  // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
     phoneContainer.textContent = '';
     const showAllButton = document.getElementById('show-all-btn');
      if(phones.length >12 && !isShowAll){
        showAllButton.classList.remove('hidden');
      }
      else{
        showAllButton.classList.add('hidden')
      }
      if(!isShowAll) {phones = phones.slice(0,12)}

      
  phones.forEach(phone => {
    // console.log(phone)
    const phoneCard = document.createElement('div');
    phoneCard.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">

    <h2 class="card-title text-3xl font-bold text-green-600 my-4">${phone.brand}</h2>
    <h2 class="card-title text-3xl font-bold">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <h2 class='font-bold text-3xl text-blue-950 mb-3'>$ 999</h2>
    <div class="card-actions">
      <button class="btn btn-primary font-bold" onclick="showDetailsButtonHandler('${phone.slug}')">Show Details</button>
    </div>
  </div>
</div>
    `
    phoneContainer.appendChild(phoneCard)

})


      
  loadingSpinnerHandler(false);
}


const loadingSpinnerHandler = (isLoading)=>{
  const loadingSpinner =document.getElementById('loading-spinner');
   if(isLoading){
              loadingSpinner.classList.remove('hidden');
   }else{
    loadingSpinner.classList.add('hidden');
   }

}


const searchHandler = (isShowAll)=>{
  // console.log('Alhamdulillah')
loadingSpinnerHandler(true);

  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;
  inputField.value = '';
  //  console.log(inputText);
  setTimeout(() => {
    loadPhones(inputText,isShowAll);
  },2000);
   
  
}

const showAllButtonHandler = ()=>{
  // console.log('InshaAllAH');
  searchHandler(true);
}

const showDetailsButtonHandler = async (id)=>{
  // console.log('Subhan-Allah')
 
const  res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
const phone = data.data;
console.log(phone) 

  showDetailsPhone(phone)
}

const showDetailsPhone =(phone)=>{
  show_details.showModal()
  const modalContainer = document.getElementById('modal-container');
  //  const sensorsContainer = document.getElementById('Sensors-container')
  // const sensorList = phone.mainFeatures.sensors.forEach(item=>{
  //   const li = document.createElement('li');
  //   li.innerText = item;
  //   sensorsContainer.appendChild(li);
    
  //  })
  //  console.log(sensorList);
  modalContainer.innerHTML =`
  <div class='flex flex-row gap-4 items-center'>

  
  <div class='w-[65%]'>
  <h2 class='text-2xl font-bold text-blue-900 my-5'>${phone.name}</h2>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <p class='my-2'><span class="font-bold">Storage: </span> ${phone.mainFeatures.storage}</p>
  <p class='my-2'><span class="font-bold">Memory: </span> ${phone.mainFeatures.memory}</p>
  <p class='my-2'><span class="font-bold">Display-Size: </span> ${phone.mainFeatures.displaySize}</p>
  <p class='my-2'><span class="font-bold">chipset: </span> ${phone.mainFeatures.chipSet}</p>
  

  </div>

  <div class='w-[30%]'><img src="${phone.image}" ></div>

  </div>
                              
  `
  
}

loadPhones();

