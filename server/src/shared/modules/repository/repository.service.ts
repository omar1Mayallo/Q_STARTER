import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/database/database.provider';
import {
  LONG_FILTERING_DATE_FORMAT_REGEX,
  SHORT_FILTERING_DATE_FORMAT_REGEX,
} from 'src/shared/constants/regexs';
import { TableKeys } from 'src/shared/constants/tables';
import { GetAllResponse, PaginationDetails } from './repository.types';
import { CustomReqQuery } from './types/custom-req-query.types';

@Injectable()
export class RepositoryService<Model> {
  constructor(
    @Inject(KNEX_CONNECTION)
    private readonly knex: Knex,
  ) {}

  /**
   * Retrieves a single record from the database based on the specified criteria.
   *
   * @param {TableKeys} tableName - The name of the database table.
   * @param {Partial<Model>} conditions - The conditions to filter the record.
   * @param {Object} options - Additional options for the query.
   * @param {string[]} options.selectOptions - The columns to select in the query.
   * @param {boolean} options.withSoftDeleted - Indicates whether to include soft-deleted records.
   * @param {boolean} options.withNotFoundError - Indicates whether to throw a NotFoundException if the record is not found.
   * @returns {Promise<Model>} - The retrieved record.
   */
  async getOne(
    tableName: TableKeys,
    conditions: Partial<Model>,
    options: {
      selectOptions?: (keyof Model)[];
      withSoftDeleted?: boolean;
      withNotFoundError?: boolean;
    } = {
      withSoftDeleted: true,
      withNotFoundError: true,
    },
  ): Promise<Model> {
    // __________ INIT_QUERY __________ //
    let query = this.knex<Model>(tableName).where(conditions);

    // Apply column selection if specified
    if (options?.selectOptions) {
      query = query.select(options.selectOptions);
    }

    // Apply soft-deleted filter if specified
    if (!options.withSoftDeleted) {
      query.andWhere('deleted_at', null);
    }

    // ____________ EXECUTE QUERY ____________ //
    const result = await query.first();

    // Check if the record is not found and throw NotFoundException if required
    if (options?.withNotFoundError && !result) {
      throw new NotFoundException('This Record Not Found');
    }

    return result as Model;
  }

  /**
   * Retrieves records from the database based on the specified criteria.
   *
   * @param {TableKeys} tableName - The name of the database table.
   * @param {CustomReqQuery} reqQuery - The query parameters for filtering, sorting, and pagination.
   * @param {Object} options - Additional options for the query.
   * @param {boolean} options.withSoftDeleted - Indicates whether to include soft-deleted records (default: true).
   * @param {boolean} options.withDefaultSort - Indicates whether to apply default sorting (default: true).
   * @returns {Promise<{ data: any[], paginationDetails: PaginationDetails }>} - The query result along with pagination details.
   */
  async getAll(
    tableName: TableKeys,
    reqQuery: CustomReqQuery,
    options: {
      withSoftDeleted?: boolean;
      withDefaultSort?: boolean;
    } = { withSoftDeleted: true, withDefaultSort: true },
  ): Promise<GetAllResponse<Model>> {
    // __________ INIT_QUERY __________ //
    const queryBuilder = this.knex<Model>(tableName);

    // [1] Apply FILTERING, SORTING, FIELDS_SELECTING, PAGINATION and SEARCHING
    this.applyFilters(reqQuery, queryBuilder, options.withSoftDeleted);
    this.applySearching(reqQuery, queryBuilder);

    // https://github.com/knex/knex/issues/209
    const countQuery = queryBuilder.clone();
    const numOfRows: { count: string }[] = await countQuery.count();
    const totalNumOfItems = +numOfRows[0].count;
    this.applySorting(reqQuery, queryBuilder, options.withDefaultSort);
    this.applyFieldsSelection(reqQuery, queryBuilder);
    this.applyPagination(reqQuery, queryBuilder);

    // [2] Calculate Pagination Details
    const paginationDetails = this.calculatePaginationDetails(
      reqQuery,
      totalNumOfItems,
    );

    // ____________ EXECUTE QUERY ____________ //
    const data = (await queryBuilder) as Model[];

    return {
      data,
      paginationDetails,
    };
  }

