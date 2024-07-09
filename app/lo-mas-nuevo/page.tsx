import { getRecent } from "../client/blogs";
import ContentWrapper from "../components/shared/contentWrapper";

async function getData({ page = 0 }) {
  try {
    const { data } = await getRecent(0, 3);
    console.log("TheNewest", data);
    return { data: data.blogs[0].data, metadata: data.blogs[0].metadata };
    } catch (error) {
    console.log("TheNewest error", error);
    return null;
  }
}

export default async function TheNewest({ params }: any) {
  const { page } = params;
  const data = await getData({ page });

  return (
    <div>
      <ContentWrapper title={"Lo más nuevo"} data={data?.data} metadata={data?.metadata} />
    </div>
  );
}
