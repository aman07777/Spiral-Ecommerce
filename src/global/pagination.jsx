export default function Pagination({
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
        <li
          key={i}
          className={`cursor-pointer px-2 rounded border ${
            i === currentPage ? "bg-green-400" : "bg-slate-50"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul className="flex justify-center my-5 gap-x-1">{renderPageNumbers()}</ul>
  );
}
