import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('.number');

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) =>{
  switch (action.type){
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};
const countStore = createStore(countModifier);

const onChage = () =>{
  number.innerText = countStore.getState();
}

countStore.subscribe(onChage);

console.log(countStore.getState());

add.addEventListener('click', () => {
  countStore.dispatch({type:ADD});
});

minus.addEventListener('click', () => {
  countStore.dispatch({type:MINUS});
});