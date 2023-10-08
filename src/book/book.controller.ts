import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BookService } from './book.service'
import { Book } from './schemas/book.schema'
import { createBookDto } from './dto/create-book.dto'
import { updateBookDto } from './dto/update-book.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll()
  }

  @Post()
  async create(@Body() book: createBookDto): Promise<Book> {
    return await this.bookService.create(book)
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.bookService.findById(id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() book: updateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateById(id, book)
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<Book> {
    return await this.bookService.deleteById(id)
  }
}
