import type { NextPage } from "next";
import Head from "next/head";
import TextSelection from "../components/Text/TextSelection";
import SentenceCount from "../components/Text/SentenceCount";

const Home: NextPage = () => {
  return (
    <div className="container flex mt-40 justify-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TextSelection />
      <SentenceCount />
    </div>
  );
};

export default Home;
