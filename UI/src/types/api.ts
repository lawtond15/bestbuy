export interface APIResponse<T> {
      message: string;
      content: T[]
  }

export interface CategoryRow {
      id: string,
      key_id: number,
      name: string
  }

export interface ProductRow{
      class: string,
      categories: string,
      customer_review_average: number,
      customer_review_count: number,
      id: number,
      name: string,
      regular_price: number,
      sale_price: number,
      sku: string,
      subclass: string,
      url: string
  }

export interface PipelineLogRow{
    date: Date,
    status: string
}