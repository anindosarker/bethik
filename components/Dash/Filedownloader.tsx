import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CSVDownloader from "./CSVDownloader";
import { SentenceType } from "../../typings";
import TableCheckbox from "./TableCheckbox";
import Pagination from "../Util/Pagination";

type Props = {
  startDate: string;
  endDate: string;
};

function FileDownloader({ startDate, endDate }: Props) {
  const supabase = useSupabaseClient();

  useEffect(() => {
    const getAll = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("sentences").select("*");
        // .eq("is_checked", true)
        // .gte("created_at", startDate)
        // .lte("created_at", endDate);
        setPosts(data);
        console.log("sentences", data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAll();
  }, []);

  const [posts, setPosts] = useState<SentenceType[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1000);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="space-y-4">
          <div className="max-w-fit space-x-4 flex items-center border-2 border-blue-500 px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-500 hover:text-white">
            <CSVDownloader jsonData={posts} />
          </div>

          <h1 className="text-xl font-semibold px-2">
            Showing {postsPerPage.toLocaleString()}/
            {posts?.length.toLocaleString()} rows
          </h1>
          <TableCheckbox
            tableData={currentPosts}
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
}

export default FileDownloader;
