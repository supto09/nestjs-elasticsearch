import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserIndexDto } from '@/search/dto/user-index.dto';
import { SearchQueryDto } from '@/search/dto/search.dto';

@Injectable()
export default class UserSearchService {
  private index = 'users';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexUser(user: UserIndexDto) {
    return this.elasticsearchService.index({
      index: this.index,
      id: `${user.id}`,
      document: user,
    });
  }

  async removeIndex(userId: number) {
    return this.elasticsearchService.delete({
      index: this.index,
      id: `${userId}`,
    });
  }

  async search(userSearchQuery: SearchQueryDto) {
    const { searchText, sortBy, order, page = 0, size = 10 } = userSearchQuery;

    return this.elasticsearchService.search({
      index: this.index,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: searchText || '*', // Full-text search
                fields: ['firstName^3', 'lastName^3', 'email'],
                type: 'best_fields',
                fuzziness: 'AUTO',
                max_expansions: 50,
                operator: 'or',
              },
            },
            {
              bool: {
                should: [
                  {
                    wildcard: {
                      firstName: {
                        value: `*${searchText || '*'}*`, // Wildcard for partial match on firstName
                        boost: 3, // Optional: boost relevance for this field
                      },
                    },
                  },
                  {
                    wildcard: {
                      lastName: {
                        value: `*${searchText || '*'}*`, // Wildcard for partial match on lastName
                        boost: 2, // Optional: boost relevance for this field
                      },
                    },
                  },
                  {
                    wildcard: {
                      email: {
                        value: `*${searchText || '*'}*`, // Wildcard for partial match on email
                        boost: 1, // Optional: boost relevance for this field
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      sort: sortBy ? [{ [sortBy]: { order: order || 'asc' } }] : [],
      from: page * size, // Pagination: start index
      size, // Pagination: number of results per page
    });
  }
}
