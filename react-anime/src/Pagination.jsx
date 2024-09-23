import React from "react";
import { Form } from "react-bootstrap"; // Mengimpor komponen Form dari React Bootstrap
import './Pagination.css'; // Mengimpor file CSS untuk styling pagination

// Komponen Pagination menerima beberapa props untuk mengelola pagination
function Pagination({ 
  currentPage,         // Halaman saat ini yang sedang aktif
  totalPages,          // Total jumlah halaman
  handleNextPage,      // Fungsi untuk berpindah ke halaman berikutnya
  handlePreviousPage,  // Fungsi untuk berpindah ke halaman sebelumnya
  handlePagination,    // Fungsi untuk berpindah ke halaman tertentu
  pageRange,           // Rentang halaman yang akan ditampilkan (misal: 1-4, 5-8)
  itemsPerPage,        // Jumlah item yang ditampilkan per halaman
  setItemsPerPage      // Fungsi untuk mengubah jumlah item per halaman
}) {
  return (
    <div className="custom-pagination">
      {/* Tombol Previous untuk kembali ke halaman sebelumnya */}
      <button 
        className="circle-btn" 
        onClick={handlePreviousPage} 
        disabled={currentPage === 1} // Disabled jika di halaman pertama
      >
        &lt; Previous
      </button>
      
      {/* Bagian untuk menampilkan nomor halaman */}
      <div className="pagination-numbers">
        {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, i) => {
          const page = pageRange[0] + i; // Menghitung halaman dari rentang yang diberikan
          if (page <= totalPages) {
            return (
              <button
                key={page} // Kunci unik untuk setiap tombol halaman
                className={`page-btn ${currentPage === page ? "active" : ""}`} // Tambahkan kelas active jika halaman saat ini
                onClick={() => handlePagination(page)} // Panggil fungsi untuk berpindah ke halaman yang diklik
              >
                {page} {/* Menampilkan nomor halaman */}
              </button>
            );
          }
          return null;
        })}
      </div>
      
      {/* Tombol Next untuk berpindah ke halaman berikutnya */}
      <button 
        className="circle-btn" 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages} // Disabled jika di halaman terakhir
      >
        Next &gt;
      </button>

      {/* Dropdown untuk memilih jumlah item per halaman */}
      <Form.Select
        aria-label="Select number of items per page"
        value={itemsPerPage} // Nilai yang dipilih (jumlah item per halaman)
        onChange={(e) => setItemsPerPage(parseInt(e.target.value))} // Mengubah jumlah item per halaman berdasarkan pilihan user
        className="w-auto ml-3"
      >
        <option value={12}>12 per page</option> {/* Opsi untuk 12 item per halaman */}
        <option value={24}>24 per page</option> {/* Opsi untuk 24 item per halaman */}
      </Form.Select>
    </div>
  );
}

export default Pagination;
