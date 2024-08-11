export interface ApiResponse<Data> {
  message: string
  data?: Data
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface FailureResponse<Data> {
  message: string
  data?: Data
}
