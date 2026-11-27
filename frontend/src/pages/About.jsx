function About() {
  return (
    <>
      <section className="bg-[#111] py-20 text-center">

        <div className="
          mx-auto w-[90%] max-w-[1200px]
        ">

          <h1 className="
            mb-5 text-4xl font-bold tracking-wide text-orange-500
          ">
            About Us
          </h1>

          <div className="space-y-4 text-base leading-[1.8] text-[#ccc]">

            <p className="mx-auto my-[15px] max-w-[700px]">
              At Reanna Restaurant, we believe that great food brings people
              together. Our passion is creating a warm and welcoming space
              where families, friends, and loved ones can gather to share
              meaningful moments over delicious meals.
            </p>

            <p className="mx-auto my-[15px] max-w-[700px]">
              Every dish on our menu is carefully prepared using fresh
              ingredients, bold flavors, and recipes crafted with love and
              dedication. From savory main courses to delightful appetizers
              and refreshing drinks, we aim to serve comfort and quality in
              every bite.
            </p>

            <p className="mx-auto my-[15px] max-w-[700px]">
              Whether you're celebrating a special occasion, enjoying a
              casual dinner, or simply craving your favorite comfort food,
              we are here to give you an exceptional dining experience that
              feels like home.
            </p>

          </div>
        </div>

      </section>

      <section className="bg-[#0f0f0f] py-[60px]">

        <div className="
          mx-auto w-[90%] max-w-[1200px]
        ">

          <img
            src="/img/interior.png"
            alt="Reanna Restaurant Interior"
            className="w-full rounded-[15px] shadow-[0_10px_30px_rgba(255,165,0,0.2)] transition-transform duration-[400ms] ease-in-out hover:scale-[1.03]"

          />

        </div>

      </section>
    </>
  );
}

export default About;