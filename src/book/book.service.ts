import { Injectable, NotFoundException } from '@nestjs/common'
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

  async notFoundCheck(book: Book) {
    if (!book) throw new NotFoundException(`book not found.`)
    return book
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find()
  }

  async create(book: Book): Promise<Book> {
    return await this.bookModel.create(book)
  }

  async findById(id: string): Promise<Book> {
    return this.notFoundCheck(
      await this.bookModel.findById(id)
    )
  }

  async updateById(id: string, book: Book): Promise<Book> {
    return this.notFoundCheck(
      await this.bookModel.findByIdAndUpdate(id, book, {
        new: true,
        runValidators: true,
      })
    )
  }

  async deleteById(id: string): Promise<Book> {
    return this.notFoundCheck(
      await this.bookModel.findByIdAndDelete(id)
    )
  }
}
