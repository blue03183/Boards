import { Action } from "actionhero";
import { Data } from './boardList.types';

export class BoardList extends Action {
  constructor() {
    super();
    this.name = "boardList";
    this.description = "게시글을 조회합니다.";
    this.inputs = {
      board_no: { required: false },
      search_type: { 
        required: false,
        validator: (param: string) => {
          if (!['title', 'content'].includes(param)) {
            throw '검색구분은 제목 또는 내용으로만 설정 가능합니다.';
          }
        }
      },
      search_keyword: { required: false },
      start: { required: false },
      limit: { required: false }
    };
  }

  async run(data: Data ) {

    const { params } = { ...data };
    let limit = '';
    
    // 게시글 조회
    const wheres: string[] = [];

    if (params.board_no) {
      wheres.push(`board_no=${params.board_no}`);
    }

    if (params.search_keyword) {
      if (params.search_type) {
        wheres.push(`${params.search_type} LIKE '%${params.search_keyword}%'`);
      } else {
        wheres.push(`(title LIKE '%${params.search_keyword}%' OR content LIKE '%${params.search_keyword}%')`);
      }
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

    data.response = await api.db.query(`SELECT * FROM board WHERE ${wheres.join(' AND ')} ${limit};`);
  }
}
