import { useEffect, useState } from "react";
import { MedicineIcon } from "../../utils/Icons";
import Button from "../ui/button";

const MedicineCard = ({ item }) => {
  const { salt_forms_json } = item;
  const [selectedForm, setSelectedForm] = useState(item?.most_common?.Form);
  const [selectedStrength, setSelectedStrength] = useState(
    Object.keys(salt_forms_json[selectedForm])[0] || ""
  );
  const [selectedPackage, setSelectedPackage] = useState("");
  const [showAllStrengths, setShowAllStrengths] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [minSellingPrice, setMinSellingPrice] = useState(null);

  const toggleShowAllStrengths = () => {
    setShowAllStrengths(!showAllStrengths);
  };

  const extractKeysAndValues = (obj) => {
    return Object.keys(obj).map((key) => ({
      key,
      value: obj[key],
    }));
  };

  const updateMinSellingPrice = (strengthObj) => {
    const prices = Object.values(strengthObj).flatMap((pkg) => {
      if (pkg && Array.isArray(pkg)) {
        return pkg.map((p) => p.selling_price).filter((price) => price != null);
      }
      return [];
    });

    if (prices.length > 0) {
      setMinSellingPrice(Math.min(...prices));
    } else {
      setMinSellingPrice(null);
    }
  };

  useEffect(() => {
    if (salt_forms_json[selectedForm]) {
      const strengths = Object.keys(salt_forms_json[selectedForm]);
      if (strengths.length > 0) {
        setSelectedStrength(strengths[0]);
      }
    }
  }, [selectedForm, salt_forms_json]);

  useEffect(() => {
    if (
      salt_forms_json[selectedForm] &&
      salt_forms_json[selectedForm][selectedStrength]
    ) {
      const packages = Object.keys(
        salt_forms_json[selectedForm][selectedStrength]
      );
      if (packages.length > 0) {
        setSelectedPackage(packages[0]);
        const packageInfo = extractKeysAndValues(
          salt_forms_json[selectedForm][selectedStrength]
        );
        updateMinSellingPrice(packageInfo);
      }
    }
  }, [selectedForm, selectedStrength, salt_forms_json]);

  const toggleShowAllPackages = () => {
    setShowAllPackages(!showAllPackages);
  };

  const handleClick = (salt_form) => {
    setSelectedForm(salt_form);
  };

  const selectStrength = (strength_variant) => {
    setSelectedStrength(strength_variant);
  };

  const renderStrengthButtons = (form) => {
    let strengths =
      salt_forms_json[form] !== null ? Object.keys(salt_forms_json[form]) : [];

    if (!showAllStrengths && strengths.length > 2) {
      strengths = strengths.slice(0, 2); // Show only the first two strengths
    }

    return strengths.map((strength) => {
      return (
        <Button
          onClick={() => selectStrength(strength)}
          key={strength}
          variant={strength == selectedStrength ? "selected" : "not-selected"}
        >
          {strength}
        </Button>
      );
    });
  };

  const renderPackageButtons = (strength) => {
    let packages =
      salt_forms_json[selectedForm][strength] != null
        ? Object.keys(salt_forms_json[selectedForm][selectedStrength])
        : [];

    if (!showAllPackages && packages.length > 2) {
      packages = packages.slice(0, 2); // Show only the first two packages
    }

    return packages.map((package_type) => {
      return (
        <Button
          onClick={() => setSelectedPackage(package_type)}
          key={package_type}
          variant={
            package_type == selectedPackage ? "selected" : "not-selected"
          }
        >
          {package_type}
        </Button>
      );
    });
  };

  return (
    <div className="flex medicine-card p-4 rounded-2xl mb-8">
      <div className="w-1/3 flex flex-col">
        <div className="flex p-2 items-center">
          <div className="w-1/3">
            <p className="font-light text-base text-black text-start">Form: </p>
          </div>
          <div className="w-2/3 gap-2 flex flex-wrap">
            {item.available_forms.map((salt, i) => (
              <Button
                onClick={() => handleClick(salt)}
                variant={salt == selectedForm ? "selected" : "not-selected"}
                key={i}
              >
                {salt}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex p-2 items-center">
          <div className="w-1/3">
            <p className="font-light text-base text-black text-start">
              Strength:{" "}
            </p>
          </div>
          <div className="w-2/3 gap-2 flex flex-wrap items-center">
            {renderStrengthButtons(selectedForm)}
            {salt_forms_json[selectedForm] &&
              Object.keys(salt_forms_json[selectedForm]).length > 2 && (
                <p
                  className="font-semibold text-sm cursor-pointer"
                  onClick={toggleShowAllStrengths}
                >
                  {showAllStrengths ? "hide.." : "more.."}
                </p>
              )}
          </div>
        </div>
        <div className="flex p-2 items-center">
          <div className="w-1/3">
            <p className="font-light text-base text-black text-start">
              Packaging:{" "}
            </p>
          </div>
          <div className="w-2/3 gap-2 flex flex-wrap">
            {renderPackageButtons(selectedStrength)}
            {salt_forms_json[selectedForm] &&
              salt_forms_json[selectedForm][selectedStrength] &&
              Object.keys(salt_forms_json[selectedForm][selectedStrength])
                .length > 2 && (
                <p
                  className="font-semibold text-sm cursor-pointer"
                  onClick={toggleShowAllPackages}
                >
                  {showAllPackages ? "hide.." : "more.."}
                </p>
              )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/3">
        <div className="flex items-center gap-1 p-2">
          <img src={MedicineIcon} alt="medicine_icon" />
          <p className="font-semibold text-cappsule_font_2">{item.salt}</p>
        </div>
        <p className="text-cappsule_text_dark_blue font-medium">
          {selectedForm} | {selectedStrength} | {selectedPackage}
        </p>
      </div>
      <div className="w-1/3 flex text-center justify-center items-center">
        {item?.id % 2 == 0 ? (
          <p className="font-extrabold text-cappsule_text_black text-2xl">
            From ₹80
          </p>
        ) : (
          <div className="bg-white rounded-md border h-14 w-52 p-2 border-cappsule_light_green">
            <p className="text-cappsule_text_black font-medium text-sm">
              No stores selling this product near you
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
