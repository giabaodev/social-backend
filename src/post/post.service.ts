import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const result = await this.postRepository.create(createPostDto);
    console.log('created post', result);
    return result;
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post | null> {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // await this.postRepository.update();
    return 'Post updated';
  }

  async delete(id: number) {
    const result = await this.postRepository.delete({ id });
    console.log(result);
    return 'Delete successfully';
  }
}
