// lesson btn fetch

const getBtnData =()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=>res.json())
    .then((data)=>displayLessonBtn(data.data))
}
// [
//     {
//         "id": 101,
//         "level_no": 1,
//         "lessonName": "Basic Vocabulary"
//     },
//     {
//         "id": 102,
//         "level_no": 2,
//         "lessonName": "Everyday Words"
//     },
//     {
//         "id": 103,
//         "level_no": 3,
//         "lessonName": "Intermediate Vocabulary"
//     },
//     {
//         "id": 104,
//         "level_no": 4,
//         "lessonName": "Advanced Vocabulary"
//     },
//     {
//         "id": 105,
//         "level_no": 5,
//         "lessonName": "Complex Words"
//     },
//     {
//         "id": 106,
//         "level_no": 6,
//         "lessonName": "Mastering Vocabulary"
//     },
//     {
//         "id": 107,
//         "level_no": 7,
//         "lessonName": "Mastering Vocabulary"
//     }
// ]

const displayLessonBtn=(objects)=>{
    const lessonBtnDiv = document.getElementById('lesson-btns');
    for(const object of objects) {
        let btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <div id="object.id"
            class="flex gap-2 py-3 px-5 border-1 border-[#422AD5] rounded-md text-[#422AD5] hover:bg-[#422AD5] hover:text-white hover:[&>img]:brightness-0 hover:[&>img]:invert"
          >
            <img class="w-4 object-contain" src="assets/fa-book-open.png" />
            <h2 class="text-sm font-semibold">Lesson -${object.level_no}</h2>
          </div>
        `
        lessonBtnDiv.append(btnDiv);
    }

    
}


getBtnData();