export interface Data {
  response: {
    result: 'success' | 'failure'
    message?: string
  },
  params: {
    title: string;
    content: string;
    writer: string;
    password: string; 
  }
}

export interface InsertResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}