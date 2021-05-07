export interface Data {
  response: {
    board_no: number;
    title: string;
    content: string;
    writer: string;
    wdate: string;
    mdate: string;
    password: string;
  }[],
  params: {
    board_no?: number;
    comment_no?: number;
    start?: number;
    limit?: number;
  }
}