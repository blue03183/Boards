import { Action } from "actionhero";
import { Data } from './commentList.types';

export class CommentList extends Action {
  constructor() {
    super();
    this.name = "commentList";
    this.description = "댓글을 조회합니다.";
    this.inputs = {
      comment_no: { required: false },
      board_no: { required: false },
      start: { required: false },
      limit: { required: false }
    };
  }

  async run(data: Data ) {

    const { params } = { ...data };
    let limit = '';

    const wheres: string[] = [];

    if (params.comment_no) {
      wheres.push(`comment_no=${params.comment_no}`);
    }
    if (params.board_no) {
      wheres.push(`board_no=${params.board_no}`);
    }

    if (params.limit) {
      if (!params.start) {
        params.start = 0;
      }

      limit = ` limit ${params.start}, ${params.limit}`;
    }

    if (!wheres.length) {
      wheres.push('1');
    }

    data.response = await api.db.query(`SELECT * FROM comment WHERE ${wheres.join(' AND ')} ${limit};`);
  }
}
