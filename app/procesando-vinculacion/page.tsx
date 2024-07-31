import LinkingContentWrapper from "../components/donations/LinkingContentWrapper";
// async function getData({ page = 0 }) {
//   try {
//     const { data } = await getPopular(0, 10);
//     return { data: data.blogs[0].data, metadata: data.blogs[0].metadata };
//   } catch (error) {
//     console.log("Trending error", error);
//     return null;
//   }
// }

export default async function Trending({ params }: any) {
  const { page } = params;
//   const data = await getData({ page });
  
  return (
    <div>
      <LinkingContentWrapper />
    </div>
  );
}
