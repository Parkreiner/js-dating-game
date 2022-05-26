/**
 * Command for creating all four tables needed for the project, all at once.
 */
const CREATE_TABLES = `\
CREATE TABLE IF NOT EXISTS contestants (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) UNIQUE NOT NULL,
  dating_bio TEXT UNIQUE NOT NULL,
  img_url VARCHAR(255),
  tech_bio_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT UNIQUE NOT NULL
);

-- Question ID added as foreign key so that I can make sure answers get deleted if question does
CREATE TABLE IF NOT EXISTS answers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  text TEXT UNIQUE NOT NULL
);

-- id for this table doesn't really serve a purpose; it's here just because
CREATE TABLE IF NOT EXISTS round_details (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  contestant_id INTEGER REFERENCES contestants(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE
);`;

const SELECT_FULL_GAME_DATA = `\
SELECT
  id AS round_entry_id,
  que.text AS question,
  ans.text AS answer,
  con.name AS contestant_name,
  con.id AS contestant_id
FROM round_details AS rou
LEFT JOIN questions AS que
  ON rou.question_id = que.id
LEFT JOIN answers AS ans
  ON rou.answer_id = ans.id
LEFT JOIN contestants AS con
  ON rou.contestant_id = con.id
ORDER BY
  que.text ASC;`;

/**
 * Upserts into the contestants table. Both img_url and tech_bio_url can be null.
 */
const UPSERT_CONTESTANTS = `\
INSERT INTO contestants (name, dating_bio, img_url, tech_bio_url)
VALUES ($1, $2, $3, $4)
ON CONFLICT (name) DO UPDATE SET
  dating_bio = COALESCE(excluded.dating_bio, dating_bio)
  img_url = COALESCE(excluded.img_url, img_url),
  tech_bio_url = COALESCE(excluded.tech_bio_url, tech_bio_url);`;

const INSERT_QUESTIONS = `\
INSERT INTO questions (text)
VALUES ($1)
ON CONFLICT (text) DO NOTHING;`;

const SELECT_QUESTIONS = `\
SELECT *
FROM questions
WHERE questions.text = $1;`;

const INSERT_ANSWERS = `\
INSERT INTO answers (question_id, text)
VALUES ($1, $2)
ON CONFLICT (text) DO NOTHING;`;

const SELECT_ANSWERS = `\
SELECT *
FROM answers
WHERE answers.text = $1;`;

/**
 * Ideally this, UPSERT_QUESTIONS, and UPSERT_ANSWERS would all be in the same query. I didn't have
 * time to figure out how to best navigate a triple-nested insert query.
 */
const INSERT_ROUND_DETAILS = `\
INSERT INTO round_details (contestant_id, question_id, answer_id)
VALUES ($1, $2, $3);`;

/**
 * Selects literally all data from the contestants table.
 */
const SELECT_CONTESTANT = `\
SELECT *
FROM contestants AS con
WHERE con.name = $1;`;

/**
 * Combines several query types, organized by operation, in a more ergonimic interface.
 *
 * Example: queryText.insert.questions refers to INSERT_QUESTIONS.
 */
const queryText = {
  create: {
    tables: CREATE_TABLES,
    fullGameDate: SELECT_FULL_GAME_DATA,
  },
  select: {
    contestant: SELECT_CONTESTANT,
    questions: SELECT_QUESTIONS,
    answers: SELECT_ANSWERS,
  },
  insert: {
    questions: INSERT_QUESTIONS,
    answers: INSERT_ANSWERS,
    roundDetails: INSERT_ROUND_DETAILS,
  },
  upsert: {
    contestants: UPSERT_CONTESTANTS,
  },
} as const;

export default queryText;
