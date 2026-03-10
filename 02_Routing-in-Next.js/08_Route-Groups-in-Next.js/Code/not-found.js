export default function NotFound() {
  return (
    <div className="grow flex justify-center items-center flex-col bg-neutral-100 text-neutral-900">
      <h1 className="text-2xl font-semibold leading-loose">
        404 - Page Not Found
      </h1>
      <p>
        The page you are looking for does not exist. Please check the URL and
        try again.
      </p>
    </div>
  );
}
