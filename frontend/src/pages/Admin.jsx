import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { api } from "../lib/api";

function Admin() {
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([]);

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [notice, setNotice] = useState("");

  // Verify admin session and load testimonials.

  const loadTestimonials = async () => {
    try {
      const admin = await api.getCurrentAdmin();

      if (!admin.success) {
        navigate("/", { replace: true });
        return;
      }

      const result = await api.getTestimonials();

      setTestimonials(result.testimonials);

    } catch (error) {
      navigate("/", { replace: true });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Reset the form.

  const resetForm = () => {
    setName("");

    setMessage("");

    setEditingId(null);
  };

  // Add or update testimonial.

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    setNotice("");

    setSaving(true);

    const testimonialData = {
      name: name.trim(),

      message: message.trim()
    };

    try {
      if (editingId) {

        await api.updateTestimonial(
          editingId,
          testimonialData
        );

        setNotice(
          "Testimonial updated successfully."
        );

      } else {

        await api.addTestimonial(
          testimonialData
        );

        setNotice(
          "Testimonial added successfully."
        );

      }

      resetForm();

      await loadTestimonials();

    } catch (error) {
      setError(error.message);

    } finally {
      setSaving(false);
    }
  };

  // Select testimonial for editing.

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);

    setName(testimonial.name);

    setMessage(testimonial.message);

    setError("");

    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Delete testimonial.

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    setNotice("");

    try {
      await api.deleteTestimonial(id);

      setTestimonials((previous) =>
        previous.filter(
          (item) => item.id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      setNotice(
        "Testimonial deleted successfully."
      );

    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12">

      <div className="
        w-[90%] max-w-[1100px]
        mx-auto
      ">

        {/* Dashboard Heading */}

        <div className="mb-10">

          <h1 className="
            text-3xl md:text-4xl
            font-bold
            text-orange-500
          ">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage customer testimonials for
            Reana's Restaurant.
          </p>

        </div>

        {/* Feedback Messages */}

        {notice && (
          <div
            role="status"
            className="
              bg-green-100
              text-green-800
              p-4
              rounded-md
              mb-6
            "
          >
            {notice}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="
              bg-orange-100
              text-red-800
              p-4
              rounded-md
              mb-6
            "
          >
            {error}
          </div>
        )}

        {/* Add / Edit Form */}

        <div className="
          bg-white
          p-6 md:p-8
          rounded-xl
          shadow-md
          mb-10
        ">

          <h2 className="
            text-2xl
            font-bold
            text-black
            mb-6
          ">
            {editingId
              ? "Update Testimonial"
              : "Add New Testimonial"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label
                htmlFor="testimonialName"
                className="block font-bold mb-2"
              >
                Customer Name
              </label>

              <input
                id="testimonialName"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                maxLength={100}
                required
                className="
                  w-full
                  border border-gray-300
                  rounded-md
                  px-4 py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-900
                "
                placeholder="Enter customer name"
              />

            </div>

            <div>

              <label
                htmlFor="testimonialMessage"
                className="block font-bold mb-2"
              >
                Testimonial Message
              </label>

              <textarea
                id="testimonialMessage"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                maxLength={500}
                rows="4"
                required
                className="
                  w-full
                  border border-gray-300
                  rounded-md
                  px-4 py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-900
                  resize-y
                "
                placeholder="Enter customer testimonial"
              />

              <p className="
                text-gray-400
                text-xs
                text-right
                mt-1
              ">
                {message.length}/500 characters
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                disabled={saving}
                className="
                  bg-red-900
                  hover:bg-red-800
                  text-white
                  font-semibold
                  px-6 py-3
                  rounded-md
                "
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Testimonial"
                    : "Add Testimonial"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    bg-gray-200
                    hover:bg-gray-300
                    text-gray-800
                    px-6 py-3
                    rounded-md
                  "
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* Testimonial List */}

        <div>

          <div className="
            flex flex-wrap
            items-center
            justify-between
            gap-3
            mb-6
          ">

            <h2 className="
              text-2xl
              font-bold
              text-red-900
            ">
              Customer Testimonials
            </h2>

            <span className="
              bg-red-900
              text-white
              px-4 py-2
              rounded-full
              text-sm
            ">
              {testimonials.length} Entries
            </span>

          </div>

          {testimonials.length === 0 ? (

            <div className="
              bg-white
              rounded-xl
              p-10
              text-center
              text-gray-500
            ">
              No testimonials available.
              Add your first testimonial above.
            </div>

          ) : (

            <div className="space-y-4">

              {testimonials.map((testimonial) => (

                <div
                  key={testimonial.id}
                  className="
                    bg-white
                    p-5 md:p-6
                    rounded-xl
                    shadow-sm
                    border-l-4
                    border-red-900
                  "
                >

                  <div className="
                    flex flex-col
                    md:flex-row
                    md:items-center
                    justify-between
                    gap-4
                  ">

                    <div className="flex-1">

                      <p className="
                        text-gray-700
                        italic
                        mb-3
                      ">
                        "{testimonial.message}"
                      </p>

                      <p className="
                        font-bold
                        text-red-900
                      ">
                        {testimonial.name}
                      </p>

                    </div>

                    <div className="
                      flex
                      gap-2
                      flex-shrink-0
                    ">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(testimonial)
                        }
                        className="
                          bg-yellow-400
                          hover:bg-yellow-300
                          text-gray-900
                          px-4 py-2
                          rounded-md
                          font-semibold
                        "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(testimonial.id)
                        }
                        className="
                          bg-red-700
                          hover:bg-red-800
                          text-white
                          px-4 py-2
                          rounded-md
                          font-semibold
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default Admin;