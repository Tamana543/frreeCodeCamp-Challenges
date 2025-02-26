const calorieCounter = document.getElementById("calorie-counter")
const budgetNumberInput = document.getElementById("budget")
const entryDropdown = document.getElementById("entry-dropdown")
const addEntryButton = document.getElementById("add-entry")
const clearButton = document.getElementById("clear")
const output= document.getElementById("output")

let isError = false;
function cleanInputString(str){
    // In regex, shorthand character classes allow you to match specific characters without having to write those characters in your pattern. Shorthand character classes are preceded with a backslash (\). The character class \s will match any whitespace character.
//   To tell the pattern to match each of these characters individually, you need to turn them into a character class. This is done by wrapping the characters you want to match in brackets
//  Regex can also take specific flags to alter the pattern matching behavior. Flags are added after the closing /. The g flag, which stands for "global", will tell the pattern to continue looking after it has found a match.
    // const regex = /[\+-\s]/;
    //     console.log("original string: ",str);
    const regex = /[+-\s]/g;
    return str.replace(regex,"")
  
}
function isInvalidInput(str){
     // Number inputs only allow the e to occur between two digits. To match any number, you can use the character class [0-9]. This will match any digit between 0 and 9.
// The + modifier in a regex allows you to match a pattern that occurs one or more times. 

    //  const regex = /[0-9]+e[0-9]+/i;    
    const regex = /\d+e\d+/i; //ShartCut For Above const
    return str.match(regex) // match is a methood for chicking the matchin eles

}
// console.log(isInvalidInput("1e3"));
// console.log(entryDropdown.value);
function addEntry(){
   const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`)
   const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1
   const HTMLString = `
   <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
   <input id="${entryDropdown.value}-${entryNumber}-name" type="text" placeholder="Name" />
   <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" min="0" placeholder="Calories" />
   `;
   targetInputContainer.insertAdjacentHTML("beforeend", HTMLString) ;
}
function calculateCalories(event) {
    event.preventDefault()
    isError = false;
    const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']")
    const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']")
    const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']")
    const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']")
    const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']")
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs)
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs)
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs)
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs)
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs)
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput])
    if(isError) {
        return
    }
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories +snacksCalories
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    let surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
    output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr/>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    
    `;
    output.classList.remove('hide')
}
function getCaloriesFromInputs(list) {
    let calories = 0
    for(const item of list) {
        const currVal = cleanInputString(item.value); 
        const invalidInputMatch = isInvalidInput(currVal)
        if(invalidInputMatch) {
            alert(`Invalid Input: ${invalidInputMatch[0]}`)
            isError = true;
            return null
        }  
        calories += Number(currVal)
        return calories;
    }
}
function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll(".input-container"));
   for (const container of inputContainers) {
    container.innerHTML = ``
   }
   budgetNumberInput.value = "";
   output.innerText = "";
output.classList.add("hide")
}
addEntryButton.addEventListener("click",addEntry)
calorieCounter.addEventListener("submit",calculateCalories)
clearButton.addEventListener("click",clearForm)