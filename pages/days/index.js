import { google } from "googleapis";

export async function getServerSideProps({ query }) {
  // Authentication
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Query
  //   const { id } = query;
  const range = `Sheet1!A1:B35`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  console.dir(response.data, { depth: 5 });

  // Result

  const days = response.data.values.map((d) => {
    return { day: d[0], number: d[1] };
  });

  return {
    props: { days },
  };
}

export default function Post({ days }) {
  return (
    <article>
      {days.map((d) => {
        return (
          <h1
            style={{
              textAlign: "center",
              float: "left",
              padding: "5px",
              marginRight: "10px",
              backgroundColor: "grey",
              color: "white",
            }}
          >
            {d.number}
          </h1>
        );
      })}
    </article>
  );
}
