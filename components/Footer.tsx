export default function Footer() {
  return (
    <footer className="z-50 flex-grow-0 bg-black">
      <div className="max-w-7xl flex items-center justify-center mx-auto p-4">
        <p className="text-sm text-white">
          &copy; {new Date().getFullYear()} - HerbPharmsHub.
        </p>
      </div>
    </footer>
  );
}
