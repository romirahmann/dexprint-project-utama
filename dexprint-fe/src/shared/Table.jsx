import { useState, useMemo } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export function Table({
  columns = [],
  data = [],
  actionRenderer,
  rowsPerPage = 10,
}) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg ">
      {/* DESKTOP TABLE */}
      <div className="overflow-x-auto hidden lg:block">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(col.key)}
                  className="p-4 text-left text-gray-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortConfig.key !== col.key && (
                      <FaSort className="text-gray-400" />
                    )}
                    {sortConfig.key === col.key &&
                      (sortConfig.direction === "asc" ? (
                        <FaSortUp className="text-gray-600" />
                      ) : (
                        <FaSortDown className="text-gray-600" />
                      ))}
                  </div>
                </th>
              ))}
              {actionRenderer && <th className="p-4 text-center">Aksi</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-6 text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-4 whitespace-nowrap text-gray-700"
                    >
                      {col.render
                        ? col.render(row[col.key], row, idx)
                        : row[col.key]}
                    </td>
                  ))}
                  {actionRenderer && (
                    <td className="p-2">{actionRenderer(row)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 MOBILE CARD VIEW */}
      <div className="lg:hidden p-4 space-y-4">
        {paginatedData.length === 0 ? (
          <div className="text-center text-gray-500 py-6">Tidak ada data</div>
        ) : (
          paginatedData.map((row, idx) => (
            <div key={idx} className="border rounded-xl p-4 shadow-sm bg-white">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex justify-between py-1 text-sm"
                >
                  <span className="font-medium text-gray-500">{col.label}</span>
                  <span className="text-gray-900">
                    {col.render
                      ? col.render(row[col.key], row, idx)
                      : row[col.key]}
                  </span>
                </div>
              ))}

              {actionRenderer && (
                <div className="pt-3 border-t mt-3 flex justify-end gap-2">
                  {actionRenderer(row)}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 py-3 text-sm text-gray-700 bg-gray-50">
        <div>
          Menampilkan{" "}
          {paginatedData.length ? (
            <>
              <strong>{(currentPage - 1) * rowsPerPage + 1}</strong>–
              <strong>
                {Math.min(currentPage * rowsPerPage, sortedData.length)}
              </strong>
            </>
          ) : (
            "0"
          )}{" "}
          dari <strong>{sortedData.length}</strong> data
        </div>

        {/* PAGINATION BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
