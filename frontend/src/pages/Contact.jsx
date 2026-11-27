import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(
      "Form submitted:",
      formData
    );

    alert(
      "Thank you for contacting Reana's Restaurant!"
    );

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <section className="py-12">

      <div className="
        w-[90%] max-w-[1200px]
        mx-auto
      ">

        <h1 className="
          text-3xl font-bold
          text-center
          text-red-900
          mb-8
        ">
          Contact Us
        </h1>

        {/* Contact Information */}

        <div className="
          text-center
          mb-8
          space-y-2
        ">

          <p>
            <strong>Address:</strong>{" "}
            Brgy Tuburan, Pagadian City, Philippines
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            (+63) 910-563-7787
          </p>

          <p>
            <strong>Email:</strong>{" "}
            reana@gmail.com
          </p>

        </div>

        {/* Contact Form */}

        <form
          onSubmit={handleSubmit}
          className="max-w-[600px] mx-auto"
        >

          <div className="mb-4">

            <label
              htmlFor="name"
              className="block font-bold mb-2"
            >
              Name:
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full
                px-3 py-3
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-red-900
              "
            />

          </div>

          <div className="mb-4">

            <label
              htmlFor="email"
              className="block font-bold mb-2"
            >
              Email:
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                px-3 py-3
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-red-900
              "
            />

          </div>

          <div className="mb-4">

            <label
              htmlFor="message"
              className="block font-bold mb-2"
            >
              Message:
            </label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="
                w-full
                px-3 py-3
                border border-gray-300
                rounded-md
                resize-y
                focus:outline-none
                focus:ring-2
                focus:ring-red-900
              "
            />

          </div>

          <button
            type="submit"
            className="
              bg-red-900
              hover:bg-red-800
              text-white
              px-6 py-3
              rounded-md
              transition-colors
              duration-300
            "
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;