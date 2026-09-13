import { useEffect, useState } from "react";

import chairImage from "../../assets/image/4de3380686559925af623c354c81c16b.jpg";
import sofaImage from "../../assets/image/376b7971cf43fb28d6c155f893a73750.jpg";
import tableImage from "../../assets/image/df009f18c83db72321467821b44eb4ca.jpg";
import bedImage from "../../assets/image/11c57cd010b63ebb78e683aa9fbc47eb.jpg";

import chairImage1 from "../../assets/image/50e697b6feea7df8490897af3b31c682.jpg";
import sofaImage1 from "../../assets/image/3d2a39fec460e367dcf9ea82587edaa0.jpg";
import tableImage1 from "../../assets/image/982657884ffe798ff8db07a112cd05b2.jpg";
import bedImage1 from "../../assets/image/5b6851cb57acfee9ba8c82987c9d04ee.jpg";

const images = [
  sofaImage,
  chairImage,
  tableImage,
  bedImage,
  sofaImage1,
  chairImage1,
  tableImage1,
  bedImage1,
];

function Furniture() {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFurniture = async () => {
      try {
        const response = await fetch(
          "https://localhost:7109/api/Furniture"
        );

        if (!response.ok) {
          throw new Error("Failed to load furniture.");
        }

        const data = await response.json();

        setFurnitureItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFurniture();
  }, []);

  return (
    <section
      id="furniture"
      className="bg-[#F7F5F0] px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5A623]">
            Our Furniture
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#073F43] md:text-5xl">
            Furniture made for living.
          </h2>
        </div>

        {loading && (
          <p className="text-[#073F43]">
            Loading furniture...
          </p>
        )}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {furnitureItems.map((item, index) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="overflow-hidden">
                  <img
                    src={images[index % images.length]}
                    alt={item.name}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-[#073F43]">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Furniture;