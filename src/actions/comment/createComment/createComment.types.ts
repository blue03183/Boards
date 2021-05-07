export interface Data {
  response: {
    result: string;
    message?: string
  },
  params: InserParams
}

export interface InserParams {
  board_no: number;
  pa_comment_no?: number;
  content: string;
  writer: string;
}