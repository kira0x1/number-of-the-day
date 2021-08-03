import { google } from "googleapis";

export async function getServerSideProps({ query }) {
  // Authentication
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Query
  const { id } = query;
  const range = `Sheet1!A${id}:B${id}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // Result

  const [day, number] = response.data.values[0];

  return {
    props: { day, number },
  };
}

export default function Post({ day, number }) {
  return (
    <article>
      <h1>
        {day}: {number}
      </h1>
    </article>
  );
}
