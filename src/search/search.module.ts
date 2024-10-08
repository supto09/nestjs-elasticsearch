import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {
  ELASTIC_CONFIG_KEY,
  ElasticConfigType,
} from '@/config/configs/elastic.config';
import UserSearchService from '@/search/services/user-search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => {
        const elasticConfig =
          configService.getOrThrow<ElasticConfigType>(ELASTIC_CONFIG_KEY);

        return {
          node: elasticConfig.url,
          auth: {
            username: elasticConfig.username,
            password: elasticConfig.password,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [UserSearchService],
  exports: [UserSearchService],
})
export class SearchModule {}
