/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";
import api from "../../../services/axios.service";
import Modal from "../../../shared/Modal";
import ConfirmDeleteModal from "../../../shared/ConfirmDeleted";
import { FormReview } from "./form/FormReview";

export function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const { showAlert } = useAlert();
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
    ["review:create", "review:update", "review:delete"].forEach((event) =>
      listenToUpdate(event, fetchReviews)
    );
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/master/reviews");
      setReviews(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedReview) return;
    console.log(selectedReview);
    try {
      await api.delete(`/master/review/${selectedReview.reviewId}`);
      showAlert("success", "Review deleted!");
      setModal({ isOpen: false, type: "" });
    } catch {
      showAlert("error", "Failed to delete review!");
    } finally {
      setSelectedReview(null);
    }
  };

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Customer Reviews
        </h2>
        <button
          onClick={() => setModal({ isOpen: true, type: "ADD" })}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          <FiPlus /> Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id || `review-${index}`}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col items-center text-center"
            >
              <img
                src={review.fileIMG || defaultAvatar}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mb-3 border"
              />
              <p className="text-gray-700 text-sm mb-3 italic min-h-[60px]">
                “{review.feedback}”
              </p>
              <div className="text-sm font-semibold text-gray-800">
                — {review.name || "Anonymous"}
              </div>
              <div className="text-xs text-gray-500">
                {review.tenant || "GUEST"}
              </div>

              <button
                onClick={() => {
                  setSelectedReview(review);
                  setModal({ isOpen: true, type: "DELETE" });
                }}
                className="mt-4 text-red-500 hover:text-red-600 flex items-center gap-1 text-sm"
              >
                <FiTrash2 /> Delete
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {modal.type === "ADD" && (
        <Modal
          isOpen={modal.isOpen}
          title="Add Review"
          onClose={() => setModal({ isOpen: false, type: "" })}
        >
          <FormReview onSuccess={() => setModal({ isOpen: false, type: "" })} />
        </Modal>
      )}

      <ConfirmDeleteModal
        isOpen={modal.type === "DELETE"}
        onConfirm={handleConfirmDelete}
        onCancel={() => setModal({ isOpen: false, type: "" })}
        message="Yakin ingin menghapus review ini?"
      />
    </div>
  );
}
