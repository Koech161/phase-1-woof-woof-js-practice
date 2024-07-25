document.addEventListener('DOMContentLoaded',()=>{

    const dogs=document.getElementById('dog-bar')

    
        fetch('http://localhost:3000/pups')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            //dogs.textContent=data.pup.name
            data.forEach(pup=>{
                const span=document.createElement('span')
                
                span.textContent=pup.name

                span.addEventListener('click',()=> displayPupsInfo(pup))
                dogs.append(span)
            })
            
        })
    

function displayPupsInfo(pup){
const dogInfo=document.getElementById('dog-info')
dogInfo.innerHTML=''
const div=document.createElement('div')
 dogInfo.append(div)
const img=document.createElement('img')
img.src=pup.image
div.append(img)

const h2=document.createElement('h2')
h2.textContent=pup.name
div.append(h2)

const button=document.createElement('button')
button.textContent=pup.isGoodDog ? 'Good Dog' : 'Bad Dog'
div.append(button)
button.addEventListener('click',()=>tooglePup(pup,button))
}

function tooglePup(pup,button){
    pup.isGoodDog=!pup.isGoodDog

    button.textContent=pup.isGoodDog ? 'Good Dog' : 'Bad Dog'

    fetch(`http://localhost:3000/pups/${pup.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({isGoodDog: pup.isGoodDog})
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);

       
       
    })
}

const filterBtn=document.getElementById('good-dog-filter')
filterBtn.addEventListener('click',()=>{  
    filterBtn.textContent= 'Filter good Dog : ON'
    fetch('http://localhost:3000/pups/?isGoodDog=true')
    .then(res => res.json())
    .then(filteredDogs => {
        console.log(filteredDogs);
        dogs.innerHTML = ''; // Clear the dog-bar
        filteredDogs.forEach(pup => {
            const span = document.createElement('span');
            span.textContent = pup.name;
            span.addEventListener('click', () => displayPupsInfo(pup));
            dogs.append(span);
        });
    });
});


 
    

})