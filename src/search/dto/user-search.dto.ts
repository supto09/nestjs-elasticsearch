export class UserSearchQueryDto {
  searchText?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  page?: number = 0;
  size?: number = 10;
}
