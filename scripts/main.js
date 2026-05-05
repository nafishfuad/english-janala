
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const getLessonDetails=(cardID) =>{
  
  fetch(`https://openapi.programming-hero.com/api/word/${cardID}`)
  .then((res) => res.json())
    .then((data) => showVideoLesson(data.data));
}
const showVideoLesson =(details)=>{
  document.getElementById('card_details').showModal();
  const modalDetails = document.getElementById('modal-details');
  modalDetails.innerHTML =`
  <h2 class="text-3xl font-semibold mb-8 flex">${details.word} (<img class="w-8 object-contain" src="https://img.icons8.com/?size=50&id=9622&format=png">:${details.pronunciation})</h2>
          <p class="text-xl font-semibold mb-3">Meaning</p>
          <p class="text-xl font-medium mb-8">${details.meaning === null? 'অর্থ নেই': details.meaning}</p>
          <p class="text-xl font-semibold mb-2">Example</p>
          <p class="text-xl font-normal mb-8">${details.sentence}</p>
          <p class="text-xl font-medium">সমার্থক শব্দ গুলো</p>
          <div>

          </div>`
  
}


const getBtnData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessonBtn(data.data));
};
const getWordsCard = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => displayLessonCards(data.data));
};
const loadLessonByLevel = (id) => {
  showLoader();
  document.getElementById("lesson-container").innerHTML = "";
  const allLessonBtn = document.getElementsByClassName('lesson-btn');
  for (const btn of allLessonBtn) {
    btn.classList.remove('active','[&>img]:brightness-0',"[&>img]:invert");
  }
  document.getElementById(`lesson-btn-${100+id}`).classList.add('active','[&>img]:brightness-0',"[&>img]:invert");
  getWordsCard(id);
};


const displayLessonBtn = (objects) => {
  const lessonBtnDiv = document.getElementById("lesson-btns");
  for (const object of objects) {
    let btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <div id="lesson-btn-${object.id}" onclick="loadLessonByLevel(${object.level_no});"
            class="lesson-btn flex gap-2 py-3 px-5 border-1 border-[#422AD5] rounded-md text-[#422AD5] hover:bg-[#422AD5] hover:text-white hover:[&>img]:brightness-0 hover:[&>img]:invert"
          >
            <img class="w-4 object-contain" src="assets/fa-book-open.png" />
            <h2 class="text-sm font-semibold">Lesson -${object.level_no}</h2>
          </div>
        `;
    lessonBtnDiv.append(btnDiv);
  }
};

const displayLessonCards = (cards) => {

  const cardContainer = document.getElementById("lesson-container");

  if(cards.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.innerHTML=`
          <div class="w-full py-8 flex flex-col items-center">
              <img class="w-24 object-contain mb-8" src="assets/alert-error.png">
              <p class="text-sm font-normal text-[#79716B] mb-3">
                এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
              </p>
              <h3 class="font-medium text-3xl">নেক্সট Lesson এ যান</h3>
            </div>
            `
    cardContainer.append(emptyMessage);
  }
  
  const cardsDiv = document.createElement("div");
  cardsDiv.classList =
    "lesson-card-container grid grid-cols-4 gap-5 w-full px-5 py-4";
  cardsDiv.id = "cards-container";
  cardContainer.append(cardsDiv);
  for (const card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.id = "card";
    cardDiv.innerHTML = `
        <div class="w-full flex flex-col items-center justify-center bg-white rounded-lg py-8 px-12">
              <h2 class="text-3xl font-bold">${card.word}</h2>
              <p class="text-lg font-normal text-gray-500 mt-1">Meaning / pronunciation</p>
              <p class="text-xl font-medium mt-2">${card.meaning === null? 'অর্থ নেই': card.meaning} / ${card.pronunciation}</p>
              <div class="lesson-card-icons flex justify-between w-full mt-8">
                <div onclick="getLessonDetails(${card.id})" class="btn px-4 py-3 rounded-md bg-[#1A91FF15] border-1 border-gray-200 hover:shadow-sm hover:border-gray-300">
                  <img class="w-5 object-contain brightness-0" src="assets/fa-circle-question.png">
                </div>
                <div onclick="pronounceWord('${card.word}')" class="btn px-4 py-3 rounded-md bg-[#1A91FF15] border-1 border-gray-200 hover:shadow-sm hover:border-gray-300">
                  <img class="w-5 object-contain brightness-0" src="https://img.icons8.com/?size=50&id=11475&format=png">
                </div>
              </div>
            </div>
        `;
    cardsDiv.append(cardDiv);
  }
   hideLoader();
};

getBtnData();

