import { createStore, combineReducers } from 'redux';

const ADD = "ADD";
const MINUS = "MINUS";

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

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

const toDoForm = document.getElementById('toDoForm');
const toDoInput = document.getElementById('toDoTxt');
const toDoUl = document.querySelector('.toDoList');

const addToDo = text => {
	return {
		type: ADD_TODO,
		text
	}
}

const deleteToDo = id => {
	return {
		type:DELETE_TODO,
		id
	}
}

const toDoReducer = (state = [], action) => {
	switch (action.type){
		case ADD_TODO:
			return [{text: action.text, id: Date.now() }, ...state];
		case DELETE_TODO:
			return state.filter(toDo => toDo.id !== action.id);
		default:
			return state;
	}
};

const reducers = combineReducers({
	countModifier,
	toDoReducer
});

const store = createStore(reducers);

const dispatchAddToDo = (text) =>{
	store.dispatch(addToDo(text));
}

const dispatchDeleteToDO = (e)=>{
	console.log(e.target.parentNode.id);
	const id = parseInt(e.target.parentNode.id);
	store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
	const toDos = store.getState().toDoReducer;
	toDoUl.innerHTML = '';
	console.log(toDos);
	toDos.forEach((toDo)=>{
		const li = document.createElement('li');
		const btn = document.createElement('button');
		btn.innerText = "DELETE";
		btn.setAttribute('type', 'button');
		btn.addEventListener('click', dispatchDeleteToDO);
		li.id = toDo.id;
		li.innerText = toDo.text + ' ';
		li.appendChild(btn);
		toDoUl.appendChild(li);
		
	});
}


const onSubmit = (e)=>{
	e.preventDefault();
	const toDo = toDoInput.value;
	toDoInput.value = '';
	dispatchAddToDo(toDo);
};

toDoForm.addEventListener('submit', onSubmit);

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('.number');

const onChage = () =>{
	number.innerText = store.getState().countModifier;
}

store.subscribe(()=>{
	onChage();
	console.log(store.getState());
	paintToDos();
});

console.log(store.getState());

add.addEventListener('click', () => {
	store.dispatch({type:ADD});
});

minus.addEventListener('click', () => {
	store.dispatch({type:MINUS});
});

