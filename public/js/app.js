
const weatherForm =document.querySelector('form')
const search =document.querySelector('input')
const meesageOne=document.querySelector('#message-1')
const meesagetwo=document.querySelector('#message-2')
const img=document.querySelector('img')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    meesageOne.textContent='Loading...'
    meesagetwo.textContent=''
    img.src=''
    fetch('/weather?address='+location).then((response)=>{
    
        response.json().then((data)=>{
            if(data.error){
                meesageOne.textContent=data.error
            }
            else{
                meesageOne.textContent=data.location
                meesagetwo.textContent=data.forecast
    
               // img.src="/img/download.jpg"
            }
            
        }) 
    
})

})