import fs from "fs/promises";
import path from "path";
import { query } from "../server/models/DatingGameModel";
import { UPSERT_CONTESTANTS } from "../server/models/queries";

type ContestantHeader = "name" | "datingBio" | "imgUrl" | "techBioUrl";

type TsvHeaderInfo = {
  required: boolean;
  name: ContestantHeader;
  type: "number" | "string";
};

type ContestantJson = {
  name: string;
  datingBio: string;
  imgUrl: string | null;
  techBioUrl: string | null;
};

const HEADERS_INFO: readonly TsvHeaderInfo[] = [
  {
    name: "name",
    type: "string",
    required: true,
  },
  {
    name: "datingBio",
    type: "string",
    required: true,
  },
  {
    name: "imgUrl",
    type: "string",
    required: false,
  },
  {
    name: "techBioUrl",
    type: "string",
    required: false,
  },
];

function mapWithIndices<T>(array: T[]): Map<T, number> {
  const mapped: Map<T, number> = new Map();

  for (let i = 0; i < array.length; i++) {
    mapped.set(array[i] as T, i);
  }

  return mapped;
}

function toContestant(headersMap: Map<string, number>, columns: string[]): ContestantJson {
  const contestant: Record<string, string | null> | ContestantJson = {};

  for (const [header, rowIndex] of headersMap.entries()) {
    const rowValue = columns[rowIndex];
    const trimmed = typeof rowValue === "string" ? rowValue.trim() : rowValue;

    // Deliberately turning empty strings into null; do not swap || out for ??
    contestant[header] = trimmed || null;
  }

  assertContestantJson(contestant);
  return contestant;
}

function assertContestantJson(value: unknown): asserts value is ContestantJson {
  if (value == null || typeof value !== "object") {
    throw new TypeError("Provided value is not object.");
  }

  const recast = value as Partial<ContestantJson>;
  for (const { name, type, required } of HEADERS_INFO) {
    const definitelyValid =
      name in value &&
      typeof recast[name] === type &&
      (type !== "string" ||
        (typeof recast[name] === "string" && (recast[name] as string).length > 0));

    if (definitelyValid || !required) {
      continue;
    }

    // This would probably log [object Object], but I don't have time to make a custom toString
    // method. Hoping this never breaks for the challenge.
    throw new TypeError(`Required key of name "${name}" does not exist in object ${value}`);
  }
}

async function processContestants(path: string): Promise<void> {
  try {
    const rawData = await fs.readFile(path, "utf-8");
    const [headers, ...contestantRows] = rawData.split(/\r?\n/).map((row) => row.split("\t"));

    if (!headers) throw new Error("Unable to parse header rows.");
    if (contestantRows.length === 0) throw new Error("No rows of data.");

    const headersMap = mapWithIndices(headers);
    const contestants = contestantRows.map((row) => toContestant(headersMap, row));
    writeContestants(query, UPSERT_CONTESTANTS, contestants);
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.stack : err);
  }
}

async function writeContestants(
  queryDb: typeof query,
  queryText: string,
  contestants: ContestantJson[]
): Promise<void> {
  for (const { name, datingBio, imgUrl, techBioUrl } of contestants) {
    try {
      const params = [name, datingBio, imgUrl, techBioUrl];
      const results = await queryDb(queryText, params);

      console.log(results);
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.stack : err);
    }
  }
}

const CONTESTANTS_PATH = path.join(__dirname, "../../data/test-data-contestants.tsv");
processContestants(CONTESTANTS_PATH);
