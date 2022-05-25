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

/**
 * Inserts into the contestants table. Both img_url and tech_bio_url can be null.
 */
const UPSERT_CONTESTANTS = `\
INSERT INTO contestants (name, dating_bio, img_url, tech_bio_url)
VALUES ($1, $2, $3, $4)
ON CONFLICT (name) DO UPDATE SET
  dating_bio = excluded.dating_bio,
  img_url = excluded.img_url,
  tech_bio_url = excluded.tech_bio_url;`;

/**
 * Selects literally all data from the contestants table.
 */
const SELECT_CONTESTANTS = `SELECT * FROM contestants;`;

export { CREATE_TABLES, UPSERT_CONTESTANTS, SELECT_CONTESTANTS };
