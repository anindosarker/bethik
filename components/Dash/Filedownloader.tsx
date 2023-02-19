import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CSVDownloader from "./CSVDownloader";
import { SentenceType } from "../../typings";
import TableCheckbox from "./TableCheckbox";

type Props = {
  startDate: string;
  endDate: string;
};

function FileDownloader({ startDate, endDate }: Props) {
  const supabase = useSupabaseClient();

  const getAll = async () => {
    try {
      setLoading(true);
      const { data, count, error } = await supabase
        .from("sentences")
        .select("*", { count: "exact" })
        .order("id", { ascending: true })
        .range(indexOfFirstPost, indexOfLastPost);
      // .eq("is_checked", true);
      // .gte("created_at", startDate)
      // .lte("created_at", endDate);

      setPosts(data);
      setTotalPosts(count as number);
      console.log("total", totalPosts);

      console.log("sentences", data);
      console.log("count", count);

      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [posts, setPosts] = useState<SentenceType[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10000);
  const [totalPosts, setTotalPosts] = useState(0);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts;

  console.log("index", indexOfFirstPost, indexOfLastPost);
  console.log("current", currentPosts);

  useEffect(() => {
    getAll();
  }, [indexOfFirstPost, indexOfLastPost]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between px-2 items-center">
            <CSVDownloader jsonData={currentPosts} />
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Only the rows showing in this page will be downloaded. (max 10,000
              rows)
            </p>
          </div>

          <TableCheckbox
            tableData={currentPosts}
            postsPerPage={postsPerPage}
            totalPosts={totalPosts || 0}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
}

export default FileDownloader;
