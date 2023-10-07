import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Book } from './schemas/book.schema'
import { Model } from 'mongoose'

export type error = { error: string }

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find()
  }

  async create(book: Book): Promise<Book> {
    return await this.bookModel.create(book)
  }

  async findById(id: string, response: any) {
    try {
      response.status(200).send(await this.bookModel.findById(id))
    } catch (error) {
      response.status(400).send({ error: `book with id doesn't exist.` })
    }
  }
}
