import type { NextPage } from "next";
import Head from "next/head";
import TextSelection from "../components/TextSelection";
import CSVReader from "../components/Util/CSVReader";
import SentenceCount from "../components/SentenceCount";

const Home: NextPage = () => {
  return (
    <div className="container flex mt-40">
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
