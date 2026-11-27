import { useEffect, useState } from "react";

import { api } from "../lib/api";

function Home() {
  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api.getTestimonials()
      .then((result) => {
        if (active) {
          setTestimonials(result.testimonials);
        }
      })
      .catch(() => {
        if (active) {
          setError(
            "Unable to load customer testimonials."
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* Hero Section */}

      <section className="
        relative overflow-hidden
        py-20 md:py-24
        text-white text-center
      ">

        <div
          className="
            absolute inset-0
            bg-cover bg-center bg-fixed
            scale-105 blur-md
          "
          style={{
            backgroundImage:
              "url('/img/steak.jpg')"
          }}
        />

        <div className="
          absolute inset-0
          bg-black/40
        " />

        <div className="
          relative z-10
          w-[90%] max-w-[1200px]
          mx-auto
        ">

          <h1 className="
            text-4xl md:text-5xl
            font-bold mb-4
          ">
            Welcome to Reana's Restaurant
          </h1>

          <p className="
            text-lg md:text-xl
          ">
            Experience the best cuisine in the city.
            Enjoy our signature dishes and cozy ambiance.
          </p>

        </div>

      </section>

      {/* Testimonials */}

      <section className="
        py-12
        bg-gray-50
      ">

        <div className="
          w-[90%] max-w-[1200px]
          mx-auto
        ">

          <h2 className="
            text-3xl font-bold
            text-center
            text-red-900
            mb-8
          ">
            Customer Testimonials
          </h2>

          {loading ? (

            <p className="text-center text-gray-500">
              Loading testimonials...
            </p>

          ) : error ? (

            <p
              role="alert"
              className="text-center text-red-700"
            >
              {error}
            </p>

          ) : testimonials.length === 0 ? (

            <p className="text-center text-gray-500">
              No testimonials available yet.
            </p>

          ) : (

            <div className="space-y-6">

              {testimonials.map((testimonial) => (

                <div
                  key={testimonial.id}
                  className="
                    bg-white
                    p-4
                    border-l-4
                    border-red-900
                    shadow-sm
                  "
                >

                  <p className="italic">
                    "{testimonial.message}"
                  </p>

                  <span className="
                    block mt-2
                    font-bold
                    text-right
                    text-gray-600
                  ">
                    - {testimonial.name}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </>
  );
}

export default Home;