import { Action } from "actionhero";
import { Data } from './createBoard.types';

export class CreateBoard extends Action {
  constructor() {
    super();
    this.name = "createBoard";
    this.description = "게시글을 생성합니다.";
    this.inputs = {
      title: { required: true },
      content: { required: true },
      writer: { required: true },
      password: { required: true }
    };
  }

  async run(data: Data ) {

    const insertParam = {
      title: data.params.title,
      content: data.params.content,
      writer: data.params.writer,
      password: data.params.password
    }
    const res = await api.db.query('INSERT INTO board SET ?', insertParam);
    
    if (res.insertId) {      
      data.response = {
        result: 'success'
      };
    } else {
      data.response = {
        result: 'failure',
        message: '게시글 등록에 실패하였습니다.'
      };
    }
  }
}
