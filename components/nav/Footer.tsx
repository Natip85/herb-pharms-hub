export default function Footer() {
  return (
    <footer className="z-50 flex-grow-0 border-t border-[#1AB266]">
      <div className="max-w-7xl flex items-center justify-center mx-auto p-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} - HerbPharmsHub.
        </p>
      </div>
    </footer>
  );
}
