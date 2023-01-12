import { PartialType } from '@nestjs/mapped-types';
import { createMovieDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(createMovieDTO) {}
