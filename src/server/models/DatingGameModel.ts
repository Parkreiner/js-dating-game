import { Pool, QueryResult, QueryResultRow } from "pg";

type QueryResults = QueryResult<QueryResultRow>;
type QueryCallback = (err: Error, results: QueryResults) => void;

const POSTGRES_URL =
  "postgres://bknjzhyn:9RWk26tiyl8R4oJ5KZCmh-kP2Mj1Sp7i@fanny.db.elephantsql.com/bknjzhyn";

const pool = new Pool({
  connectionString: POSTGRES_URL,
});

function query(queryText: string, params: unknown[]): Promise<QueryResult>;
function query(queryText: string, params: unknown[], callback: QueryCallback): void;
function query(
  queryText: string,
  params: unknown[],
  callback?: QueryCallback
): void | Promise<QueryResults> {
  if (callback) {
    pool.query(queryText, params, callback);
    return;
  }

  // There seems to be a typo in the type definition for pool.query. When you don't supply a
  // callback, it actually returns a promise containing the query results, instead of void.
  return pool.query(queryText, params) as unknown as Promise<QueryResults>;
}

export { query };
