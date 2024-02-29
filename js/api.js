const loadHub = async (searchText='c', isShowAll) =>{
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json()
    // console.log(data.data.tools)
    const hubs = data.data.tools.filter(item=> item.name.toLowerCase().includes(searchText.toLowerCase()));
    // console.log(hubs)
   
    displayHub(hubs, isShowAll)
}

const displayHub =(hubs, isShowAll) =>{
    // 1 container
    // console.log(hubs)
    const hubContainer = document.getElementById('main-container')
    //  blank dile search input clear hoye jabe 
    hubContainer.textContent = '';

    // console.log(hubs.length);

    // showall btn and hidden btn
    const showAllbtn = document.getElementById('show-all-container')
    if(hubs.length > 2 && !isShowAll){
        showAllbtn.classList.remove('hidden')
    }
    else{
        showAllbtn.classList.add('hidden')
    }
   
    if(!isShowAll){
        hubs = hubs.slice(0, 3)
    }
   
    // 2 create div
    hubs.forEach(hub =>{
        // console.log(hub)
        const hubCard = document.createElement('div');
      
        hubCard.classList = `
        card w-96 bg-base-100 shadow-xl
        `
        hubCard.innerHTML = `
        
        <img src="${hub.image}" alt="">
        <div class="card-body">
            <h1>Feature</h1>
            <h1>1.${hub.features[0]}</h1>
            <h1>2.${hub.features[1]}</h1>
            <h1>3.${hub.features[2]}</h1>
          <h2 class="card-title">${hub.name}</h2>

          <p>${hub.published_in}</p>
          <div class="card-actions justify-end">
          <button onClick="singlePhoneDetail('${hub.id}')" class="btn  btn-secondary">-></button>
    </div>
         
        </div>
        `;
        hubContainer.appendChild(hubCard);
    })
    // hide loading spinner
    loadingSpinner(false)
}
// single data load data
const singlePhoneDetail = async(id) =>{
    console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const hub = data;
    // console.log(data)
   singleHubDetail(hub);
}

const singleHubDetail = (hub) =>{
    console.log(hub)
    const hubName = document.getElementById('show-hub-name');
    hubName.innerText = hub.data.tool_name;
    const showContainer = document.getElementById('show-hub-detail-contain');
    showContainer.innerHTML = `
    <h1 class="font-bold">${hub.data.description}</h1>
    <h1 class="font-extralight">HUB id: ${hub.data.id}</h1>
   
    <div class="flex">

    <div>
    <h2>Features</h2>
    <p>${hub.data.features[1].feature_name}</p>
    <p>${hub.data.features[2].feature_name}</p>
    <p>${hub.data.features[3].feature_name}</p></div>
    <div>
    <h2>Integration</h2>
    <p>${hub.data.integrations[0]}</p>
    <p>${hub.data.integrations[1]}</p>
    <p>${hub.data.integrations[2]}</p>
    </div>
    </div>
    </div>
       

    <div class="flex border-spacing-1 border-orange-600 rounded-md p-1  gap-1 text-2xl">
   <div class="border border-b-orange-600 rounded-md p-5 m-2  text-xl"> <p>${hub.data.pricing[0].price}</p></div>
   <div class="border border-b-orange-600 rounded-md p-5 m-2 text-xl"><p>${hub.data.pricing[1].price} </p></div>
   <div class="border border-b-orange-600 rounded-md p-5 m-2 text-xl"><p>${hub.data.pricing[2].price}</p></div>
    </div>

 
 

    `
    const hubImage = document.getElementById('show-img');
    hubImage.innerHTML=`
    <div>  <img src= "${hub.data.image_link[0]}"></img></div>
  
    `
    // modal
    my_modal.showModal();
}

// handle search button
const handleSearch =(isShowAll) =>{
    loadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    console.log(searchText);
   loadHub(searchText, isShowAll)
}

const loadingSpinner =(isLoading) =>{
    const spinnerLoad = document.getElementById('spinner-loading');
    if(isLoading){
        spinnerLoad.classList.remove('hidden')
    }
    else{
        spinnerLoad.classList.add('hidden')
    }
}
const handleShowall = () =>{
    handleSearch(true)
}

loadHub()