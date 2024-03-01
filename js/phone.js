const loadPhone = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById(`phone-container`);
    phoneContainer.textContent = ``;

    // display show all button.......
    const showAllContainer = document.getElementById(`show-all-container`);
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove(`hidden`);
    }
    else{
        showAllContainer.classList.add(`hidden`);
    }



    // display only 10 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone =>{
        console.log(phone);
        const phoneCard = document.createElement(`div`);
        phoneCard.classList =`card bg-base-100  shadow-xl`
        phoneCard.innerHTML = `
         <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p><span>price:</span>bolbo na</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    }) 
    
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handale show details 
const handleShowDetail = async(id) => {
    // console.log(`korlam  click`, id);

    // load single load data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
   const phone = data.data;
    showPhoneDetails(phone);
}

// show modal details
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById(`show-details-phone-name`);
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById(`show-details-container`);
    showDetailsContainer.innerHTML = `
    <img class="items-center" src="${phone.image}" alt="">
    <P><span class="font-bold text-black">brand :</span>${phone.brand}</P>
    <P><span class="font-bold text-black">releaseDate:</span>${phone.releaseDate}</P>
    <P><span class="font-bold text-black">chipSet:</span>${phone?.mainFeatures?.chipSet}</P>

    <P><span class="font-bold text-black">displaySize:</span>${phone?.mainFeatures?.displaySize}</P>
    <P><span class="font-bold text-black">storage:</span>${phone?.mainFeatures?.storage}</P>
    <P><span class="font-bold text-black">sensors:</span>${phone?.mainFeatures?.sensors}</P>
    <P><span class="font-bold text-black">Bluetooth:</span>${phone?.others?.Bluetooth}</P>

    `
    
    my_modal_1.showModal();
}


const  handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById(`search-field`);
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll); 
}


// loading spinner

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById(`loading-spinner`);
    if(isLoading){
        loadingSpinner.classList.remove(`hidden`);
    }
    else{
        loadingSpinner.classList.add(`hidden`);
    }
}


// handle show all
const handleShowAll = () =>{
    handleSearch(true);

}
// loadPhone();