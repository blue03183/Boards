import { Action } from "actionhero";
import { Data, Board } from './deleteBoard.types';

export class DeleteBoard extends Action {
  constructor() {
    super();
    this.name = "deleteBoard";
    this.description = "게시글을 삭제합니다.";
    this.inputs = {
      board_no: { required: true },
      password: { required: true }
    };
  }

  async run(data: Data ) {

    const returnData = {
      result: 'failure',
      message: ''
    }

    // 게시글 조회
    const boards: Board[] = await api.db.query(`SELECT password FROM board WHERE board_no=${data.params.board_no};`);

    if (!boards.length) {
      returnData.message = '게시글이 확인되지 않습니다. 게시글 번호를 확인하여 주십시오.';
    } else if (boards[0].password !== data.params.password) {
      returnData.message = '게시글의 비밀번호가 일치하지 않습니다.';
    } else {
      const res = await api.db.query(`DELETE FROM board WHERE board_no=${data.params.board_no};`);

      if(res.affectedRows) {
        returnData.result = 'success';
      } else {
        returnData.message = '게시글의 삭제에 실패하였습니다.';
      }
    }

    data.response = returnData;

  }
}
