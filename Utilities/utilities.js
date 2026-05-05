const showLoader =() =>{
    document.getElementById("loader").classList.remove('hidden');
    document.getElementById("lesson-container").classList.add('hidden');
}
const hideLoader =() =>{
    document.getElementById("loader").classList.add('hidden');
    document.getElementById("lesson-container").classList.remove('hidden');
}