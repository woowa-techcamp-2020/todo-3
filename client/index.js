import Todo from 'Components/Todo/todo';
import Column from 'Components/Column/column';
import '@/global.css';
import Note from 'Components/Note/note';

const body = document.querySelector('body');
const todo = new Todo();
todo.mount(body);

const helloColumn = new Column(todo, { title: 'hello' });
helloColumn.addNote(new Note(helloColumn, { title: '하하', contents: '히히', writer: '호호' }));
helloColumn.addNote(new Note(helloColumn, { title: '하하2', contents: '히히2', writer: '호호2' }));
helloColumn.addNote(new Note(helloColumn, { title: '하하ㅊ', contents: '히히ㅊ', writer: '호호ㅊ' }));

const helloColumn2 = new Column(todo, { title: 'hello2' });
helloColumn2.addNote(new Note(helloColumn, { title: '하하3', contents: '히히3', writer: '호호3' }));
helloColumn2.addNote(new Note(helloColumn, { title: '하하4', contents: '히히4', writer: '호호4' }));
helloColumn2.addNote(new Note(helloColumn, { title: '하하4', contents: '히히4', writer: '호호4' }));
helloColumn2.addNote(new Note(helloColumn, { title: '하하4', contents: '히히4', writer: '호호4' }));
helloColumn2.addNote(new Note(helloColumn, { title: '하하4', contents: '히히4', writer: '호호4' }));

todo.addColumn(helloColumn);
todo.addColumn(helloColumn2);