  /**
   * Delete one or more records by their IDs.
   *
   * @param {TableKeys} tableName - The name of the database table.
   * @param {number[]} ids - The array of IDs to delete.
   * @param {Object} options - Additional options for the delete operation.
   * @param {boolean} options.softDeleted - Indicates whether to perform a soft delete, setting the 'deleted_at' field to the current date (default: false).
   * @throws {NotFoundException} - If any ID does not exist in the database.
   */
  async deleteByIds(
    tableName: TableKeys,
    ids: number[],
    options: { softDeleted?: boolean } = { softDeleted: false },
  ) {
    // [1] Check if any ID does not exist in the database
    const existingIds = (await this.knex<Model>(tableName)
      .select('id')
      .whereIn('id', ids)) as { id: number }[];

    const nonExistingIds = ids.filter(
      (id) => !existingIds.some((existingId) => existingId.id === id),
    );

    if (nonExistingIds.length > 0) {
      throw new NotFoundException(
        `Record(s) with ID(s) ${nonExistingIds.join(', ')} not found`,
      );
    }

    // [2] Handle Soft Delete
    if (options.softDeleted) {
      await this.knex(tableName)
        .whereIn('id', ids)
        .update('deleted_at', new Date());
    }
    // [3] Handle Hard Delete
    else {
      await this.knex(tableName).whereIn('id', ids).del();
    }
  }

  /**
   * Updates a single record in the database based on the specified criteria.
   *
   * @param {TableKeys} tableName - The name of the database table.
   * @param {Partial<Model>} conditions - The conditions to filter the record.
   * @param {Partial<Model>} updateData - The data to update on the record.
   * @param {boolean} withSoftDeleted - Indicates whether to include soft-deleted records (default: false).
   * @returns {Promise<Model>} - The updated record.
   */
  async updateOne(
    tableName: TableKeys,
    conditions: Partial<Model>,
    updateData: Partial<Model>,
    options: { withSoftDeleted?: boolean } = { withSoftDeleted: true },
  ): Promise<Model> {
    // [1] Check The Item Exists
    const query = this.knex<Model>(tableName).where(conditions);

    // Apply soft-deleted filter if specified
    if (!options.withSoftDeleted) {
      query.andWhere('deleted_at', null);
    }
    const existingRecord = await query.first();
    if (!existingRecord) {
      throw new NotFoundException('This Record Not Found');
    }

    // [2] Update And Return Updated Record
    const updatedRecord = await this.knex(tableName)
      .where(conditions)
      .update(updateData)
      .returning('*');

    return updatedRecord[0] as Model;
  }

  /* ______________________|PRIVATE|______________________ */

  /**
   * Calculates pagination details based on the provided query parameters and total number of items.
   *
   * @param {CustomReqQuery} reqQuery - The query parameters.
   * @param {number} totalNumOfItems - The total number of items.
   * @returns {Object} - Pagination details.
   */
  private calculatePaginationDetails(
    reqQuery: CustomReqQuery,
    totalNumOfItems: number,
  ) {
    const page = +reqQuery.page;
    const limit = +reqQuery.limit;
    const offset = (page - 1) * limit;

    const paginationDetails: PaginationDetails = {
      currentPage: page,
      numOfItemsPerPage: limit,
      numOfPages: Math.ceil(totalNumOfItems / limit),
    };

    const lastItemIdxInPage = page * limit;
    if (lastItemIdxInPage < totalNumOfItems) {
      paginationDetails.nextPage = page + 1;
    }

    if (offset > 0) {
      paginationDetails.previousPage = page - 1;
    }

    return page && limit
      ? { ...paginationDetails, totalNumOfItems }
      : { totalNumOfItems };
  }

