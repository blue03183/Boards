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
    search_type?: string;
    search_keyword?: string;
    start?: number;
    limit?: number;
  }
}