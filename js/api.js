const loadHub = async (searchText='gpt', isShowAll) =>{
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json()
    // console.log(data.data.tools)
    const hubs = data.data.tools.filter(item=> item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log(hubs)
   
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
        console.log(hub)
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
          <button class="btn  btn-secondary">-></button>
    </div>
         
        </div>
        `;
        hubContainer.appendChild(hubCard);
    })
    // hide loading spinner
    loadingSpinner(false)
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