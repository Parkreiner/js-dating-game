import fs from "fs/promises";
import path from "path";

import { query } from "../server/models/DatingGameModel";
import queryText from "../server/models/queries";

type Answer = {
  contestant: string;
  value: string;
};

type RoundDetailsEntry = {
  question: string;
  answers: Answer[];
};

async function writeRoundDetails(details: RoundDetailsEntry[]): Promise<void> {
  for (const { question, answers } of details) {
    // Handle questions
    await query(queryText.insert.questions, [question]);
    const questionResults = await query(queryText.select.questions, [question]);
    const questionId = questionResults.rows[0]?.id;
    if (!questionId) {
      throw new Error("Question ID not available.");
    }

    // Handle answers
    for (const answer of answers) {
      await query(queryText.insert.answers, [questionId, answer.value]);
      const answerResults = await query(queryText.select.answers, [answer.value]);
      const answerId = answerResults.rows[0]?.id;
      if (!answerId) {
        throw new Error("Answer ID not available.");
      }

      const contestantResults = await query(queryText.select.contestant, [answer.contestant]);
      const contestantId = contestantResults.rows[0]?.id;
      if (!contestantId) {
        throw new Error("Contestant ID not available.");
      }

      await query(queryText.insert.roundDetails, [contestantId, questionId, answerId]);
    }
  }
}

async function processRounds(path: string): Promise<void> {
  try {
    const cleanedRows = (await fs.readFile(path, "utf-8"))
      .split(/\r?\n/)
      .map((strRow) => strRow.split("\t").map((cell) => cell.trim()))
      .filter((arrRow) => arrRow.length >= 2 && arrRow.every((cell) => cell !== ""));

    if (cleanedRows.length < 2) {
      throw new Error("Only header row is available.");
    }

    const maxLength = cleanedRows.reduce((max, row) => Math.max(max, row.length), 0);
    if (!cleanedRows.every((row) => row.length === maxLength)) {
      throw new Error("Not all rows are of the same length.");
    }

    const [headerRow, ...dataRows] = cleanedRows as [string[], ...string[][]];
    const restructured = toRoundDetailsEntries(headerRow, dataRows);
    writeRoundDetails(restructured);
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.stack : err);
  }
}

function toRoundDetailsEntries(headerRow: string[], dataRows: string[][]): RoundDetailsEntry[] {
  type UsableRow = [string, ...string[]];

  const maxRowLength = dataRows.reduce((max, row) => Math.max(max, row.length), 0);
  if (headerRow.length !== maxRowLength || !dataRows.every(isUsableRow)) {
    throw new TypeError("No meanginful data to restructure.");
  }

  return dataRows.map(toAnswersObject);

  ////////// Start of internal helpers

  function isUsableRow(value: string[]): value is UsableRow {
    return Array.isArray(value) && value.length >= 2;
  }

  // Relies on closure
  function toAnswersObject(dataRow: UsableRow): RoundDetailsEntry {
    const details: RoundDetailsEntry = { question: dataRow[0], answers: [] };

    for (let i = 1; i < dataRow.length; i++) {
      const answerText = dataRow[i] as string;
      const contestant = headerRow[i] as string;

      details.answers.push({ contestant, value: answerText });
    }

    return details;
  }
}

const ROUNDS_PATH = path.join(__dirname, "../../data/test-data-rounds.tsv");
processRounds(ROUNDS_PATH);
