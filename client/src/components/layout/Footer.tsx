export default function Footer() {
  return (
    <footer className="bg-darkbg border-t border-mediumbg py-4 text-center text-gray-400 text-sm">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Reflection. All rights reserved.</p>
        <p className="mt-1">A Blue Lock summer-themed collector game based on anime characters.</p>
      </div>
    </footer>
  );
}
