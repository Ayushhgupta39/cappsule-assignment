

const Button = ({ children, classname = "", variant, onClick }) => {
  return (
    <button
      className={`p-1 px-2 text-xs rounded-lg font-semibold hover: cursor-pointer ${
        variant == "selected" &&
        "border-2 border-cappsule_text_black selected-button text-cappsule_text_black"
      } ${
        variant == "not-selected" &&
        "border-2 border-cappsule_icon_gray text-cappsule_icon_gray"
      }
      ${
        variant == "not-avail-not-selected" &&
        "border-2 border-dashed border-cappsule_icon_gray text-cappsule_icon_gray"
      }
      ${
        variant == "not-avail-selected" &&
        "border-2 border-dashed border-cappsule_text_black text-cappsule_text_black"
      } ${classname}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
