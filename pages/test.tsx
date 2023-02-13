const supabase = useSupabaseClient();
const [loading, setLoading] = useState(false);

const insertManyRows = async (dataArr: []) => {
  try {
    setLoading(true);
    const { data, error } = await supabase
      .from("sentences")
      .insert(dataArr.map((sentence) => ({ incorrect_text: sentence[0] })));

    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  } finally {
    setLoading(false);
  }
};