  /**
   * Applies filters to the query based on the provided query parameters.
   *
   * @param {CustomReqQuery} reqQuery - The query parameters.
   * @param {Knex.QueryBuilder} queryBuilder - The Knex query builder.
   * @param {boolean} withSoftDeleted - Indicates whether to include soft-deleted records.
   */
  private applyFilters(
    reqQuery: CustomReqQuery,
    queryBuilder: Knex.QueryBuilder,
    withSoftDeleted: boolean,
  ) {
    // Handle Get With soft deleted records
    if (!withSoftDeleted) {
      queryBuilder.andWhere('deleted_at', null);
    }

    // Exclude control parameters like 'sort', 'fields', 'page', 'limit', 'search' from query params
    const queryObject = { ...reqQuery };
    const excludesFields = ['sort', 'fields', 'page', 'limit', 'search'];
    excludesFields.forEach((field) => delete queryObject[field]);

    // Iterate over each query parameter to apply filters
    Object.keys(queryObject).forEach((key) => {
      const value = queryObject[key];

      // [1] Check if the filter is operator-based (e.g., { age: { gte: 18 } })
      if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach((operator) => {
          const actualValue = value[operator];

          // [1-1] Check if the value is a date and format it accordingly
          if (
            LONG_FILTERING_DATE_FORMAT_REGEX.test(actualValue) ||
            SHORT_FILTERING_DATE_FORMAT_REGEX.test(actualValue)
          ) {
            const formattedDate = format(
              new Date(actualValue),
              'yyyy-MM-dd HH:mm:ss.SSSXXX',
            );
            queryBuilder.whereRaw(
              `DATE(${key}) ${this.getOperatorSymbol(operator)} ?`,
              [formattedDate],
            );
          }
          // [1-2] Apply regular filter for non-date values
          else {
            queryBuilder.where(
              key,
              this.getOperatorSymbol(operator),
              actualValue,
            );
          }
        });
      }
      // [2] Handle simple filtering (e.g., { name: 'John' })
      else {
        // [2-1] Handle null values
        if (value === 'null' || value === null) {
          queryBuilder.whereNull(key);
        }
        // [2-2] Handle date simple filtering
        else if (
          LONG_FILTERING_DATE_FORMAT_REGEX.test(value) ||
          SHORT_FILTERING_DATE_FORMAT_REGEX.test(value)
        ) {
          const formattedDate = format(
            new Date(value),
            'yyyy-MM-dd HH:mm:ss.SSSXXX',
          );
          queryBuilder.whereRaw(`DATE(${key}) = ?`, [formattedDate]);
        }
        // [2-3] Handle Non-date simple filtering
        else {
          const values = value.split(',').map((val: string) => val.trim());
          queryBuilder.where(key, 'IN', values);
        }
      }
    });
  }

  /**
   * Applies case-sensitive search filters to the query based on the provided query parameters.
   *
   * @param {CustomReqQuery} reqQuery - The query parameters.
   * @param {Knex.QueryBuilder} queryBuilder - The Knex query builder.
   */
  private applySearching(
    reqQuery: CustomReqQuery,
    queryBuilder: Knex.QueryBuilder,
  ) {
    if (reqQuery.search) {
      const searchArrayParam = reqQuery.search.split(':');

      if (searchArrayParam.length === 2) {
        const fieldsArray = searchArrayParam[0].slice(1, -1).split(',');
        const trimmedFieldsArray = fieldsArray.map((field) => field.trim());

        const term = searchArrayParam[1];

        queryBuilder.where((builder) => {
          builder.orWhere((innerBuilder) => {
            trimmedFieldsArray.forEach((field) => {
              innerBuilder.orWhereRaw(`${field} ILIKE ?`, [`%${term}%`]);
            });
          });
        });
      }
    }
  }

  /**
   * Applies sorting to the query based on the provided query parameters.
   *
   * @param {CustomReqQuery} reqQuery - The query parameters.
   * @param {Knex.QueryBuilder} queryBuilder - The Knex query builder.
   */
  private applySorting(
    reqQuery: CustomReqQuery,
    queryBuilder: Knex.QueryBuilder,
    withDefaultSort: boolean,
  ) {
    if (reqQuery.sort) {
      const sortBy = reqQuery.sort.split(',').map((field) => {
        const direction = field[0] === '-' ? 'desc' : 'asc';
        return { column: field.replace('-', ''), order: direction };
      });

      sortBy.forEach((sortOption) => {
        queryBuilder.orderBy(sortOption.column, sortOption.order);
        queryBuilder.orderBy('id', 'asc');
      });
    }
    // Default Sorting is LATEST_FIRST
    else if (withDefaultSort) {
      queryBuilder.orderBy('id', 'desc');
    }
  }

  /**
   * Applies field selection to the query based on the provided query parameters.
   *
   * @param {CustomReqQuery} reqQuery - The query parameters.
   * @param {Knex.QueryBuilder} queryBuilder - The Knex query builder.
   */
  private applyFieldsSelection(
    reqQuery: CustomReqQuery,
    queryBuilder: Knex.QueryBuilder,
  ) {
    if (reqQuery.fields) {
      const fields = reqQuery.fields.split(',');
      queryBuilder.select(fields);
    }
  }

  /**
   * Applies pagination to the query based on the provided query parameters.
   *
   * @param {CustomReqQuery} reqQuery - The query parameters.
   * @param {Knex.QueryBuilder} queryBuilder - The Knex query builder.
   */
  private applyPagination(
    reqQuery: CustomReqQuery,
    queryBuilder: Knex.QueryBuilder,
  ) {
    const page = +reqQuery.page || 1;
    const limit = +reqQuery.limit || 30;
    const offset = (page - 1) * limit;
    queryBuilder.offset(offset).limit(limit);
  }

  /**
   * Converts an operator string to its corresponding SQL symbol.
   *
   * @param {string} operator - The operator (e.g., 'gte', 'lt').
   * @returns {string} - The corresponding SQL operator symbol.
   */
  private getOperatorSymbol(operator: string): string {
    switch (operator) {
      case 'gte':
        return '>=';
      case 'gt':
        return '>';
      case 'lte':
        return '<=';
      case 'lt':
        return '<';
      default:
        return '=';
    }
  }
}
