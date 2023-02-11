import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export default function SearchIndex() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const searchIndex = {
    foo: "bar",
  };

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(searchIndex));
  res.end();

  res.setHeader;

  return { props: {} };
}
