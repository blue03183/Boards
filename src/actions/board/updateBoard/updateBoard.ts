import { Action } from "actionhero";
import { Data, Board, UpdateParams } from './updateBaord.types';
import * as mysql from 'mysql2';

export class UpdateBoard extends Action {
  constructor() {
    super();
    this.name = "updateBoard";
    this.description = "게시글을 수정합니다.";
    this.inputs = {
      board_no: { required: true },
      title: { required: false },
      content: { required: false },
      password: { required: true }
    };
  }

  async run(data: Data ) {

    const returnData = {
      result: 'failure',
      message: ''
    }

    if (!data.params.content && !data.params.title) {
      returnData.message = '수정할 내용이 없습니다. 수정할 제목, 또는 내용을 입력해주십시오.';
    } else {
      const boards: Board[] = await api.db.query(`SELECT password FROM board WHERE board_no=${data.params.board_no};`);

      if (!boards.length) {
        returnData.message = '게시글이 확인되지 않습니다. 게시글 번호를 확인하여 주십시오.';
      } else if (boards[0].password !== data.params.password) {
        returnData.message = '게시글의 비밀번호가 일치하지 않습니다.';
      } else {
        const updateParams: UpdateParams = {};

        if (data.params.title) {
          updateParams.title = data.params.title;
        }
        if (data.params.content) {
          updateParams.content = data.params.content;
        }

        const res = await api.db.query(
          'UPDATE board SET ? WHERE board_no=?;',
          [updateParams, data.params.board_no]);
  
        if(res.affectedRows) {
          returnData.result = 'success';
        } else {
          returnData.message = '게시글 수정에 실패하였습니다.';
        }
      }
    }
    
    data.response = returnData;
  }
}
