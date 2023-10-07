import { Category } from "../schemas/book.schema"

export class createBookDto {
  readonly name: string
  readonly description: string
  readonly author: string
  readonly price: number
  readonly category: Category
}
