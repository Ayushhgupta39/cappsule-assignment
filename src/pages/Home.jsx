import { useState } from "react";
import IconInput from "../components/ui/icon-input";
import { fetchMedicines } from "../api/medicine";
import MedicineCard from "../components/app/medicine-card";

const Home = () => {
  const [salts, setSalts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchMedicines(searchQuery);
    setSalts(response.data.saltSuggestions);
  };

  console.log(salts);

  return (
    <div className="flex justify-center text-center w-full">
      <div className="flex flex-col justify-center text-center gap-4 w-2/3">
        <h1 className="my-4 mt-8 text-xl font-normal">
          Cappsule web development test
        </h1>

        <div className="my-4">
          <IconInput
            name={"search"}
            id={"search"}
            placeholder={"Type your medicine name here"}
            required={true}
            cb={handleSubmit}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className=" bg-[#CDCDCD] m-4 my-10 h-[1px]"></div>
        </div>

        {/* Medicine List */}
        <div className="my-4">
          {salts.length == 0 && (
            <div>
              <p className="font-semibold text-cappsule_text_gray">
                &quot;Find medicines with amazing discount&quot;
              </p>
            </div>
          )}

          {salts.map((salt) => (
            <MedicineCard key={salt.id} item={salt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
