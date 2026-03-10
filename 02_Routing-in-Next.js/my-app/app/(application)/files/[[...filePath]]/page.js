export const metadata = {
  title: {
    absolute: "My Files",
  },
};

export default async function File({ params }) {
  const { filePath } = await params;
  return (
    <div className="grow">
      File <i>/{filePath?.join("/")}</i>
    </div>
  );
}
