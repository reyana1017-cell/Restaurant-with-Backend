const menuSections = [
  {
    title: "Appetizers",

    items: [
      {
        name: "Mozarella Sticks",
        price: 220,
        image: "/img/mozzarella.jpg",
        description:
          "Crispy golden sticks filled with rich melted cheese. Served hot and perfectly fried."
      },
      {
        name: "Nachos",
        price: 140,
        image: "/img/nachos.webp",
        description:
          "Crispy tortilla chips topped with melted cheese and flavorful seasonings."
      },
      {
        name: "French Fries",
        price: 90,
        image: "/img/fries.jpg",
        description:
          "Thick-cut potatoes fried golden and lightly salted."
      },
      {
        name: "Chicken Quesadilla",
        price: 150,
        image: "/img/quesadilla.jpg",
        description:
          "Grilled tortilla filled with seasoned chicken and melted cheese."
      }
    ]
  },

  {
    title: "Main Courses",

    items: [
      {
        name: "Seafood Paella",
        price: 1499,
        image: "/img/seafood.jpg",
        description:
          "Rich and savory with aromatic saffron and smoky paprika."
      },
      {
        name: "Garlic Butter Steak",
        price: 1299,
        image: "/img/steak.jpg",
        description:
          "Juicy steak topped with flavorful garlic butter."
      },
      {
        name: "Crispy Pata",
        price: 999,
        image: "./img/crispy-pata.jpg",
        description:
          "Deep-fried pork served with special dipping sauce.",
      },
      {
        name: "Pork Sinigang",
        price: 399,
        image: "./img/Pork-Sinigang.jpg",
        description:
          "Sour soup made with tamarind broth and various vegetables and proteins.",
      },{
        name: "Chicken Wings",
        price: 399,
        image: "/img/wings.jpg",
        description:
          "Crispy, golden wings served hot with flavorful sauce and side of dipping sauce."
      }
    ]
  },

  {
    title: "Drinks",

    items: [
      {
        name: "Red Wine",
        price: 1299,
        image: "/img/wine.jpg",
      },
      {
        name: "Espresso",
        price: 129,
        image: "/img/espresso.jpg",
        description:
          "Bold, concentrated shot of rich coffee."
      },
      {
        name: "Americano",
        price: 100,
        image: "/img/americano.jpg",
        description:
          "Smooth espresso blended with hot water for a rich, full-bodied coffee with a lighter finish."
      },
      {
        name: "Blue Lemonade",
        price: 149,
        image: "/img/lemonade.jpeg",
      }
    ]
  }
];

function Menu() {
  return (
    <section className="py-12">

      <div className="
        w-[90%] max-w-[1200px]
        mx-auto
      ">

        <h1 className="
          mb-8 text-3xl font-bold text-center text-black-900
        ">
          Our Menu
        </h1>

        {menuSections.map((section) => (

          <div
            key={section.title}
            className="mb-10"
          >

            <h2 className="
              text-2xl pb-2 font-bold text-orange-600 border-b-2 border-orange-600
            ">
              {section.title}
            </h2>

            <ul className="
              list-none
              space-y-4
            ">

              {section.items.map((item) => (

                <li
                  key={item.name}
                  className="
                    flex flex-col p-4 bg-white rounded-lg shadow md:flex-row
                  "
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      md:w-[100px]
                      h-[200px]
                      md:h-[100px]
                      object-cover
                      rounded-md
                      mb-4
                      md:mb-0
                      md:mr-4
                      flex-shrink-0
                    "
                  />

                  <div className="flex-1 w-full">

                    <div className="
                      flex justify-between
                      items-center gap-4
                    ">

                      <span className="font-bold">
                        {item.name}
                      </span>

                      <span className="
                        text-orange-500
                        font-semibold
                        whitespace-nowrap
                      ">
                        PHP {item.price}
                      </span>

                    </div>

                    <p className="
                      mt-2
                      text-gray-700
                    ">
                      {item.description}
                    </p>

                  </div>

                </li>

              ))}

            </ul>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Menu;