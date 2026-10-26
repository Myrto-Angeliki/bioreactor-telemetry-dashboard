import { Suspense } from "react";
import { ContentWrapper } from "./components/ContentWrapper";

export default async function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <ContentWrapper />
    </Suspense>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}