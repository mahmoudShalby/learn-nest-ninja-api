import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import { BookService, error } from './book.service'
import { Book } from './schemas/book.schema'
import { createBookDto } from './dto/create-book.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll()
  }

  @Post('new')
  async create(@Body() book: createBookDto): Promise<Book> {
    return await this.bookService.create(book)
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() response) {
    await this.bookService.findById(id, response)
  }
}
