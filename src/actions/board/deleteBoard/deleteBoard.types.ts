export interface Data {
  response: {
    result: string;
    message?: string
  },
  params: {
    board_no: number;
    password: string;
  }
}

export interface Board {
  password: string
}