import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserDto } from '@/search/dto/user.dto';
import { UserSearchQueryDto } from '@/search/dto/user-search.dto';

@Injectable()
export default class UserSearchService {
  private index = 'users';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexUser(user: UserDto) {
    return this.elasticsearchService.index({
      index: this.index,
      id: `${user.id}`,
      document: user,
    });
  }

  async search(userSearchQuery: UserSearchQueryDto) {
    const { searchText, sortBy, order, page = 0, size = 10 } = userSearchQuery;

    return this.elasticsearchService.search({
      index: this.index,
      query: {
        multi_match: {
          query: searchText || '*', // Use searchText or wildcard
          fields: ['firstName', 'lastName', 'email'],
          fuzziness: 'AUTO',
        },
      },
      sort: sortBy ? [{ [sortBy]: { order: order || 'asc' } }] : [],
      from: page * size, // Pagination: start index
      size, // Pagination: number of results per page
    });
  }
}
