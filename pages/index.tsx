import type { NextPage } from "next";
import Head from "next/head";
import TextSelection from "../components/TextSelection";
import CSVReader from "../components/Util/CSVReader";

const Home: NextPage = () => {
  return (
    <div className="container flex mt-40">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <TextSelection />

      </div>
  );
};

export default Home;
