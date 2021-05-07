export interface Data {
  response: {
    result: string;
    message?: string;
  },
  params: {
    board_no: number;
    title: string;
    content: string;
    password: string; 
  }
}

export interface Board {
  password: string
}

export interface UpdateParams {
  title?: string;
  content?: string;
}