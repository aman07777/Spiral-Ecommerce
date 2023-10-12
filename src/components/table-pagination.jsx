import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
export default function TablePagination({
  length,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(length / itemsPerPage);
  const handleClick = (page) => {
    setCurrentPage(page);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`cursor-pointer px-2 rounded border ${
            i === currentPage
              ? "bg-[#008080] text-white border-[#008080]"
              : "bg-slate-50"
          }`}
          onClick={() => handleClick(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center my-5 gap-x-1">
      {currentPage > 1 && (
        <button
          className={`cursor-pointer px-2 rounded border bg-slate-50`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <MdSkipPrevious />
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button
          className={`cursor-pointer px-2 rounded border bg-slate-50`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <MdSkipNext />
        </button>
      )}
    </div>
  );
}
