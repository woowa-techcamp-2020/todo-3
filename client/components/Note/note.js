import { Component } from 'Components';
import { parseNoteText } from '@/utils';
import { editNote } from '@/api';
import './note.css';

export default class Note extends Component {
  /**
   * 노트 객체를 생성합니다.
   * @param {*} parent
   * @param {{title: string, content: string, writer: string} props
   */
  constructor(parent, props = {}) {
    super(parent, props, 'note');

    this.$noteTitle = this.$.querySelector('.note-title');
    this.$noteContent = this.$.querySelector('.note-content');
    this.$noteWriter = this.$.querySelector('.note-writer');
    this.$noteDeleteBtn = this.$.querySelector('.note-delete-btn');

    this.noteModal = this.getRootComponent().noteModal;

    this.$.addEventListener('dblclick', this.onDblClick.bind(this));
    this.$noteDeleteBtn.addEventListener('click', this.onNoteDeleteBtnClick.bind(this));

    const { text } = this.props;
    if (text) {
      const result = parseNoteText(text);
      this.props.title = result.title;
      this.props.content = result.content;
    }
    const {
      title, content, writerId,
    } = this.props;

    this
      .setTitle(title)
      .setContent(content)
      .setWriter(writerId);
  }

  onDblClick() {
    const { id } = this.props;
    this.noteModal.open({ title: this.title, content: this.content }, ({ text }) => {
      editNote(id, text).then(() => {
        const { title, content } = parseNoteText(text);
        this
          .setTitle(title)
          .setContent(content);
      });
    });
  }

  onNoteDeleteBtnClick() {
    this.getRootComponent().confirmModal.open(() => {
      this.parent.removeNote(this);
    });
  }

  setTitle(value) {
    this.title = value;
    this.$noteTitle.innerText = value;
    return this;
  }

  setContent(value) {
    this.content = value;
    this.$noteContent.innerText = value;
    return this;
  }

  setWriter(value) {
    this.writerId = value;
    this.$noteWriter.innerText = value;
    return this;
  }

  disguise(note) {
    this.$.innerHTML = note.$.innerHTML;
  }

  isVisible() {
    return !this.$.classList.contains('hidden');
  }

  mount(element) {
    super.mount(element);
  }

  render() {
    return `
      <div class="note-header">
          <div class="note-icon"><img/></div>
          <div class="note-title">제목</div>
              <button class="note-delete-btn">X</button>
          </div>
          <div class="note-body">
              <div class="note-content">내용</div>
          <div class="note-footer">Added by <span class="note-writer"></span></div>  
      </div>
    `;
  }
}
