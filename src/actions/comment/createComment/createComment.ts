import { Action } from "actionhero";
import { Data, InserParams } from './createComment.types';

export class CreateComment extends Action {
  constructor() {
    super();
    this.name = "createComment";
    this.description = "게시글에 댓글을 등록합니다.";
    this.inputs = {
      board_no: { required: true },
      pa_comment_no: { required: false },
      content: { required: true },
      writer: { required: true }
    };
  }

  async run(data: Data ) {
    const insertParam: InserParams = {
      board_no: data.params.board_no,
      content: data.params.content,
      writer: data.params.writer
    }

    if (data.params.pa_comment_no) {
      insertParam.pa_comment_no = data.params.pa_comment_no;
    }

    const res = await api.db.query('INSERT INTO comment SET ?', insertParam);

    if (res.insertId) {      
      data.response = {
        result: 'success'
      };
    } else {
      data.response = {
        result: 'failure',
        message: '댓글 등록에 실패하였습니다.'
      };
    }
  }
}
