
const loadlesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displaylessons(json.data))
}

// for remove active 

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons)

    lessonButtons.forEach(btn => btn.classList.remove("active"))
}

// for words
const loadLevelWord = (id) => {


   const url = `https://openapi.programming-hero.com/api/level/${id}`

   fetch(url)
   .then(res => res.json())
   .then(data =>{
    removeActive(); //remove all active class 
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    
    clickBtn.classList.add("active") // add active clss 
    displayLevelWord(data.data)
   });
};

const displayLevelWord = (words) => {
   // 1.get the container & empty
      
    const wordContainer = document.getElementById("word-container");
    
    wordContainer.innerHTML = "";
    if(words.length==0){
        wordContainer.innerHTML = `
           <div class="text-center   col-span-full rounded-xl py-10 space-y-6">
        
           <img class="mx-auto" src="./assets/alert-error.png"/>


            <p class="font-bangla  text-xl font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        
        `;
    }

    //2. for every
    
    words.forEach(word =>{
        console.log(word)

    //  3. div
    const card = document.createElement("div");
    card.innerHTML = `
         
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
            <h2 class="font-bold text-xl">${word.word ? word.word: "No word available"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

            <div class="font-medium font-bangla text-2xl">"${word.meaning ? word.meaning : "No meaning available"} / ${word.pronunciation ? word.pronunciation: "No pronunciation available"}"</div>
            <div class="flex justify-between items-center">
               <!-- info btn -->
                <button onclick="my_modal_4.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
    
                 <!--  -->
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
    
    `

    wordContainer.append(card)
    })

}


// for all lessons
const displaylessons = (lessons) => {
   
    // 1.get the container & empty
      
    const levelContainer = document.getElementById("level-container");

    levelContainer.innerHTML = "";
    // 2. get into every lessons
    
    for(let lesson of lessons ){

        // 3.create element
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML =`
                   <button id = "lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class= "btn btn-outline btn-primary lesson-btn" ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        
        `


        // 4. append
        levelContainer.append(btnDiv)
    }

};

loadlesson();
