import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NOTFOUND } from 'dns';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('getAll return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('getOne return an Movie', () => {
      service.create({
        title: 'TEST',
        year: 2020,
        genres: ['action'],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.year).toEqual(2020);
    });

    it('should throw Exeption', () => {
      try {
        service.getOne(1111);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 1111 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('delete one Movie', () => {
      service.create({
        title: 'TEST',
        year: 2020,
        genres: ['action'],
      });

      const allMovie = service.getAll().length;
      service.deleteOne(1);
      const afterMovie = service.getAll().length;
      expect(afterMovie).toBeLessThan(allMovie);
    });

    it('Should throw Exception delete one movie', () => {
      try {
        service.deleteOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('create', () => {
      const beforeCount = service.getAll().length;
      service.create({
        title: 'TEST',
        year: 2020,
        genres: ['action'],
      });
      const afterCount = service.getAll().length;

      expect(afterCount).toBeGreaterThan(beforeCount);
    });
  });

  describe('update a movie', () => {
    it('should update movie information', () => {
      service.create({
        title: 'TEST',
        year: 2020,
        genres: ['action'],
      });

      service.update(1, { title: 'update movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update movie');
    });

    it('should throw NOTFoundExeption', () => {
      try {
        service.update(99, { title: 'update movie' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
